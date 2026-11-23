import { notFound } from "next/navigation";

// Cualquier ruta desconocida dentro de /es o /en muestra la página 404 en su idioma.
export default function CatchAll() {
  notFound();
}
