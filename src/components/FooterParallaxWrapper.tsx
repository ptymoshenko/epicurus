"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FooterParallaxWrapper({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = wrapRef.current;
    if (!el) return;

    const inner = el.querySelector<HTMLElement>("[data-footer-parallax-inner]");
    const dark = el.querySelector<HTMLElement>("[data-footer-parallax-dark]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "clamp(top bottom)",
        end: "clamp(top top)",
        scrub: true,
      },
    });

    if (inner) tl.from(inner, { yPercent: -25, ease: "linear" });
    if (dark) tl.from(dark, { opacity: 0.5, ease: "linear" }, "<");

    return () => tl.scrollTrigger?.kill();
  }, []);

  return (
    <div ref={wrapRef} data-footer-parallax="" className="relative overflow-hidden">
      <div data-footer-parallax-inner="">
        {children}
      </div>
      <div
        data-footer-parallax-dark=""
        className="pointer-events-none absolute inset-0 bg-[#201d1d] opacity-0"
      />
    </div>
  );
}
