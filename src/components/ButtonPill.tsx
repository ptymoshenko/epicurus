"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// variant "dark"  = #111111 bg, white text  (use on light backgrounds)
// variant "light" = #ffffff bg, #111111 text (use on dark backgrounds)

interface ButtonPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark" | "light";
}

export default function ButtonPill({
  children,
  variant = "dark",
  className,
  style,
  ...props
}: ButtonPillProps) {
  const fillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const fillColor   = variant === "dark" ? "#ffffff" : "#111111";
  const textOnHover = variant === "dark" ? "#111111" : "#ffffff";
  const textOnRest  = variant === "dark" ? "#ffffff" : "#111111";

  useEffect(() => {
    gsap.set(fillRef.current, { scaleX: 0, transformOrigin: "left center" });
  }, []);

  const onEnter = () => {
    gsap.set(fillRef.current, { backgroundColor: fillColor, transformOrigin: "left center" });
    gsap.to(fillRef.current, { scaleX: 1, duration: 0.4, ease: "power3.out" });
    gsap.to(textRef.current, { color: textOnHover, duration: 0.15 });
  };

  const onLeave = () => {
    gsap.to(fillRef.current, {
      scaleX: 0,
      duration: 0.35,
      ease: "power3.in",
      transformOrigin: "right center",
    });
    gsap.to(textRef.current, { color: textOnRest, duration: 0.15 });
  };

  return (
    <button
      className={`relative overflow-hidden flex items-center justify-center font-medium text-[14px] tracking-[-0.04em] uppercase px-4 py-3 rounded-full ${className ?? ""}`}
      style={{
        backgroundColor: variant === "dark" ? "#111111" : "#ffffff",
        color: variant === "dark" ? "#ffffff" : "#111111",
        fontFamily: "var(--font-inter)",
        ...style,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      {...props}
    >
      <span ref={fillRef} className="absolute inset-0 rounded-full" aria-hidden />
      <span ref={textRef} className="relative z-[1]">
        {children}
      </span>
    </button>
  );
}
