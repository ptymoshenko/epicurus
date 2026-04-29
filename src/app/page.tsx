import Hero from "./components/Hero";
import Experience from "./components/Experience";
import About from "./components/About";
import PhotoBreak from "./components/PhotoBreak";
import Services from "./components/Services";
import SelectedWork from "./components/SelectedWork";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <About />
      <PhotoBreak />
      <Services />
      <SelectedWork />
      <Testimonials />
    </main>
  );
}
