import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-page flex min-h-svh flex-col items-start justify-center gap-6">
      <p className="font-mono text-sm text-accent">Error 404</p>
      <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Esta página no existe.</h1>
      <p className="max-w-md text-lg text-muted">Puede que el enlace esté roto o que la página se haya movido.</p>
      <Link href="/" className="rounded-full bg-accent px-6 py-3 font-medium text-accent-fg">
        Volver al inicio
      </Link>
    </main>
  );
}
