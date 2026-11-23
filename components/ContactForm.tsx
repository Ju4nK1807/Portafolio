"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { fill } from "@/lib/i18n";
import { useI18n } from "./i18n/I18nProvider";
import { CheckIcon } from "./icons";

type Status = "idle" | "sending" | "success" | "mailto" | "error";

// Formulario de Formspree que reenvía los mensajes al correo del portafolio.
// Se puede cambiar con la variable NEXT_PUBLIC_FORMSPREE_ID (ver .env.example).
// Si quedara vacío, el formulario abre el cliente de correo con el mensaje listo.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xzerjbkz";

const inputClass =
  "mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-fg placeholder:text-muted/60 transition-colors outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 user-invalid:border-red-500";

export default function ContactForm() {
  const { dict } = useI18n();
  const t = dict.contact;
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");

    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`${t.mailtoSubject} — ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n${data.get("name")} · ${data.get("email")}`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error("Respuesta no válida");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" || status === "mailto") {
    const sent = status === "success";
    return (
      <div role="status" className="flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-surface p-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-accent-2/15 text-2xl text-accent-2">
          <CheckIcon />
        </span>
        <h3 className="mt-5 text-xl font-semibold">{sent ? t.sentTitle : t.mailtoTitle}</h3>
        <p className="mt-2 text-muted">
          {sent ? t.sentText : fill(t.mailtoText, { email: site.email })}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {t.another}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          {t.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          placeholder={t.namePlaceholder}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          {t.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t.emailPlaceholder}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder={t.messagePlaceholder}
          className={`${inputClass} resize-y`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-500">
          {fill(t.error, { email: site.email })}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-accent px-6 py-3 font-medium text-accent-fg transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.send}
      </button>
    </form>
  );
}
