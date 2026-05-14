"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/locomotive-scroll.css";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      initCustomTicker: (onRender) => gsap.ticker.add(onRender),
      destroyCustomTicker: (onRender) => gsap.ticker.remove(onRender),
    });

    const lenis = scroll.lenisInstance;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    gsap.ticker.lagSmoothing(0);

    return () => {
      if (lenis) lenis.off("scroll", ScrollTrigger.update);
      scroll.destroy();
    };
  }, []);

  return null;
}
