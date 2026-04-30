import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "sanity";

interface Article {
  title: string;
  publishedAt: string;
  image: SanityImageSource;
  excerpt: string;
  body: PortableTextBlock[];
}

const ARTICLE_QUERY = `*[_type == "article" && slug.current == $slug][0] {
  title, publishedAt, image, excerpt, body
}`;

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await client.fetch(
    `*[_type == "article"]{ slug }`
  );
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export default async function ArticlePage(props: PageProps<"/news/[slug]">) {
  const { slug } = await props.params;
  const article: Article | null = await client.fetch(ARTICLE_QUERY, { slug });

  if (!article) notFound();

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main className="min-h-screen bg-white">
      <div className="px-4 py-8 md:px-8 md:py-12">
        <Link
          href="/#news"
          className="inline-flex items-center gap-2 text-[14px] tracking-[-0.04em] uppercase text-[#1f1f1f] mb-10 hover:opacity-60 transition-opacity"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          ← Back
        </Link>

        <div className="max-w-[800px]">
          {date && (
            <p
              className="text-[12px] tracking-[-0.04em] uppercase text-[#888] mb-3"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {date}
            </p>
          )}

          <h1
            className="font-light leading-[0.9] tracking-[-0.06em] text-black uppercase text-[40px] md:text-[72px] mb-8"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {article.title}
          </h1>

          <div className="relative w-full h-[260px] md:h-[500px] mb-8">
            <Image
              src={urlFor(article.image).width(1200).url()}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <p
            className="text-[16px] leading-[1.5] tracking-[-0.03em] text-[#1f1f1f] mb-8 italic"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {article.excerpt}
          </p>

          {article.body?.length > 0 && (
            <div
              className="prose prose-lg max-w-none text-[#1f1f1f] leading-[1.6] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <PortableText value={article.body} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
