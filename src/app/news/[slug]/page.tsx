import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "sanity";
import NewsSlider from "@/app/components/NewsSlider";
import type { ArticleCard } from "@/app/components/NewsSlider";

interface Article {
  title: string;
  publishedAt: string;
  image: SanityImageSource;
  excerpt: string;
  body: PortableTextBlock[];
}

interface RelatedArticle {
  _id: string;
  title: string;
  slug: { current: string };
  image: SanityImageSource;
  excerpt: string;
  offsetDesktop: boolean;
}

const ARTICLE_QUERY = `*[_type == "article" && slug.current == $slug][0] {
  title, publishedAt, image, excerpt, body
}`;

const RELATED_QUERY = `*[_type == "article" && slug.current != $slug && defined(image)] | order(publishedAt desc) [0...8] {
  _id, title, slug, image, excerpt, offsetDesktop
}`;

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await client.fetch(
    `*[_type == "article"]{ slug }`
  );
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export default async function ArticlePage(props: PageProps<"/news/[slug]">) {
  const { slug } = await props.params;
  const [article, relatedRaw]: [Article | null, RelatedArticle[]] = await Promise.all([
    client.fetch(ARTICLE_QUERY, { slug }),
    client.fetch(RELATED_QUERY, { slug }),
  ]);

  if (!article) notFound();

  const related: ArticleCard[] = relatedRaw.map((a) => ({
    _id: a._id,
    title: a.title,
    slug: a.slug.current,
    imageUrl: urlFor(a.image).width(700).url(),
    excerpt: a.excerpt ?? "",
    offsetDesktop: a.offsetDesktop ?? false,
  }));

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main className="min-h-screen bg-white">
      <div style={{ padding: "164px 32px 72px" }}>
      {/* Back button — 100px below navbar */}
      <Link
        href="/#news"
        className="inline-flex items-center hover:opacity-60 transition-opacity"
        style={{
          gap: "10px",
          fontFamily: "var(--font-inter)",
          fontSize: "14px",
          fontWeight: 500,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          color: "#000",
          textDecoration: "none",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "rotate(90deg)", flexShrink: 0 }}
        >
          <path
            d="M9 3.75V14.25M9 14.25L13.5 9.75M9 14.25L4.5 9.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        BACK
      </Link>

      {/* Hero — 64px gap below back button, max-width 847px */}
      <div
        style={{
          marginTop: "64px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "847px",
        }}
      >
        {date && (
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              opacity: 0.4,
              color: "#000",
              margin: 0,
            }}
          >
            {date}
          </p>
        )}

        <h1
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "80px",
            fontWeight: 300,
            lineHeight: 0.84,
            letterSpacing: "-0.08em",
            textTransform: "uppercase",
            color: "#000",
            margin: 0,
          }}
        >
          {article.title}
        </h1>

        {article.image && (
          <div style={{ position: "relative", width: "100%", height: "469px" }}>
            <Image
              src={urlFor(article.image).width(1200).url()}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>

      {/* Article body — right-aligned, 660px wide (matches Figma) */}

      {(article.excerpt || (article.body && article.body.length > 0)) && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: "72px",
          }}
        >
          <div style={{ width: "min(660px, 100%)" }}>
            {article.excerpt && (
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "-0.04em",
                  color: "#000",
                  lineHeight: "normal",
                  marginBottom: "1em",
                }}
              >
                {article.excerpt}
              </p>
            )}

            {article.body && article.body.length > 0 && (
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "-0.04em",
                  color: "#000",
                  lineHeight: "normal",
                }}
              >
                <PortableText value={article.body} />
              </div>
            )}
          </div>
        </div>
      )}

      </div>

      {/* Read more slider — outside padded section so Swiper gets full width */}
      {related.length > 0 && (
        <div style={{ marginTop: "100px" }}>
          <NewsSlider articles={related} label="[ Read more ]" />
        </div>
      )}
    </main>
  );
}
