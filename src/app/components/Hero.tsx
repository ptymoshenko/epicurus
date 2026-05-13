"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import ButtonPill from "@/components/ButtonPill";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const leftGroupDesktopRef = useRef<HTMLDivElement>(null);
  const specterDesktopRef = useRef<HTMLSpanElement>(null);
  const leftGroupMobileRef = useRef<HTMLDivElement>(null);
  const specterMobileRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 1.5,
            pin: true,
            pinSpacing: true,
          },
        });

        tl.to(bgRef.current, { scale: 1.18, ease: "none" }, 0);
        tl.to(leftGroupDesktopRef.current, { x: "-60vw", ease: "none" }, 0);
        tl.to(specterDesktopRef.current, { x: "60vw", ease: "none" }, 0);
        tl.to(descRef.current, { opacity: 0, ease: "none" }, 0);
      });

      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 1.5,
            pin: true,
            pinSpacing: true,
          },
        });

        tl.to(bgRef.current, { scale: 1.18, ease: "none" }, 0);
        tl.to(leftGroupMobileRef.current, { x: "-60vw", ease: "none" }, 0);
        tl.to(specterMobileRef.current, { x: "60vw", ease: "none" }, 0);
        tl.to(descRef.current, { opacity: 0, ease: "none" }, 0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden flex flex-col px-4 lg:px-8"
        data-nav-theme="dark"
      >
        <div ref={bgRef} className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Harvey Specter"
            fill
            className="object-cover object-center pointer-events-none"
            priority
          />
        </div>

        {/* Blur at bottom of section with gradient fade-in from top */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[300px] backdrop-blur-[14px] bg-[rgba(217,217,217,0.01)]"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%)",
          }}
        />

        {/* Banner */}
        <div className="flex-1 flex flex-col justify-end pb-6 lg:pb-[72px]">

          <div className="flex flex-col w-full">

            {/* Desktop: Harvey left, Specter right on the same baseline */}
            <div className="hidden lg:flex w-full items-end">
              <div ref={leftGroupDesktopRef} className="flex flex-col shrink-0 mix-blend-overlay">
                <div className="pl-[4px] mb-[-12px]">
                  <p
                    className="font-normal text-[14px] text-white uppercase leading-[1.1] whitespace-nowrap"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    [ Hello i&apos;m ]
                  </p>
                </div>
                <span
                  className="font-medium text-white uppercase whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11vw",
                    lineHeight: "1",
                    letterSpacing: "-0.07em",
                  }}
                >
                  Harvey
                </span>
              </div>

              <span className="flex-1" />

              <span
                ref={specterDesktopRef}
                className="font-medium text-white uppercase mix-blend-overlay whitespace-nowrap shrink-0"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11vw",
                  lineHeight: "1",
                  letterSpacing: "-0.07em",
                  fontStyle: "italic",
                }}
              >
                Specter
              </span>
            </div>

            {/* Mobile: Hello I'm + Harvey group slides left, Specter slides right */}
            <div className="lg:hidden flex flex-col w-full">
              <div ref={leftGroupMobileRef} className="flex flex-col mix-blend-overlay">
                <div className="mb-[8px]">
                  <p
                    className="font-normal text-[14px] text-white uppercase leading-[1.1] whitespace-nowrap"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    [ Hello i&apos;m ]
                  </p>
                </div>
                <p
                  className="font-medium text-white uppercase leading-[0.84] w-full"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "22vw",
                    letterSpacing: "-0.07em",
                  }}
                >
                  Harvey
                </p>
              </div>

              <p
                ref={specterMobileRef}
                className="font-medium italic text-white uppercase mix-blend-overlay leading-[0.84] w-full"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "22vw",
                  letterSpacing: "-0.07em",
                }}
              >
                Specter
              </p>
            </div>
          </div>

          {/* Description + CTA */}
          <div
            ref={descRef}
            className="relative z-[1] flex flex-col items-start lg:items-end w-full mt-8 lg:mt-3"
          >
            <div className="flex flex-col gap-[17px] items-start w-[293px] lg:w-[294px]">
              <p
                className="font-normal italic text-white text-[14px] tracking-[-0.04em] uppercase leading-[1.1]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                H.Studio is a full-service creative studio creating beautiful digital experiences and products. We are an award winning desing and art group specializing in branding, web design and engineering.
              </p>
              <ButtonPill variant="dark">Let&apos;s talk</ButtonPill>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
