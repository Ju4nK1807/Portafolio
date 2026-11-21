const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

/** "2024-07" -> "Jul 2024" */
export function formatMonth(value: string): string {
  const [year, month] = value.split("-");
  const index = Number(month) - 1;
  return MONTHS[index] ? `${MONTHS[index]} ${year}` : year;
}

/** Rango de fechas legible: "Jul 2024 — Actualidad" */
export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : "Actualidad"}`;
}

/** "Juan Camilo Bastidas" -> "JB" */
export function initialsOf(name: string): string {
  const words = name.split(" ").filter(Boolean);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}
