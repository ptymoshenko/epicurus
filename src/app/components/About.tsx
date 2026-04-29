import Image from "next/image";

function CornerBracket({ rotation = 0 }: { rotation?: 0 | 90 | 180 | 270 }) {
  const transform =
    rotation === 0
      ? undefined
      : rotation === 90
      ? "rotate(90deg)"
      : rotation === 180
      ? "rotate(180deg)"
      : "rotate(270deg)";
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16.5 16.5"
      fill="none"
      overflow="visible"
      style={{ display: "block", flexShrink: 0, transform }}
    >
      <path d="M16.5 0.5H0.5V16.5" stroke="black" />
    </svg>
  );
}

export default function About() {
  return (
    <section className="px-4 py-12 md:px-8 md:py-20">
      {/* Divider */}
      <div className="w-full h-px bg-[#1f1f1f] mb-3" />

      {/* Mobile-only: 002 + [About] stacked labels */}
      <div className="flex flex-col gap-5 md:hidden mb-5">
        <p
          className="text-[14px] uppercase leading-[1.1] text-[#1f1f1f]"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          002
        </p>
        <p
          className="text-[14px] uppercase leading-[1.1] text-[#1f1f1f]"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ About ]
        </p>
      </div>

      {/* Desktop: label + right block */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start">

        {/* Desktop [ ABOUT ] label */}
        <p
          className="hidden md:block text-[14px] uppercase leading-[1.1] text-[#1f1f1f] whitespace-nowrap"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ About ]
        </p>

        {/* Right column: bio + portfolio */}
        <div className="flex flex-col md:flex-row md:items-end md:gap-8 md:w-[983px] gap-5">

          {/* Bio paragraph with corner brackets */}
          <div className="flex items-center gap-3 flex-1">
            {/* Left brackets (top + bottom) */}
            <div className="flex flex-col justify-between self-stretch w-4 shrink-0">
              <CornerBracket rotation={0} />
              <CornerBracket rotation={270} />
            </div>

            {/* Paragraph */}
            <p
              className="flex-1 font-normal leading-[1.3] text-[14px] tracking-[-0.04em] text-[#1f1f1f] py-3"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.
            </p>

            {/* Right brackets (top + bottom) */}
            <div className="flex flex-col justify-between self-stretch w-4 shrink-0">
              <CornerBracket rotation={90} />
              <CornerBracket rotation={180} />
            </div>
          </div>

          {/* Portfolio image */}
          <div className="flex flex-row gap-6 items-start shrink-0">
            <p
              className="hidden md:block text-[14px] uppercase leading-[1.1] text-[#1f1f1f] whitespace-nowrap"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              002
            </p>
            {/* Desktop: fixed 436×614, Mobile: full-width with aspect ratio */}
            <div className="relative w-full md:w-[436px] aspect-[422/594] md:aspect-auto md:h-[614px]">
              <Image
                src="/images/about-portfolio.png"
                alt="Portfolio"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
