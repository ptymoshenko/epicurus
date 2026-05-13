"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

export default function ImageReveal({
  children,
  className,
  style,
  color = "#07261E",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlay,
        { clipPath: "inset(0 0% 0 0%)" },
        {
          clipPath: "inset(0 0% 0 100%)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className ?? ""}`}
      style={style}
    >
      {children}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
