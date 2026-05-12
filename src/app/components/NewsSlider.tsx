"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";

export interface ArticleCard {
  _id: string;
  title: string;
  slug: string;
  imageUrl: string;
  excerpt: string;
  offsetDesktop: boolean;
}

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

function ReadMoreLink({ href }: { href: string }) {
  return (
    <Link href={href} className="border-b border-black flex gap-[10px] items-center py-1 self-start">
      <span
        className="text-[14px] font-medium tracking-[-0.04em] uppercase whitespace-nowrap text-black"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Read more
      </span>
      <ArrowIcon />
    </Link>
  );
}

function NewsCard({ article }: { article: ArticleCard }) {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="relative w-full h-[398px] md:h-[469px] shrink-0">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 300px, 353px"
        />
      </div>
      <p
        className="text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] flex-1"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {article.excerpt}
      </p>
      <ReadMoreLink href={`/news/${article.slug}`} />
    </div>
  );
}

export default function NewsSlider({
  articles,
  label,
}: {
  articles: ArticleCard[];
  label?: string;
}) {
  const [headingOpacity, setHeadingOpacity] = useState(1);

  const handleProgress = (swiper: SwiperType) => {
    setHeadingOpacity(swiper.progress === 0 ? 1 : 0.1);
  };

  return (
    <>
      {/* Desktop — "Read more" variant */}
      {label && (
        <div className="hidden md:flex flex-col gap-[100px] px-8 pb-[72px] pt-px">
          <div className="flex flex-col gap-3">
            <div className="w-full h-px bg-[#cccccc]" />
            <p
              className="text-[14px] uppercase text-[#1f1f1f]"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {label}
            </p>
          </div>
          <div className="w-full min-w-0 overflow-hidden">
            <Swiper
              slidesPerView="auto"
              spaceBetween={31}
              grabCursor
              className="!overflow-visible"
            >
              {articles.map((article, i) => {
                const hasOffset = i % 2 === 0;
                return (
                  <SwiperSlide
                    key={article._id}
                    style={{ width: "384px" }}
                    className={`relative ${hasOffset ? "pt-[120px]" : "h-[581px]"}`}
                  >
                    {/* Left divider — 31px gap between line and card content */}
                    <div
                      className="absolute w-px bg-[#cccccc]"
                      style={{ left: 0, top: 0, height: "706px" }}
                    />
                    <div style={{ paddingLeft: "31px", height: "100%" }}>
                      <NewsCard article={article} />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}

      {/* Desktop — homepage variant */}
      {!label && (
        <div className="hidden md:flex items-end overflow-hidden px-8 py-[120px] gap-48">
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
          <div className="flex-1 min-w-0 overflow-hidden">
            <Swiper
              slidesPerView="auto"
              spaceBetween={31}
              grabCursor
              onProgress={handleProgress}
              className="!overflow-visible"
            >
              {articles.map((article, i) => (
                <SwiperSlide
                  key={article._id}
                  style={{ width: "353px" }}
                  className={`relative ${article.offsetDesktop ? "pt-[120px]" : "h-[581px]"}`}
                >
                  {i < articles.length - 1 && (
                    <div
                      className="absolute w-px bg-[#cccccc]"
                      style={{ right: "-16px", top: "0", height: "706px" }}
                    />
                  )}
                  <NewsCard article={article} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* Mobile */}
      <div className="md:hidden overflow-x-hidden">
        <div className="px-4 py-16 flex flex-col gap-8">
          {label ? (
            <p
              className="text-[14px] uppercase text-[#1f1f1f]"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {label}
            </p>
          ) : (
            <p
              className="font-light text-[32px] leading-[0.86] tracking-[-0.08em] text-black uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Keep up with my latest news &amp; achievements
            </p>
          )}
          <Swiper
            slidesPerView="auto"
            spaceBetween={16}
            grabCursor
            className="!overflow-visible w-full"
          >
            {articles.map((article) => (
              <SwiperSlide key={article._id} style={{ width: "300px" }}>
                <NewsCard article={article} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
