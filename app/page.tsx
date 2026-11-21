import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido">
        <Hero />
        <About />
        <Projects />
        <Testimonials />
        <Experience />
        <Skills />
      </main>
    </>
  );
}
