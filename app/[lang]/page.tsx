import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Ruler from "@/components/Ruler";
import WelcomeBack from "@/components/WelcomeBack";
import { getProjects } from "@/data/projects";
import { isLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <Navbar />
      <Ruler />
      <WelcomeBack />
      <main id="contenido">
        <Hero lang={lang} />
        <About lang={lang} />
        <Projects projects={getProjects(lang)} />
        <Testimonials lang={lang} />
        <Experience lang={lang} />
        <Skills lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <BackToTop />
      {/* Desenfoque suave en el borde inferior de la pantalla */}
      <div aria-hidden="true" className="edge-fade pointer-events-none fixed inset-x-0 bottom-0 z-20 h-14" />
    </>
  );
}
