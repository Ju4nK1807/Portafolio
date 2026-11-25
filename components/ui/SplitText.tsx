type SplitTextProps = {
  text: string;
  /** Retraso inicial en milisegundos. */
  delay?: number;
  /** Retraso entre letras en milisegundos. */
  stagger?: number;
  className?: string;
};

/** Texto cuyas letras suben una por una desde una máscara. Funciona sin JavaScript (solo CSS). */
export default function SplitText({ text, delay = 0, stagger = 35, className = "" }: SplitTextProps) {
  return (
    <span className={`inline-block overflow-hidden pb-[0.08em] align-bottom ${className}`} aria-label={text}>
      <span className="rise inline-block whitespace-pre" aria-hidden="true">
        {text.split("").map((char, index) => (
          <span key={index} style={{ animationDelay: `${delay + index * stagger}ms` }}>
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
