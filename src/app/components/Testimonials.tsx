"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import HeadingReveal from "@/components/HeadingReveal";
import "swiper/css";
import Image from "next/image";

const testimonials = [
  {
    name: "Marko Stojković",
    text: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    logo: "/images/stars-2.svg",
    logoW: 143,
    logoH: 19,
    desktopRotate: "-6.85deg",
    mobileRotate: "-3.5deg",
    nameBold: false,
    desktop: { left: "7.08vw", top: "142px" },
  },
  {
    name: "Lukas Weber",
    text: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    logo: "/images/stars-1.svg",
    logoW: 138,
    logoH: 20,
    desktopRotate: "2.9deg",
    mobileRotate: "2deg",
    nameBold: true,
    desktop: { left: "46.94vw", top: "272px" },
  },
  {
    name: "Sarah Jenkins",
    text: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    logo: "/images/stars-3.svg",
    logoW: 109,
    logoH: 31,
    desktopRotate: "2.23deg",
    mobileRotate: "2.23deg",
    nameBold: false,
    desktop: { left: "21.18vw", top: "553px" },
  },
  {
    name: "Sofia Martínez",
    text: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    logo: "/images/stars-4.svg",
    logoW: 81,
    logoH: 37,
    desktopRotate: "-4.15deg",
    mobileRotate: "-4deg",
    nameBold: false,
    desktop: { left: "68.54vw", top: "546px" },
  },
];

function TestimonialCard({
  item,
  rotate,
  width = 353,
  border = false,
}: {
  item: (typeof testimonials)[0];
  rotate: string;
  width?: number;
  border?: boolean;
}) {
  return (
    <div
      style={{ transform: `rotate(${rotate})`, width: `${width}px` }}
      className={`bg-[#f1f1f1] ${border ? "border border-[#ddd]" : ""} rounded-[4px] p-6 flex flex-col gap-4`}
    >
      <div style={{ width: item.logoW, height: item.logoH }} className="relative shrink-0">
        <Image src={item.logo} alt="" fill style={{ objectFit: "contain", objectPosition: "left" }} />
      </div>
      <p
        className="text-[18px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {item.text}
      </p>
      <p
        className={`text-[16px] leading-[1.1] tracking-[-0.04em] uppercase whitespace-nowrap ${item.nameBold ? "font-black" : "font-normal"} text-black`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {item.name}
      </p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section>
      {/* ── Desktop ── */}
      <div className="hidden md:block relative min-h-[900px] px-8 py-[120px] overflow-hidden">
        {/* Big "TESTIMONIALS" text — centred, behind cards */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <HeadingReveal
            theme="#07261E"
            className="font-normal uppercase text-black text-center leading-[1.1] whitespace-nowrap"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "min(13.75vw, 198px)",
              letterSpacing: "min(-0.96vw, -13.86px)",
            }}
          >
            Testimonials
          </HeadingReveal>
        </div>

        {/* Scattered cards */}
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="absolute"
            style={{ left: item.desktop.left, top: item.desktop.top }}
          >
            <TestimonialCard item={item} rotate={item.desktopRotate} />
          </div>
        ))}
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden overflow-x-hidden">
      <div className="px-4 py-16">
        <HeadingReveal
          theme="#07261E"
          className="font-medium text-[64px] leading-[0.8] tracking-[-0.07em] text-black text-center capitalize mb-8"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Testimonials
        </HeadingReveal>

        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          grabCursor
          className="!overflow-visible"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.name} style={{ width: "270px" }}>
              <TestimonialCard
                item={item}
                rotate={item.mobileRotate}
                width={260}
                border
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>
    </section>
  );
}
