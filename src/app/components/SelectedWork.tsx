import Image from "next/image";

function CornerBracket({ rotation = 0 }: { rotation?: 0 | 90 | 180 | 270 }) {
  const transform = rotation === 0 ? undefined : `rotate(${rotation}deg)`;
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16.5 16.5"
      fill="none"
      overflow="visible"
      style={{ display: "block", flexShrink: 0, transform }}
    >
      <path d="M16.5 0.5H0.5V16.5" stroke="#1f1f1f" />
    </svg>
  );
}

function Tag({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <span
      className={`backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[14px] font-medium tracking-[-0.04em] whitespace-nowrap ${light ? "text-white" : "text-[#111]"}`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {label}
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
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

interface WorkItem {
  title: string;
  image: string;
  tags: string[];
  lightTags: boolean;
  desktopHeight: string;
}

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      {/* Image */}
      <div
        className={`relative w-full h-[390px] ${item.desktopHeight} overflow-hidden`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Tags overlay */}
        <div className="absolute bottom-4 left-4 flex gap-3 items-center">
          {item.tags.map((tag) => (
            <Tag key={tag} label={tag} light={item.lightTags} />
          ))}
        </div>
      </div>

      {/* Title + arrow */}
      <div className="flex items-center justify-between w-full">
        <p
          className="font-normal leading-[1.1] uppercase text-black tracking-[-0.04em] text-[24px] md:text-[36px] whitespace-nowrap"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {item.title}
        </p>
        <ArrowIcon />
      </div>
    </div>
  );
}

const leftWorks: WorkItem[] = [
  {
    title: "Surfers Paradise",
    image: "/images/work-1.png",
    tags: ["Social Media", "Photography"],
    lightTags: false,
    desktopHeight: "md:h-[744px]",
  },
  {
    title: "Cyberpunk Caffe",
    image: "/images/work-2.png",
    tags: ["Social Media", "Photography"],
    lightTags: true,
    desktopHeight: "md:h-[699px]",
  },
];

const rightWorks: WorkItem[] = [
  {
    title: "Agency 976",
    image: "/images/work-3.png",
    tags: ["Social Media", "Photography"],
    lightTags: true,
    desktopHeight: "md:h-[699px]",
  },
  {
    title: "Minimal Playground",
    image: "/images/work-4.png",
    tags: ["Social Media", "Photography"],
    lightTags: false,
    desktopHeight: "md:h-[744px]",
  },
];

function ContactCta() {
  return (
    <div className="flex gap-3 items-center w-full md:w-[465px]">
      {/* Left brackets */}
      <div className="flex flex-col justify-between self-stretch w-4 shrink-0">
        <CornerBracket rotation={0} />
        <CornerBracket rotation={270} />
      </div>

      {/* Text + button */}
      <div className="flex-1 flex flex-col gap-[10px] py-3">
        <p
          className="text-[14px] italic leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Discover how my creativity transforms ideas into impactful digital
          experiences — schedule a call with me to get started.
        </p>
        <button
          className="self-start bg-black text-white text-[14px] font-medium tracking-[-0.04em] uppercase px-4 py-3 rounded-full"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Let&apos;s talk
        </button>
      </div>

      {/* Right brackets */}
      <div className="flex flex-col justify-between self-stretch w-4 shrink-0">
        <CornerBracket rotation={90} />
        <CornerBracket rotation={180} />
      </div>
    </div>
  );
}

export default function SelectedWork() {
  return (
    <section className="px-4 py-12 md:px-8 md:py-20">
      {/* Header */}
      <div className="flex flex-col gap-3 mb-8 md:mb-[61px]">
        <div className="w-full h-px bg-[#1f1f1f]" />

        <div className="flex items-start justify-between w-full">
          {/* Heading + 004 */}
          <div className="flex gap-[10px] items-start">
            <div
              className="font-light leading-[0.86] tracking-[-0.08em] text-black uppercase text-[32px] md:text-[96px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <p>Selected</p>
              <p className="italic">Work</p>
            </div>
            <p
              className="text-[14px] leading-[1.1] text-[#1f1f1f] pt-1"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              004
            </p>
          </div>

          {/* [ portfolio ] — rotated on desktop, flat on mobile */}
          <p
            className="text-[14px] leading-[1.1] text-[#1f1f1f] uppercase md:hidden"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ portfolio ]
          </p>
          <div className="hidden md:flex h-[110px] w-[15px] items-center justify-center">
            <p
              className="-rotate-90 whitespace-nowrap text-[14px] leading-[1.1] text-[#1f1f1f] uppercase"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              [ portfolio ]
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: single column */}
      <div className="flex flex-col gap-6 md:hidden">
        {[...leftWorks, ...rightWorks].map((item) => (
          <WorkCard key={item.title} item={item} />
        ))}
        <ContactCta />
      </div>

      {/* Desktop: two-column staggered grid */}
      <div className="hidden md:flex gap-6 items-end">
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-6">
          {leftWorks.map((item) => (
            <WorkCard key={item.title} item={item} />
          ))}
          <ContactCta />
        </div>

        {/* Right column — offset top by 240px */}
        <div className="flex-1 flex flex-col gap-6 pt-[240px]">
          {rightWorks.map((item) => (
            <WorkCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
