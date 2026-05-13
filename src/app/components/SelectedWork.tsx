import Image from "next/image";
import HeadingReveal from "@/components/HeadingReveal";
import ImageReveal from "@/components/ImageReveal";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  image: SanityImageSource;
  tags: string[];
  lightTags: boolean;
  tall: boolean;
}

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) {
  _id, title, slug, image, tags, lightTags, tall
}`;

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

function WorkCard({ project }: { project: SanityProject }) {
  const heightClass = project.tall ? "md:h-[744px]" : "md:h-[699px]";
  return (
    <Link href={`/projects/${project.slug.current}`} className="flex flex-col gap-[10px] w-full group">
      <ImageReveal className={`w-full h-[390px] ${heightClass}`}>
        <Image
          src={urlFor(project.image).width(800).url()}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute bottom-4 left-4 flex gap-3 items-center">
          {project.tags?.map((tag) => (
            <Tag key={tag} label={tag} light={project.lightTags} />
          ))}
        </div>
      </ImageReveal>
      <div className="flex items-center justify-between w-full">
        <p
          className="font-normal leading-[1.1] uppercase text-black tracking-[-0.04em] text-[24px] md:text-[36px] whitespace-nowrap"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {project.title}
        </p>
        <ArrowIcon />
      </div>
    </Link>
  );
}

function ContactCta() {
  return (
    <div className="flex gap-3 items-center w-full md:w-[465px]">
      <div className="flex flex-col justify-between self-stretch w-4 shrink-0">
        <CornerBracket rotation={0} />
        <CornerBracket rotation={270} />
      </div>
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
      <div className="flex flex-col justify-between self-stretch w-4 shrink-0">
        <CornerBracket rotation={90} />
        <CornerBracket rotation={180} />
      </div>
    </div>
  );
}

export default async function SelectedWork() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY }) as { data: SanityProject[] };

  const mid = Math.ceil(projects.length / 2);
  const leftProjects = projects.slice(0, mid);
  const rightProjects = projects.slice(mid);

  return (
    <section className="px-4 py-12 md:px-8 md:py-20">
      <div className="flex flex-col gap-3 mb-8 md:mb-[61px]">
        <div className="w-full h-px bg-[#1f1f1f]" />
        <div className="flex items-start justify-between w-full">
          <div className="flex gap-[10px] items-start">
            <div
              className="font-light leading-[0.86] tracking-[-0.08em] text-black uppercase text-[32px] md:text-[96px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <HeadingReveal theme="#07261E">Selected</HeadingReveal>
              <HeadingReveal theme="#07261E" className="italic">Work</HeadingReveal>
            </div>
            <p
              className="text-[14px] leading-[1.1] text-[#1f1f1f] pt-1"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              004
            </p>
          </div>
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
        {projects.map((project) => (
          <WorkCard key={project._id} project={project} />
        ))}
        <ContactCta />
      </div>

      {/* Desktop: two-column staggered grid */}
      <div className="hidden md:flex gap-6 items-end">
        <div className="flex-1 flex flex-col gap-6">
          {leftProjects.map((project) => (
            <WorkCard key={project._id} project={project} />
          ))}
          <ContactCta />
        </div>
        <div className="flex-1 flex flex-col gap-6 pt-[240px]">
          {rightProjects.map((project) => (
            <WorkCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
