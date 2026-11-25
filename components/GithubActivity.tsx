import { cacheLife } from "next/cache";
import { site } from "@/data/site";
import { getDictionary } from "@/dictionaries";
import { fill, type Locale } from "@/lib/i18n";

const DAYS = 30;

type Activity = { days: { date: string; count: number }[]; total: number };

/** Actividad pública de GitHub de los últimos 30 días. Se pide como máximo una vez por hora. */
async function getActivity(user: string): Promise<Activity | null> {
  "use cache";
  cacheLife("hours");

  try {
    const response = await fetch(`https://api.github.com/users/${user}/events/public?per_page=100`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) return null;
    const events: { created_at: string }[] = await response.json();

    const counts = new Map<string, number>();
    events.forEach((event) => {
      const day = event.created_at.slice(0, 10);
      counts.set(day, (counts.get(day) ?? 0) + 1);
    });

    const today = new Date();
    const days = Array.from({ length: DAYS }, (_, index) => {
      const date = new Date(today);
      date.setUTCDate(today.getUTCDate() - (DAYS - 1 - index));
      const key = date.toISOString().slice(0, 10);
      return { date: key, count: counts.get(key) ?? 0 };
    });

    return { days, total: days.reduce((sum, day) => sum + day.count, 0) };
  } catch {
    return null;
  }
}

function level(count: number) {
  if (count === 0) return "bg-surface-2";
  if (count < 3) return "bg-accent/30";
  if (count < 6) return "bg-accent/55";
  if (count < 12) return "bg-accent/80";
  return "bg-accent shadow-[0_0_6px] shadow-accent/60";
}

/** Barra de actividad: un cuadro por día, más verde cuanta más actividad. */
export default async function GithubActivity({ lang }: { lang: Locale }) {
  const activity = await getActivity(site.github.split("/").pop() ?? "");
  if (!activity) return null;

  const t = getDictionary(lang).about.github;
  const dateFormat = new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

  return (
    <div className="flex h-full flex-col justify-between gap-4 font-mono text-xs">
      <div className="flex items-center justify-between gap-3 text-muted">
        <span>{t.title}</span>
        <a href={site.github} target="_blank" rel="noreferrer" className="text-accent hover:underline">
          @{site.github.split("/").pop()} ↗
        </a>
      </div>

      <ol className="flex h-14 items-end gap-[3px]">
        {activity.days.map((day) => {
          const label = fill(t.day, { date: dateFormat.format(new Date(day.date)), n: String(day.count) });
          return <li key={day.date} title={label} aria-label={label} className={`flex-1 rounded-[3px] transition-transform hover:scale-y-110 ${level(day.count)}`}
              style={{ height: `${Math.min(100, 25 + day.count * 8)}%` }} />;
        })}
      </ol>

      <div className="flex justify-between text-muted">
        <span>{t.from}</span>
        <span className="text-fg">{fill(t.total, { n: String(activity.total) })}</span>
        <span>{t.today}</span>
      </div>
    </div>
  );
}
