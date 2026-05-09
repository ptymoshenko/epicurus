"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];
const NAV_HEIGHT = 70;

export default function Navbar() {
  const isDarkRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // header
  const logoRef = useRef<HTMLSpanElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);
  const desktopLinkRefs = useRef<HTMLAnchorElement[]>([]);
  const desktopUnderlineRefs = useRef<HTMLSpanElement[]>([]);
  const desktopBtnRef = useRef<HTMLButtonElement>(null);
  const desktopBtnFillRef = useRef<HTMLSpanElement>(null);
  const desktopBtnTextRef = useRef<HTMLSpanElement>(null);
  const burgerSvgRef = useRef<SVGSVGElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // overlay
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayLogoRef = useRef<HTMLSpanElement>(null);
  const linkEls = useRef<HTMLAnchorElement[]>([]);
  const overlayCta = useRef<HTMLButtonElement>(null);
  const overlayCtaFillRef = useRef<HTMLSpanElement>(null);
  const overlayCtaTextRef = useRef<HTMLSpanElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isOpen = useRef(false);

  // ─── scroll-based theme ────────────────────────────────────────────
  useEffect(() => {
    const applyTheme = (dark: boolean) => {
      isDarkRef.current = dark;

      // logo + desktop nav text
      [logoRef.current, desktopNavRef.current].forEach((el) => {
        if (!el) return;
        el.classList.toggle("text-white", dark);
        el.classList.toggle("text-black", !dark);
      });

      // desktop button — use inline style to avoid GSAP vs class conflicts
      if (desktopBtnRef.current) {
        desktopBtnRef.current.style.backgroundColor = dark ? "#ffffff" : "#111111";
        desktopBtnRef.current.style.color = dark ? "#111111" : "#ffffff";
        // clear any GSAP-set color on the text span so the button colour takes over
        gsap.set(desktopBtnTextRef.current, { clearProps: "color" });
      }

      // burger
      if (!isOpen.current) {
        burgerSvgRef.current
          ?.querySelectorAll("path")
          .forEach((p) => p.setAttribute("stroke", dark ? "white" : "black"));
      }
    };

    const check = () => {
      const darkSections = document.querySelectorAll<HTMLElement>("[data-nav-theme='dark']");
      let dark = false;
      darkSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < NAV_HEIGHT && rect.bottom > 0) dark = true;
      });
      applyTheme(dark);
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

  // ─── GSAP initial state ────────────────────────────────────────────
  useEffect(() => {
    gsap.set(overlayRef.current, { clipPath: "inset(0 0 100% 0)", pointerEvents: "none" });
    gsap.set(overlayLogoRef.current, { opacity: 0, y: -10 });
    gsap.set(linkEls.current, { y: "110%" });
gsap.set(overlayCta.current, { opacity: 0, y: 16 });
    gsap.set(desktopUnderlineRefs.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(desktopBtnFillRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(overlayCtaFillRef.current, { scaleX: 0, transformOrigin: "left center" });
  }, []);

  // ─── desktop link hover ────────────────────────────────────────────
  const onLinkEnter = (i: number) => {
    gsap.to(desktopUnderlineRefs.current[i], {
      scaleX: 1, duration: 0.35, ease: "power3.out", transformOrigin: "left center",
    });
  };
  const onLinkLeave = (i: number) => {
    gsap.to(desktopUnderlineRefs.current[i], {
      scaleX: 0, duration: 0.25, ease: "power3.in", transformOrigin: "right center",
    });
  };

  // ─── desktop button hover ──────────────────────────────────────────
  const onBtnEnter = () => {
    const dark = isDarkRef.current;
    // dark theme → white button, fill black; light theme → dark button, fill white
    const fillBg   = dark ? "#111111" : "#ffffff";
    const textOver = dark ? "#ffffff" : "#111111";
    gsap.set(desktopBtnFillRef.current, { backgroundColor: fillBg, transformOrigin: "left center" });
    gsap.to(desktopBtnFillRef.current, { scaleX: 1, duration: 0.4, ease: "power3.out" });
    gsap.to(desktopBtnTextRef.current, { color: textOver, duration: 0.15 });
  };
  const onBtnLeave = () => {
    gsap.to(desktopBtnFillRef.current, {
      scaleX: 0, duration: 0.35, ease: "power3.in", transformOrigin: "right center",
    });
    // clear inline color → button's own inline style (from applyTheme) takes over
    gsap.set(desktopBtnTextRef.current, { clearProps: "color" });
  };

  // ─── overlay CTA hover ─────────────────────────────────────────────
  const onOverlayCtaEnter = () => {
    gsap.set(overlayCtaFillRef.current, { backgroundColor: "#111111", transformOrigin: "left center" });
    gsap.to(overlayCtaFillRef.current, { scaleX: 1, duration: 0.4, ease: "power3.out" });
    gsap.to(overlayCtaTextRef.current, { color: "#ffffff", duration: 0.15 });
  };
  const onOverlayCtaLeave = () => {
    gsap.to(overlayCtaFillRef.current, {
      scaleX: 0, duration: 0.35, ease: "power3.in", transformOrigin: "right center",
    });
    gsap.set(overlayCtaTextRef.current, { clearProps: "color" });
  };

  // ─── burger stroke helper ──────────────────────────────────────────
  const setBurgerStroke = (color: string) => {
    burgerSvgRef.current
      ?.querySelectorAll("path")
      .forEach((p) => p.setAttribute("stroke", color));
  };

  // ─── mobile menu open / close ──────────────────────────────────────
  const toggleMenu = () => (isOpen.current ? closeMenu() : openMenu());

  const openMenu = () => {
    if (isOpen.current) return;
    isOpen.current = true;
    document.body.style.overflow = "hidden";
    setBurgerStroke("black");

    if (tlRef.current) tlRef.current.kill();

    tlRef.current = gsap
      .timeline()
      .to([logoRef.current, burgerRef.current], { opacity: 0, duration: 0.15, ease: "power2.in" })
      .set(overlayRef.current, { pointerEvents: "all" })
      .to(
        overlayRef.current,
        { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power4.inOut" },
        "-=0.05"
      )
      .to(overlayLogoRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.6")
      .to(linkEls.current, { y: "0%", duration: 0.6, ease: "power3.out", stagger: 0.07 }, "-=0.4")
      .to(overlayCta.current, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.3");
  };

  const closeMenu = () => {
    if (!isOpen.current) return;
    isOpen.current = false;

    if (tlRef.current) tlRef.current.kill();

    tlRef.current = gsap
      .timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setBurgerStroke(isDarkRef.current ? "white" : "black");
        },
      })
      .to(overlayCta.current, { opacity: 0, y: 12, duration: 0.25, ease: "power2.in" })
      .to(
        [...linkEls.current].reverse(),
        { y: "110%", duration: 0.35, ease: "power2.in", stagger: 0.05 },
        "-=0.15"
      )
      .to(overlayLogoRef.current, { opacity: 0, y: -10, duration: 0.25, ease: "power2.in" }, "-=0.2")
      .to(
        overlayRef.current,
        { clipPath: "inset(0 0 100% 0)", duration: 0.75, ease: "power4.inOut" },
        "-=0.1"
      )
      .set(overlayRef.current, { pointerEvents: "none" })
      .to([logoRef.current, burgerRef.current], { opacity: 1, duration: 0.2, ease: "power2.out" });
  };

  return (
    <>
      {/* ── Mobile overlay ─────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-black flex flex-col justify-between px-4 py-6"
        style={{ clipPath: "inset(0 0 100% 0)", pointerEvents: "none" }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between">
          <span
            ref={overlayLogoRef}
            className="font-semibold text-[16px] tracking-[-0.04em] text-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            H.Studio
          </span>
          <button onClick={closeMenu} aria-label="Close menu" className="flex items-center justify-center p-1 -mr-1">
            <svg viewBox="0 0 18 18" fill="none" width="18" height="18">
              <path d="M1 1l16 16M17 1L1 17" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-4">
          {NAV_LINKS.map((link, i) => (
            <div key={link} className="overflow-hidden">
              <a
                ref={(el) => { if (el) linkEls.current[i] = el; }}
                href="#"
                onClick={closeMenu}
                className="block uppercase font-semibold tracking-[-0.04em] text-white leading-none"
                style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(40px, 9vw, 80px)" }}
              >
                {link}
              </a>
            </div>
          ))}
        </nav>

        {/* CTA — fill-wipe hover */}
        <button
          ref={overlayCta}
          className="self-start relative overflow-hidden flex items-center justify-center font-medium text-[14px] tracking-[-0.04em] uppercase px-4 py-3 rounded-full text-[#111111]"
          style={{ backgroundColor: "#ffffff", fontFamily: "var(--font-inter)" }}
          onMouseEnter={onOverlayCtaEnter}
          onMouseLeave={onOverlayCtaLeave}
        >
          <span ref={overlayCtaFillRef} className="absolute inset-0 rounded-full" aria-hidden />
          <span ref={overlayCtaTextRef} className="relative z-[1]">Let&apos;s talk</span>
        </button>
      </div>

      {/* ── Progressive blur ─────────────────────────────────────── */}
      <div className="progressive-blur" aria-hidden>
        <div className="progressive-blur__layer is--1" />
        <div className="progressive-blur__layer is--2" />
        <div className="progressive-blur__layer is--3" />
        <div className="progressive-blur__layer is--4" />
        <div className="progressive-blur__layer is--5" />
      </div>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 lg:px-8 py-[22px]">
        <span
          ref={logoRef}
          className="font-semibold text-[16px] tracking-[-0.04em] text-white transition-colors duration-300"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          H.Studio
        </span>

        {/* Desktop nav — underline hover */}
        <nav
          ref={desktopNavRef}
          className="hidden lg:flex items-center gap-14 text-black transition-colors duration-300"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              ref={(el) => { if (el) desktopLinkRefs.current[i] = el; }}
              href="#"
              className="relative flex flex-col uppercase font-semibold text-[16px] tracking-[-0.04em]"
              onMouseEnter={() => onLinkEnter(i)}
              onMouseLeave={() => onLinkLeave(i)}
            >
              {link}
              <span
                ref={(el) => { if (el) desktopUnderlineRefs.current[i] = el; }}
                className="absolute bottom-[-3px] left-0 w-full h-[1.5px] bg-current"
                aria-hidden
              />
            </a>
          ))}
        </nav>

        {/* Desktop button — fill-wipe hover, colour driven by inline style via applyTheme */}
        <button
          ref={desktopBtnRef}
          className="hidden lg:flex relative overflow-hidden items-center justify-center font-medium text-[14px] tracking-[-0.04em] uppercase px-4 py-3 rounded-full text-white"
          style={{ backgroundColor: "#111111", fontFamily: "var(--font-inter)" }}
          onMouseEnter={onBtnEnter}
          onMouseLeave={onBtnLeave}
        >
          <span ref={desktopBtnFillRef} className="absolute inset-0 rounded-full" aria-hidden />
          <span ref={desktopBtnTextRef} className="relative z-[1]">Let&apos;s talk</span>
        </button>

        {/* Burger */}
        <button
          ref={burgerRef}
          className="lg:hidden flex items-center justify-center p-1 -mr-1"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg ref={burgerSvgRef} viewBox="0 0 24 24" fill="none" width="24" height="24">
            <path d="M3 6h18" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
            <path d="M3 12h18" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
            <path d="M3 18h18" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
      </header>
    </>
  );
}
