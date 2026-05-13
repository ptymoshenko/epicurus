"use client";

import HeadingReveal from "@/components/HeadingReveal";

export default function Footer() {
  const socials = ["Facebook", "Instagram", "X.com", "LinkedIn"];

  return (
    <footer data-nav-theme="dark" className="bg-black">
      <div className="flex flex-col px-4 pt-12 md:px-8 md:pt-[48px]" style={{ gap: "clamp(48px, 8.33vw, 120px)" }}>

        {/* ── Top: Inquiry + Socials + Divider ── */}
        <div className="flex flex-col gap-12 md:gap-[48px]">

          {/* Row */}
          <div className="flex flex-col gap-12 md:flex-row md:justify-between">

            {/* Left: tagline + button */}
            <div className="flex flex-col gap-3">
              <HeadingReveal
                theme="#07261E"
                className="text-[24px] leading-[1.1] tracking-[-0.04em] uppercase text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <em>Have a </em>
                <span>project</span>
                <em> in mind?</em>
              </HeadingReveal>
              <button
                className="self-start border border-white text-white text-[14px] font-medium tracking-[-0.04em] uppercase px-4 py-3 rounded-full cursor-pointer"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Let&apos;s talk
              </button>
            </div>

            {/* Desktop center: Facebook / Instagram */}
            <div
              className="hidden md:block text-center text-white text-[18px] leading-[1.1] tracking-[-0.04em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <p>Facebook</p>
              <p>Instagram</p>
            </div>

            {/* Desktop right: X.com / LinkedIn */}
            <div
              className="hidden md:block text-right text-white text-[18px] leading-[1.1] tracking-[-0.04em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <p>X.com</p>
              <p>LinkedIn</p>
            </div>

            {/* Mobile: all socials stacked */}
            <div
              className="flex flex-col gap-4 md:hidden text-white text-[18px] leading-[1.1] tracking-[-0.04em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {socials.map((s) => (
                <p key={s}>{s}</p>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/30" />
        </div>

        {/* ── Desktop Bottom: Big H.Studio + links ── */}
        <div className="hidden md:flex items-end gap-4">
          {/* H.Studio overflow container */}
          <div
            className="relative flex-1 overflow-hidden"
            style={{ height: "min(15.21vw, 219px)" }}
          >
            <p
              className="absolute whitespace-nowrap font-normal text-white uppercase leading-[0.8]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "min(20.14vw, 290px)",
                letterSpacing: "-0.06em",
                top: "50%",
                transform: "translateY(-50%)",
                left: 0,
              }}
            >
              H.Studio
            </p>
            {/* [ Coded By Claude ] rotated */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[15px] h-[160px]">
              <p
                className="-rotate-90 whitespace-nowrap text-[14px] leading-[1.1] text-white uppercase"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                [ Coded By Claude ]
              </p>
            </div>
          </div>

          {/* Links — bottom-right */}
          <div
            className="shrink-0 flex flex-col gap-1 items-end pb-8 text-white text-[12px] leading-[1.1] tracking-[-0.04em] uppercase underline whitespace-nowrap"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <p>Licences</p>
            <p>Privacy Policy</p>
          </div>
        </div>

        {/* ── Mobile Bottom ── */}
        <div className="md:hidden flex flex-col gap-6 pb-6">
          <div
            className="flex flex-col gap-3 text-white text-[12px] leading-[1.1] tracking-[-0.04em] uppercase underline"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <p>Licences</p>
            <p>Privacy Policy</p>
          </div>
          <div className="flex flex-col gap-3">
            <p
              className="text-white text-[10px] leading-[1.1] uppercase"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              [ Coded By Claude ]
            </p>
            <p
              className="text-white font-normal uppercase leading-[0.8] whitespace-nowrap"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "min(22vw, 290px)",
                letterSpacing: "-0.06em",
              }}
            >
              H.Studio
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
