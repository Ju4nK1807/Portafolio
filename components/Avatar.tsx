import Image from "next/image";
import { site } from "@/data/site";

/** Foto de perfil con un marco decorativo y etiquetas flotantes. */
export default function Avatar() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <div className="absolute inset-0 rotate-6 rounded-[2.5rem] bg-accent/15" aria-hidden="true" />
      <div className="absolute inset-0 -rotate-3 rounded-[2.5rem] border border-line" aria-hidden="true" />

      <div className="relative size-full overflow-hidden rounded-[2.5rem] border border-line bg-surface">
        <Image
          src={site.photo}
          alt={`Foto de ${site.name}`}
          fill
          priority
          unoptimized
          sizes="(min-width: 768px) 24rem, 80vw"
          className="object-cover"
        />
      </div>

      <span className="animate-float absolute -top-3 -left-3 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs shadow-lg sm:-left-6">
        TypeScript
      </span>
      <span
        className="animate-float absolute top-1/2 -right-3 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs shadow-lg [animation-delay:1.2s] sm:-right-6"
      >
        React Native
      </span>
      <span
        className="animate-float absolute -bottom-3 left-8 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs shadow-lg [animation-delay:2.4s]"
      >
        Three.js
      </span>
    </div>
  );
}
