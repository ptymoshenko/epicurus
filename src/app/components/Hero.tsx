"use client";

import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile full-screen menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col px-4 pt-6 pb-10">
          <div className="flex items-center justify-between py-6">
            <span
              className="capitalize font-semibold text-[16px] tracking-[-0.04em] text-black"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              H.Studio
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex items-center justify-center size-6"
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-6">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-8 mt-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="uppercase font-semibold text-[32px] tracking-[-0.04em] text-black leading-none"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {link}
              </a>
            ))}
          </nav>

          <button
            className="mt-auto self-start flex items-center justify-center bg-black text-white font-medium text-[14px] tracking-[-0.04em] uppercase px-4 py-3 rounded-full"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Let&apos;s talk
          </button>
        </div>
      )}

      <section className="relative h-screen overflow-hidden flex flex-col px-4 md:px-8">

        {/* Background photo — object-top on desktop shows chest/shoulders, center on mobile shows full body */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Harvey Specter"
            fill
            className="object-cover object-center md:object-top pointer-events-none"
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

        {/* Navbar — z-10 to sit above the background layers */}
        <div className="relative z-10 flex items-center justify-between w-full py-6 shrink-0">
          <span
            className="font-semibold text-[16px] tracking-[-0.04em] text-black"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            H.Studio
          </span>

          <nav
            className="hidden md:flex items-center gap-14 uppercase font-semibold text-[16px] tracking-[-0.04em] text-black"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="hover:opacity-60 transition-opacity">
                {link}
              </a>
            ))}
          </nav>

          <button
            className="hidden md:flex items-center justify-center bg-black text-white font-medium text-[14px] tracking-[-0.04em] uppercase px-4 py-3 rounded-full overflow-hidden"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Let&apos;s talk
          </button>

          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Image src="/images/hamburger.svg" alt="" width={24} height={24} unoptimized />
          </button>
        </div>

        {/* Banner — flex-1 fills remaining space, content pushed to bottom on mobile */}
        <div className="flex-1 flex flex-col justify-end md:justify-start md:mt-[200px] pb-8 md:pb-0">

          {/* [ Hello i'm ] + Name */}
          <div className="flex flex-col w-full">
            <div className="px-[4px] md:px-[18px] mb-[-6px] md:mb-[-12px]">
              <p
                className="font-normal text-[14px] text-white uppercase leading-[1.1] mix-blend-overlay whitespace-nowrap"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                [ Hello i&apos;m ]
              </p>
            </div>

            {/* Desktop: single line spanning full width */}
            <p
              className="hidden md:block font-medium text-white uppercase text-left w-full mix-blend-overlay whitespace-nowrap overflow-hidden"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11vw",
                lineHeight: "1",
                letterSpacing: "-0.07em",
              }}
            >
              Harvey&nbsp;&nbsp;&nbsp;<span style={{ fontStyle: "italic" }}>Specter</span>
            </p>

            {/* Mobile: stacked, each word fills the width */}
            <div className="md:hidden flex flex-col w-full">
              <p
                className="font-medium text-white uppercase mix-blend-overlay leading-[0.95] w-full"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "22vw",
                  letterSpacing: "-0.07em",
                }}
              >
                Harvey
              </p>
              <p
                className="font-medium italic text-white uppercase mix-blend-overlay leading-[0.95] w-full"
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
          <div className="relative z-[1] flex flex-col items-start md:items-end w-full mt-4 md:mt-3">
            <div className="flex flex-col gap-[17px] items-start w-[240px] md:w-[294px]">
              <p
                className="font-normal italic text-[#1f1f1f] text-[14px] tracking-[-0.04em] uppercase leading-[1.1]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                H.Studio is a full-service creative studio creating beautiful digital experiences and products. We are an award winning desing and art group specializing in branding, web design and engineering.
              </p>
              <button
                className="flex items-center justify-center bg-black text-white font-medium text-[14px] tracking-[-0.04em] uppercase px-4 py-3 rounded-full overflow-hidden"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Let&apos;s talk
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
