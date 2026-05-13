"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterParallaxWrapper({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const inner = el.querySelector<HTMLElement>("[data-footer-parallax-inner]");
    const dark = el.querySelector<HTMLElement>("[data-footer-parallax-dark]");

    const ctx = gsap.context(() => {
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
    }, el);

    return () => ctx.revert();
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
