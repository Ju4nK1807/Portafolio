type MarqueeProps = {
  items: string[];
};

/** Cinta que se desplaza sin fin. La lista se duplica para que el bucle no tenga saltos. */
export default function Marquee({ items }: MarqueeProps) {
  return (
    <div className="relative overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <ul className="animate-marquee flex w-max gap-10" aria-label="Tecnologías">
        {[...items, ...items].map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="flex items-center gap-10 text-2xl font-semibold whitespace-nowrap text-muted sm:text-3xl"
          >
            {item}
            <span className="text-accent" aria-hidden="true">
              ✦
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
