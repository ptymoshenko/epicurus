"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const colorMap: Record<string, string> = {
  pink: "#C700EF",
  white: "#FFFFFF",
};

const directionMap: Record<string, { prop: string; origin: string }> = {
  right: { prop: "scaleX", origin: "right center" },
  left:  { prop: "scaleX", origin: "left center" },
  up:    { prop: "scaleY", origin: "center top" },
  down:  { prop: "scaleY", origin: "center bottom" },
};

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  theme?: string;
  direction?: "left" | "right" | "up" | "down";
  scrollStart?: string;
  stagger?: number;
  staggerStart?: "start" | "end";
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span" | "section";
}

export default function HeadingReveal({
  children,
  className,
  style,
  theme = "#1f1f1f",
  direction = "right",
  scrollStart = "top 90%",
  stagger = 0.1,
  staggerStart = "start",
  as: Tag = "div",
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function resolveColor(value: string) {
      if (colorMap[value]) return colorMap[value];
      if (value.startsWith("--"))
        return getComputedStyle(document.body).getPropertyValue(value).trim() || value;
      return value;
    }

    const color = resolveColor(theme);
    const dirConfig = directionMap[direction] || directionMap.right;

    let st: ReturnType<typeof ScrollTrigger.create> | null = null;
    let tl: gsap.core.Timeline | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const split = SplitText.create(el, {
      type: "lines",
      linesClass: "highlight-marker-line",
      autoSplit: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSplit(self: any) {
        tl?.kill();
        st?.kill();
        el.querySelectorAll(".highlight-marker-bar").forEach((b: Element) => b.remove());

        const lines: HTMLElement[] = self.lines;
        const timeline = gsap.timeline({
          paused: true,
          onComplete: () => lines.forEach((l) => { l.style.overflow = ""; }),
        });

        lines.forEach((line, i) => {
          gsap.set(line, { position: "relative", overflow: "hidden" });

          const bar = document.createElement("div");
          bar.className = "highlight-marker-bar";
          Object.assign(bar.style, { backgroundColor: color, transformOrigin: dirConfig.origin });
          line.appendChild(bar);

          const idx = staggerStart === "end" ? lines.length - 1 - i : i;
          timeline.to(bar, { [dirConfig.prop]: 0, duration: 0.6, ease: "power3.inOut" }, idx * stagger);
        });

        gsap.set(el, { autoAlpha: 1 });

        st = ScrollTrigger.create({
          trigger: el,
          start: scrollStart,
          once: true,
          onEnter: () => timeline.play(),
        });

        tl = timeline;
      },
    });

    return () => {
      tl?.kill();
      st?.kill();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (split as any).revert?.();
      el.querySelectorAll(".highlight-marker-bar").forEach((b: Element) => b.remove());
    };
  }, [theme, direction, scrollStart, stagger, staggerStart]);

  const TagEl = Tag as React.ElementType;
  return (
    <TagEl ref={ref} data-highlight-marker-reveal className={className} style={style}>
      {children}
    </TagEl>
  );
}
