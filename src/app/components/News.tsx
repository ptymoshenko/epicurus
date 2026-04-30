import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";
import NewsSlider from "./NewsSlider";

interface SanityArticle {
  _id: string;
  title: string;
  slug: { current: string };
  image: SanityImageSource;
  excerpt: string;
  offsetDesktop: boolean;
}

const ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  _id, title, slug, image, excerpt, offsetDesktop
}`;

export default async function News() {
  const { data: articles } = await sanityFetch({ query: ARTICLES_QUERY }) as { data: SanityArticle[] };

  const mapped = articles.map((a) => ({
    _id: a._id,
    title: a.title,
    slug: a.slug.current,
    imageUrl: urlFor(a.image).width(700).url(),
    excerpt: a.excerpt,
    offsetDesktop: a.offsetDesktop ?? false,
  }));

  return (
    <section className="bg-[#f3f3f3]">
      <NewsSlider articles={mapped} />
    </section>
  );
}
