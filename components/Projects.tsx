"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { fill } from "@/lib/i18n";
import type { Project, ProjectCategory } from "@/types";
import { useI18n } from "./i18n/I18nProvider";
import ProjectCard from "./ProjectCard";
import ProjectDeck from "./ProjectDeck";
import ProjectModal from "./ProjectModal";
import ProjectRow from "./ProjectRow";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";

type Filter = ProjectCategory | "todos";
type View = "list" | "grid";

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export default function Projects({ projects }: { projects: Project[] }) {
  const { dict } = useI18n();
  const t = dict.projects;

  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>("todos");
  const [view, setView] = useState<View>("list");
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<Project | null>(null);
  const [inView, setInView] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Solo aparecen los filtros que tienen al menos un proyecto, en el orden de los datos.
  const filters = useMemo(() => {
    const counts = new Map<Filter, number>([["todos", projects.length]]);
    projects.forEach((project) => counts.set(project.category, (counts.get(project.category) ?? 0) + 1));
    return [...counts.entries()];
  }, [projects]);

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return projects.filter(
      (project) =>
        (filter === "todos" || project.category === filter) &&
        (!q || normalize([project.title, project.tagline, ...project.tags].join(" ")).includes(q)),
    );
  }, [projects, filter, query]);

  // Tecla "/" enfoca el buscador (si no estás escribiendo en otro campo).
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key !== "/" || target.closest("input, textarea, [contenteditable]")) return;
      event.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // El botón flotante "sorpréndeme" solo se muestra mientras ves esta sección.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "-30% 0px -30% 0px",
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // La vista previa sigue al mouse moviendo el elemento directamente, sin re-renderizar.
  function hover(project: Project | null, event?: MouseEvent) {
    setHovered(project);
    if (event && previewRef.current) {
      previewRef.current.style.transform = `translate(${event.clientX + 28}px, ${event.clientY - 90}px)`;
    }
  }

  function surprise() {
    const pool = visible.length ? visible : projects;
    const options = pool.length > 1 && selected ? pool.filter((p) => p.slug !== selected.slug) : pool;
    setSelected(options[Math.floor(Math.random() * options.length)] ?? null);
  }

  const filterButton = (key: Filter, count: number, variant: "side" | "tab") => {
    const on = filter === key;
    return (
      <button
        key={key}
        type="button"
        onClick={() => setFilter(key)}
        aria-pressed={on}
        className={
          variant === "side"
            ? `flex items-center gap-2 py-1 text-left transition-colors ${on ? "text-fg" : "text-muted hover:text-fg"}`
            : `flex-1 rounded-md px-3 py-1.5 whitespace-nowrap transition-colors ${on ? "bg-bg text-fg shadow-sm" : "text-muted hover:text-fg"}`
        }
      >
        {t.categories[key]}
        {variant === "side" ? (
          on ? (
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px] shadow-accent" aria-hidden="true" />
          ) : (
            <span className="font-mono text-[10px] opacity-60">{count}</span>
          )
        ) : null}
      </button>
    );
  };

  return (
    <section ref={sectionRef} id="proyectos" className="section">
      <div className="container-page">
        <SectionTitle index="02" eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="lg:grid lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-14">
          {/* Filtros laterales fijos (escritorio) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-3 font-mono text-xs text-accent">{t.filterTitle}</p>
              <div role="group" aria-label={t.filterLabel} className="flex flex-col">
                {filters.map(([key, count]) => filterButton(key, count, "side"))}
              </div>
            </div>
          </aside>

          <div className="mx-auto max-w-3xl lg:mx-0">
            <ProjectDeck projects={projects} label={t.deckLabel} onOpen={setSelected} />

            <p className="mt-12 text-lg text-muted">
              <strong className="font-semibold text-fg tabular-nums">{String(projects.length).padStart(2, "0")}</strong>{" "}
              {t.intro}{" "}
              <a
                href="#contacto"
                className="inline-block rounded-md bg-surface-2 px-2 py-0.5 text-base text-fg transition-colors hover:bg-accent hover:text-accent-fg"
              >
                {t.introCta} ↗
              </a>
            </p>

            <hr className="my-10 border-line" />

            {/* Buscador + cambio de vista */}
            <div className="flex gap-2">
              <label className="flex flex-1 items-center gap-3 rounded-lg border border-line bg-surface px-3 transition-colors focus-within:border-accent">
                <span className="font-mono text-accent" aria-hidden="true">
                  &gt;
                </span>
                <span className="sr-only">{t.search}</span>
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t.search}
                  className="h-11 min-w-0 flex-1 bg-transparent text-fg outline-none placeholder:text-muted/70"
                />
                <kbd className="hidden rounded border border-line px-1.5 font-mono text-xs text-muted sm:inline">/</kbd>
              </label>

              <div role="group" aria-label={t.viewLabel} className="flex rounded-lg border border-line bg-surface p-1">
                {(["list", "grid"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setView(option)}
                    aria-pressed={view === option}
                    aria-label={option === "list" ? t.viewList : t.viewGrid}
                    title={option === "list" ? t.viewList : t.viewGrid}
                    className={`grid w-9 place-items-center rounded-md font-mono transition-colors ${view === option ? "bg-surface-2 text-accent" : "text-muted hover:text-fg"}`}
                  >
                    {option === "list" ? "☰" : "▦"}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtros en pestañas (celular y tablet) */}
            <div
              role="group"
              aria-label={t.filterLabel}
              className="mt-3 flex gap-1 overflow-x-auto rounded-lg bg-surface-2 p-1 text-sm lg:hidden"
            >
              {filters.map(([key, count]) => filterButton(key, count, "tab"))}
            </div>

            <div className="mt-6">
              {visible.length === 0 ? (
                <p className="py-10 text-center font-mono text-sm text-muted">{fill(t.noResults, { q: query })}</p>
              ) : view === "list" ? (
                <ul className="group/list">
                  {visible.map((project) => (
                    <li
                      key={project.slug}
                      className="transition-opacity duration-300 group-hover/list:opacity-35 hover:opacity-100!"
                    >
                      <ProjectRow project={project} onOpen={setSelected} onHover={hover} />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul key={filter + query} className="grid gap-6 md:grid-cols-2">
                  {visible.map((project, index) => (
                    <li key={project.slug}>
                      <Reveal delay={(index % 2) * 100} className="h-full">
                        <ProjectCard project={project} onOpen={setSelected} />
                      </Reveal>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Vista previa flotante que sigue al mouse en la lista */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-30 hidden w-72 transition-opacity duration-200 md:block ${hovered && view === "list" ? "opacity-100" : "opacity-0"}`}
      >
        {hovered && (
          <div className="overflow-hidden rounded-lg border border-accent/40 bg-surface shadow-2xl shadow-black/60">
            <div className={`relative aspect-[16/10] ${hovered.imageFit === "contain" ? "bg-white" : "bg-black"}`}>
              <Image
                src={hovered.image}
                alt=""
                fill
                sizes="288px"
                className={hovered.imageFit === "contain" ? "object-contain p-4" : "object-cover"}
              />
            </div>
          </div>
        )}
      </div>

      {/* Botón flotante: abre un proyecto al azar */}
      <button
        type="button"
        onClick={surprise}
        title={t.surpriseLabel}
        tabIndex={inView ? 0 : -1}
        className={`fixed bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full border border-line bg-surface/85 px-5 py-2.5 font-mono text-sm shadow-lg shadow-black/40 backdrop-blur-md transition-all duration-300 hover:border-accent hover:text-accent ${inView ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
      >
        <span className="text-accent">&gt;</span> {t.surprise}
      </button>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
