import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "sanity";

interface Project {
  title: string;
  image: SanityImageSource;
  tags: string[];
  body: PortableTextBlock[];
}

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  title, image, tags, body
}`;

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await client.fetch(
    `*[_type == "project"]{ slug }`
  );
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project: Project | null = await client.fetch(PROJECT_QUERY, { slug });

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-white">
      <div className="px-4 py-8 md:px-8 md:py-12">
        <Link
          href="/#selected-work"
          className="inline-flex items-center gap-2 text-[14px] tracking-[-0.04em] uppercase text-[#1f1f1f] mb-10 hover:opacity-60 transition-opacity"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          ← Back
        </Link>

        <div className="relative w-full h-[300px] md:h-[600px] mb-8">
          <Image
            src={urlFor(project.image).width(1400).url()}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-[800px]">
          {project.tags?.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] tracking-[-0.04em] uppercase text-[#1f1f1f] border border-[#1f1f1f] px-3 py-1 rounded-full"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1
            className="font-light leading-[0.9] tracking-[-0.06em] text-black uppercase text-[48px] md:text-[96px] mb-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {project.title}
          </h1>

          {project.body?.length > 0 && (
            <div
              className="prose prose-lg max-w-none text-[#1f1f1f] leading-[1.6] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <PortableText value={project.body} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
