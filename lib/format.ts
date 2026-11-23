/** "2024-07" -> "Jul 2024" (los nombres de los meses vienen del diccionario). */
export function formatMonth(value: string, months: string[]): string {
  const [year, month] = value.split("-");
  const name = months[Number(month) - 1];
  return name ? `${name} ${year}` : year;
}

/** Rango de fechas legible: "Jul 2024 — Actualidad" */
export function formatRange(start: string, end: string | null, months: string[], present: string): string {
  return `${formatMonth(start, months)} — ${end ? formatMonth(end, months) : present}`;
}

/** "Juan Camilo Bastidas" -> "JB" */
export function initialsOf(name: string): string {
  const words = name.split(" ").filter(Boolean);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}
