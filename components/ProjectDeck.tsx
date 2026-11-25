"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/types";

type ProjectDeckProps = {
  projects: Project[];
  label: string;
  onOpen: (project: Project) => void;
};

/** Abanico de capturas inclinadas. La que tiene el mouse (o el foco) sube y se endereza. */
export default function ProjectDeck({ projects, label, onOpen }: ProjectDeckProps) {
  const mid = (projects.length - 1) / 2;
  const center = Math.floor(mid);
  const [active, setActive] = useState(center);
  const current = projects[active] ?? projects[0];

  if (!current) return null;

  return (
    <div>
      <ul
        aria-label={label}
        onMouseLeave={() => setActive(center)}
        className="relative isolate h-40 [--spread:3.4rem] sm:h-48 sm:[--spread:6.75rem]"
      >
        {projects.map((project, index) => {
          const offset = index - mid;
          const on = index === active;
          const lift = on ? -14 : Math.abs(offset) * 10;
          const tilt = on ? 0 : offset * 5;

          return (
            <li
              key={project.slug}
              className="absolute top-5 left-1/2 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
              style={{
                zIndex: on ? 50 : 20 - Math.round(Math.abs(offset) * 2),
                transform: `translateX(-50%) translateX(calc(var(--spread) * ${offset})) translateY(${lift}px) rotate(${tilt}deg) scale(${on ? 1.06 : 1})`,
              }}
            >
              <button
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => onOpen(project)}
                aria-haspopup="dialog"
                aria-label={project.title}
                className={`block w-36 overflow-hidden rounded-lg border bg-surface shadow-2xl shadow-black/60 transition-colors sm:w-52 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${on ? "border-accent/60" : "border-line"}`}
              >
                <span
                  className={`relative block aspect-[16/10] ${project.imageFit === "contain" ? "bg-white" : "bg-black"}`}
                >
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 208px, 144px"
                    className={`transition duration-500 ${project.imageFit === "contain" ? "object-contain p-3" : "object-cover"} ${on ? "" : "brightness-[.6] grayscale-[.5]"}`}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-2 text-center font-mono text-xs text-muted" aria-hidden="true">
        ~/proyectos/<span className="text-accent">{current.slug}</span>
      </p>
    </div>
  );
}
