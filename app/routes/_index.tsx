import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Hero } from "~/components/home/Hero";
import { LatestIssue } from "~/components/home/LatestIssue";
import { FeaturedArticles } from "~/components/home/FeaturedArticles";
import { Newsletter } from "~/components/home/Newsletter";
import { QuickLinks } from "~/components/home/QuickLinks";
import {
  getCurrentIssue,
  getFeaturedArticles,
  urlFor,
} from "~/lib/sanity.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Hill Country Sun | Wimberley & River Region News" },
    {
      name: "description",
      content:
        "Your source for local news, events, and stories from Wimberley and the Texas Hill Country region. Covering the River Region since 1990.",
    },
    {
      property: "og:title",
      content: "Hill Country Sun | Wimberley & River Region News",
    },
    {
      property: "og:description",
      content:
        "Your source for local news, events, and stories from Wimberley and the Texas Hill Country region.",
    },
    { property: "og:type", content: "website" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const [currentIssue, featuredArticles] = await Promise.all([
    getCurrentIssue(),
    getFeaturedArticles(),
  ]);

  // Transform Sanity data to match component expectations
  const transformedIssue = currentIssue
    ? {
        id: currentIssue._id,
        title: currentIssue.title,
        slug: currentIssue.slug.current,
        coverImage: currentIssue.coverImage
          ? urlFor(currentIssue.coverImage).width(800).url()
          : "",
        issuuEmbedUrl: currentIssue.issuuEmbedUrl,
        publishedAt: currentIssue.publishedAt,
        isCurrent: currentIssue.isCurrent,
        publication: currentIssue.publication?.slug.current || "hill-country-sun",
      }
    : null;

  const transformedArticles = featuredArticles.map((article) => ({
    id: article._id,
    title: article.title,
    slug: article.slug.current,
    excerpt: article.excerpt,
    mainImage: article.mainImage
      ? urlFor(article.mainImage).width(800).url()
      : "",
    author: {
      name: article.author?.name || "Unknown",
      image: article.author?.image
        ? urlFor(article.author.image).width(100).url()
        : "",
    },
    category: article.category?.title || "Uncategorized",
    publishedAt: article.publishedAt,
    featured: article.featured,
    publication: article.publication
      ? { name: article.publication.name, slug: article.publication.slug.current }
      : null,
  }));

  return json({
    currentIssue: transformedIssue,
    featuredArticles: transformedArticles,
  });
}

export default function Index() {
  const { currentIssue, featuredArticles } = useLoaderData<typeof loader>();

  return (
    <>
      <Hero currentIssueSlug={currentIssue?.slug} />
      {currentIssue && <LatestIssue issue={currentIssue} />}
      <FeaturedArticles articles={featuredArticles} />
      <QuickLinks />
      <Newsletter />
    </>
  );
}
