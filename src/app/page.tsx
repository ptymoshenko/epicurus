import Hero from "./components/Hero";
import Experience from "./components/Experience";
import About from "./components/About";
import PhotoBreak from "./components/PhotoBreak";
import Services from "./components/Services";

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <About />
      <PhotoBreak />
      <Services />
    </main>
  );
}
