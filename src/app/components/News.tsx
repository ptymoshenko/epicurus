"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Image from "next/image";

function ArrowIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="shrink-0">
      <path
        d="M8 24L24 8M24 8H12M24 8V20"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const articles = [
  {
    image: "/images/news-1.png",
    text: "Hey there! Just a heads up, life can be a bit of a rollercoaster with all the ups and downs. But don't worry, it's all part of the ride!",
    offsetDesktop: false,
  },
  {
    image: "/images/news-2.png",
    text: "Hello! Life is quite the adventure, filled with twists and turns. Embrace every moment and savor the journey!",
    offsetDesktop: true,
  },
  {
    image: "/images/news-3.png",
    text: "Greetings! Life is an exciting journey, full of surprises and challenges. Cherish each experience and enjoy the ride!",
    offsetDesktop: false,
  },
  {
    image: "/images/news-4.png",
    text: "Hello! Life is quite the adventure, filled with twists and turns. Embrace every moment and savor the journey!",
    offsetDesktop: true,
  },
  {
    image: "/images/news-5.png",
    text: "Greetings! Life is an exciting journey, full of surprises and challenges. Cherish each experience and enjoy the ride!",
    offsetDesktop: false,
  },
];

function ReadMoreLink() {
  return (
    <div className="border-b border-black flex gap-[10px] items-center py-1 self-start cursor-pointer">
      <span
        className="text-[14px] font-medium tracking-[-0.04em] uppercase whitespace-nowrap text-black"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Read more
      </span>
      <ArrowIcon />
    </div>
  );
}

function NewsCard({ image, text }: { image: string; text: string }) {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="relative w-full h-[398px] md:h-[469px] shrink-0">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 300px, 353px"
        />
      </div>
      <p
        className="text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] flex-1"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {text}
      </p>
      <ReadMoreLink />
    </div>
  );
}

export default function News() {
  const [headingOpacity, setHeadingOpacity] = useState(1);

  const handleProgress = (swiper: SwiperType) => {
    setHeadingOpacity(swiper.progress === 0 ? 1 : 0.1);
  };

  return (
    <section className="bg-[#f3f3f3]">
      {/* ── Desktop — horizontal Swiper with fading heading ── */}
      <div className="hidden md:flex items-end overflow-hidden px-8 py-[120px] gap-48">
        {/* Rotated heading — fades on scroll */}
        <div
          className="flex items-center justify-center w-[110px] h-[706px] shrink-0 transition-opacity duration-300"
          style={{ opacity: headingOpacity }}
        >
          <div className="-rotate-90 whitespace-nowrap">
            <div
              className="font-light leading-[0.86] tracking-[-0.08em] text-black uppercase text-[64px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <p>Keep up with my latest</p>
              <p>news &amp; achievements</p>
            </div>
          </div>
        </div>

        {/* Horizontal Swiper */}
        <div className="flex-1 min-w-0">
          <Swiper
            slidesPerView="auto"
            spaceBetween={31}
            grabCursor
            onProgress={handleProgress}
            className="!overflow-visible"
          >
            {articles.map((article, i) => (
              <SwiperSlide
                key={article.image}
                style={{ width: "353px" }}
                className={`relative ${article.offsetDesktop ? "pt-[120px]" : "h-[581px]"}`}
              >
                {i < articles.length - 1 && (
                  <div
                    className="absolute w-px bg-[#cccccc]"
                    style={{ right: "-16px", top: "0", height: "706px" }}
                  />
                )}
                <NewsCard image={article.image} text={article.text} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ── Mobile — Swiper with overflow fix ── */}
      <div className="md:hidden overflow-x-hidden">
        <div className="px-4 py-16 flex flex-col gap-8">
          <p
            className="font-light text-[32px] leading-[0.86] tracking-[-0.08em] text-black uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Keep up with my latest news &amp; achievements
          </p>

          <Swiper
            slidesPerView="auto"
            spaceBetween={16}
            grabCursor
            className="!overflow-visible w-full"
          >
            {articles.map((article) => (
              <SwiperSlide key={article.image} style={{ width: "300px" }}>
                <NewsCard image={article.image} text={article.text} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
