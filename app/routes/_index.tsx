import type { MetaFunction } from "@remix-run/node";
import { Hero } from "~/components/home/Hero";
import { LatestIssue } from "~/components/home/LatestIssue";
import { FeaturedArticles } from "~/components/home/FeaturedArticles";
import { Newsletter } from "~/components/home/Newsletter";
import { QuickLinks } from "~/components/home/QuickLinks";
import {
  getCurrentIssue,
  getFeaturedArticles,
} from "~/lib/mock-data";

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

export default function Index() {
  const currentIssue = getCurrentIssue();
  const featuredArticles = getFeaturedArticles();

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
