import Image from "next/image";
import ButtonPill from "@/components/ButtonPill";

export default function Hero() {
  return (
    <>
      <section className="relative h-screen overflow-hidden flex flex-col px-4 lg:px-8" data-nav-theme="dark">

        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Harvey Specter"
            fill
            className="object-cover object-top pointer-events-none"
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

        {/* Banner — flex-1 fills remaining space, content pushed to bottom on mobile */}
        <div className="flex-1 flex flex-col justify-end pb-6 lg:pb-[72px]">

          {/* [ Hello i'm ] + Name */}
          <div className="flex flex-col w-full">
            <div className="lg:pl-[4px] mb-[8px] lg:mb-[-12px]">
              <p
                className="font-normal text-[14px] text-white uppercase leading-[1.1] mix-blend-overlay whitespace-nowrap"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                [ Hello i&apos;m ]
              </p>
            </div>

            {/* Desktop: single line spanning full width */}
            <p
              className="hidden lg:block font-medium text-white uppercase text-left w-full mix-blend-overlay whitespace-nowrap overflow-hidden"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11vw",
                lineHeight: "1",
                letterSpacing: "-0.07em",
              }}
            >
              Harvey&nbsp;&nbsp;&nbsp;<span style={{ fontStyle: "italic" }}>Specter</span>
            </p>

            {/* Mobile/tablet: stacked, left-aligned */}
            <div className="lg:hidden flex flex-col w-full">
              <p
                className="font-medium text-white uppercase mix-blend-overlay leading-[0.84] w-full"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "22vw",
                  letterSpacing: "-0.07em",
                }}
              >
                Harvey
              </p>
              <p
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
          <div className="relative z-[1] flex flex-col items-start lg:items-end w-full mt-8 lg:mt-3">
            <div className="flex flex-col gap-[17px] items-start w-[293px] lg:w-[294px]">
              <p
                className="font-normal italic text-[#1f1f1f] text-[14px] tracking-[-0.04em] uppercase leading-[1.1]"
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
