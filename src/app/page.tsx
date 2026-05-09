import { Suspense } from "react";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import About from "./components/About";
import PhotoBreak from "./components/PhotoBreak";
import Services from "./components/Services";
import SelectedWork from "./components/SelectedWork";
import Testimonials from "./components/Testimonials";
import News from "./components/News";
import Footer from "./components/Footer";
import FooterParallaxWrapper from "@/components/FooterParallaxWrapper";

export default function Home() {
  return (
    <>
      <main className="overflow-clip">
        <Hero />
        <Experience />
        <About />
        <PhotoBreak />
        <Services />
        <Suspense>
          <SelectedWork />
        </Suspense>
        <Testimonials />
        <Suspense>
          <News />
        </Suspense>
      </main>
      <FooterParallaxWrapper>
        <Footer />
      </FooterParallaxWrapper>
    </>
  );
}
