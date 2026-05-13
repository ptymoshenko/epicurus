"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhotoBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const overlay = overlayRef.current;
    if (!el || !overlay) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlay,
        { clipPath: "inset(0 0% 0 0%)" },
        {
          clipPath: "inset(0 0% 0 100%)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full aspect-[375/565] md:aspect-[8/5] md:max-h-[900px] overflow-hidden"
    >
      <Image
        src="/images/photo-break.png"
        alt=""
        fill
        className="hidden md:block object-cover object-center"
        sizes="100vw"
      />
      <Image
        src="/images/photo-break.png"
        alt=""
        fill
        className="md:hidden object-cover object-[40%_center]"
        sizes="100vw"
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "#07261E" }}
      />
    </section>
  );
}
