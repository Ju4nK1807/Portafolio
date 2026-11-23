"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./i18n/I18nProvider";
import { CheckIcon, CopyIcon } from "./icons";

type CopyEmailButtonProps = {
  email: string;
};

export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const { dict } = useI18n();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent"
    >
      {copied ? <CheckIcon className="text-accent-2" /> : <CopyIcon />}
      <span aria-live="polite">{copied ? dict.contact.copied : dict.contact.copy}</span>
    </button>
  );
}
