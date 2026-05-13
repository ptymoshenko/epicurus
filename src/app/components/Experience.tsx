import HeadingReveal from "@/components/HeadingReveal";

const displayStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "min(8.5vw, 96px)",
} as const;

export default function Experience() {
  return (
    <section className="px-4 py-12 md:px-8 md:py-[120px]">
      {/* [ 8+ years in industry ] + divider */}
      <div className="flex flex-col gap-3 items-end mb-6">
        <p
          className="text-right text-[14px] uppercase leading-[1.1] text-[#1f1f1f]"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ 8+ years in industry ]
        </p>
        <div className="w-full h-px bg-[#1f1f1f]" />
      </div>

      {/* Big staggered type — desktop: staggered left; mobile: centered */}
      <div className="flex flex-col gap-2 uppercase">

        {/* Row 1: mobile — 001 stacked above text; desktop — text + 001 side by side */}
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-3 md:justify-start">
          <span
            className="md:hidden text-[14px] leading-[1.1] text-[#1f1f1f]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            001
          </span>
          <HeadingReveal
            theme="#07261E"
            className="font-light leading-[0.84] tracking-[-0.08em] text-black whitespace-nowrap text-center md:text-left"
            style={displayStyle}
          >
            A creative director&nbsp;&nbsp;&nbsp;/
          </HeadingReveal>
          <span
            className="hidden md:block text-[14px] leading-[1.1] text-[#1f1f1f] shrink-0 pt-1"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            001
          </span>
        </div>

        {/* Row 2: Photographer (italic) */}
        <HeadingReveal
          theme="#07261E"
          className="font-light italic leading-[0.84] tracking-[-0.08em] text-black whitespace-nowrap text-center md:text-left md:ml-[14.9vw]"
          style={displayStyle}
        >
          Photographer
        </HeadingReveal>

        {/* Row 3: Born & raised (& in Playfair italic) */}
        <HeadingReveal
          theme="#07261E"
          className="font-light leading-[0.84] tracking-[-0.08em] text-black whitespace-nowrap text-center md:text-left md:ml-[42.4vw]"
          style={displayStyle}
        >
          Born{" "}
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            &amp;
          </span>
          {" "}raised
        </HeadingReveal>

        {/* Row 4: on the south side */}
        <HeadingReveal
          theme="#07261E"
          className="font-light leading-[0.84] tracking-[-0.08em] text-black whitespace-nowrap text-center md:text-left"
          style={displayStyle}
        >
          on the south side
        </HeadingReveal>

        {/* Row 5: of chicago. + [ creative freelancer ] */}
        <div className="relative flex flex-col items-center md:block">
          <HeadingReveal
            theme="#07261E"
            className="font-light italic leading-[0.84] tracking-[-0.08em] text-black whitespace-nowrap md:ml-[42.1vw]"
            style={displayStyle}
          >
            of chicago.
          </HeadingReveal>
          <p
            className="hidden md:block absolute text-[14px] leading-[1.1] text-[#1f1f1f] whitespace-nowrap"
            style={{ fontFamily: "var(--font-geist-mono)", left: "74.93vw", top: "26px" }}
          >
            [ creative freelancer ]
          </p>
          <p
            className="md:hidden mt-3 text-[14px] leading-[1.1] text-[#1f1f1f]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ creative freelancer ]
          </p>
        </div>

      </div>
    </section>
  );
}
