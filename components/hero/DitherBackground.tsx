"use client";

import { useEffect, useRef } from "react";

// Escena 3D hecha a mano en un fragment shader: un toroide deformado que se
// dibuja con "dithering" ordenado (matriz de Bayer) y pocos tonos, como un
// monitor de fósforo verde. Sin librerías: WebGL puro.

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uOffset;
uniform vec3 uBg;
uniform vec3 uFg;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float map(vec3 p) {
  p.yz *= rot(uTime * 0.25 + uMouse.y * 1.2);
  p.xz *= rot(uTime * 0.18 + uMouse.x * 1.8);
  p.xy *= rot(0.6);
  float d = sdTorus(p, vec2(1.15, 0.42));
  d += 0.07 * sin(p.x * 5.0 + uTime) * sin(p.y * 5.0 + uTime * 0.7) * sin(p.z * 5.0);
  return d;
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.0015, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)));
}

float bayer2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
  uv.x -= uOffset;

  vec3 ro = vec3(0.0, -0.35, 5.6);
  vec3 rd = normalize(vec3(uv, -1.9));

  float t = 0.0;
  float hit = 0.0;
  for (int i = 0; i < 90; i++) {
    float d = map(ro + rd * t);
    if (d < 0.001) { hit = 1.0; break; }
    t += d * 0.8;
    if (t > 12.0) break;
  }

  float shade = 0.0;
  if (hit > 0.5) {
    vec3 p = ro + rd * t;
    vec3 n = calcNormal(p);
    vec3 l = normalize(vec3(0.6, 0.8, 0.7));
    float dif = max(dot(n, l), 0.0);
    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 2.5);
    float stripes = 0.5 + 0.5 * sin((p.y + p.x) * 14.0 - uTime * 2.0);
    shade = dif * 0.75 + rim * 0.7 + stripes * 0.08 + 0.05;
  }

  // Halo suave detrás de la figura.
  shade = max(shade, 0.16 * exp(-length(uv) * 1.1));

  float threshold = bayer8(gl_FragCoord.xy) - 0.5;
  float levels = 3.0;
  float q = clamp(floor(shade * levels + threshold + 0.5) / levels, 0.0, 1.0);

  gl_FragColor = vec4(mix(uBg, uFg, q), 1.0);
}
`;

function hexToRgb(value: string): [number, number, number] {
  const hex = value.trim().replace("#", "");
  const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
  const n = parseInt(full, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/** Tamaño de cada "pixel" de la escena. Más grande = más retro y más rápido. */
const PIXEL = 3;

export default function DitherBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false });
    if (!canvas || !gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(program, "uRes"),
      time: gl.getUniformLocation(program, "uTime"),
      mouse: gl.getUniformLocation(program, "uMouse"),
      offset: gl.getUniformLocation(program, "uOffset"),
      bg: gl.getUniformLocation(program, "uBg"),
      fg: gl.getUniformLocation(program, "uFg"),
    };

    // Colores tomados de las variables CSS para seguir el tema claro/oscuro.
    const applyColors = () => {
      const styles = getComputedStyle(document.documentElement);
      gl.uniform3fv(u.bg, hexToRgb(styles.getPropertyValue("--bg") || "#000000"));
      gl.uniform3fv(u.fg, hexToRgb(styles.getPropertyValue("--accent") || "#3dff8b"));
    };
    applyColors();
    const themeObserver = new MutationObserver(applyColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const resize = () => {
      const width = Math.max(1, Math.floor(canvas.clientWidth / PIXEL));
      const height = Math.max(1, Math.floor(canvas.clientHeight / PIXEL));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(u.res, width, height);
      // En pantallas anchas la figura se corre a la derecha para dejar libre el texto.
      const aspect = width / height;
      gl.uniform1f(u.offset, aspect > 1.2 ? Math.min(aspect * 0.42, 1.1) : 0);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const target = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const onPointer = (event: PointerEvent) => {
      target.x = event.clientX / window.innerWidth - 0.5;
      target.y = event.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(canvas);

    let frame = 0;
    const start = performance.now();
    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      if (!visible) return;
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      gl.uniform1f(u.time, reducedMotion ? 8 : (now - start) / 1000);
      gl.uniform2f(u.mouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (reducedMotion) cancelAnimationFrame(frame);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`size-full [image-rendering:pixelated] ${className}`}
    />
  );
}
