"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];
const NAV_HEIGHT = 70;

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const check = () => {
      const darkSections = document.querySelectorAll<HTMLElement>("[data-nav-theme='dark']");
      let dark = false;
      darkSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < NAV_HEIGHT && rect.bottom > 0) dark = true;
      });
      setIsDark(dark);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const textColor = isDark ? "text-white" : "text-black";
  const btnBg = isDark ? "bg-white" : "bg-black";
  const btnText = isDark ? "text-black" : "text-white";
  const strokeColor = isDark ? "white" : "black";

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
                <path d="M18 6L6 18M6 6l12 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-8 mt-10">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" onClick={() => setMenuOpen(false)}
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

      {/* Fixed nav bar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-8 py-6">
        <span
          className={`font-semibold text-[16px] tracking-[-0.04em] transition-colors duration-300 ${textColor}`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          H.Studio
        </span>

        <nav
          className={`hidden md:flex items-center gap-14 uppercase font-semibold text-[16px] tracking-[-0.04em] transition-colors duration-300 ${textColor}`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="hover:opacity-60 transition-opacity">
              {link}
            </a>
          ))}
        </nav>

        <button
          className={`hidden md:flex items-center justify-center font-medium text-[14px] tracking-[-0.04em] uppercase px-4 py-3 rounded-full overflow-hidden transition-colors duration-300 ${btnBg} ${btnText}`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Let&apos;s talk
        </button>

        <button
          className="md:hidden flex items-center justify-center"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
            <path d="M3 6h18M3 12h18M3 18h18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" className="transition-all duration-300" />
          </svg>
        </button>
      </header>
    </>
  );
}
