import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { ArticleCard } from "~/components/articles/ArticleCard";
import {
  getArticleBySlug,
  getArticlesByCategory,
  getPublicationBySlug,
  urlFor,
} from "~/lib/sanity.server";
import { formatDate } from "~/lib/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;
  const article = await getArticleBySlug(slug || "");

  if (!article) {
    throw new Response("Article not found", { status: 404 });
  }

  // Get related articles (same category, excluding current)
  const categorySlug = article.category?.slug?.current;
  let relatedArticles: any[] = [];

  if (categorySlug) {
    const categoryArticles = await getArticlesByCategory(categorySlug);
    relatedArticles = categoryArticles
      .filter((a) => a._id !== article._id)
      .slice(0, 3)
      .map((a) => ({
        id: a._id,
        title: a.title,
        slug: a.slug.current,
        excerpt: a.excerpt || "",
        mainImage: a.mainImage ? urlFor(a.mainImage).width(800).url() : "",
        author: {
          name: a.author?.name || "Unknown",
          image: a.author?.image ? urlFor(a.author.image).width(100).url() : "",
        },
        category: a.category?.title || "Uncategorized",
        publishedAt: a.publishedAt,
        featured: a.featured || false,
        publication: a.publication?.slug?.current || "hill-country-sun",
      }));
  }

  // Get publication details
  const publication = article.publication?.slug?.current
    ? await getPublicationBySlug(article.publication.slug.current)
    : null;

  // Transform article for component
  const transformedArticle = {
    id: article._id,
    title: article.title,
    slug: article.slug.current,
    excerpt: article.excerpt || "",
    body: article.body,
    mainImage: article.mainImage ? urlFor(article.mainImage).width(1200).url() : "",
    author: {
      name: article.author?.name || "Unknown",
      slug: article.author?.slug?.current || "",
      image: article.author?.image ? urlFor(article.author.image).width(200).url() : "",
    },
    category: article.category?.title || "Uncategorized",
    publishedAt: article.publishedAt,
    publication: publication ? {
      name: publication.name,
      slug: publication.slug.current,
    } : null,
  };

  return json({ article: transformedArticle, relatedArticles });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.article) {
    return [{ title: "Article Not Found | Hill Country Sun" }];
  }

  return [
    { title: `${data.article.title} | Hill Country Sun` },
    { name: "description", content: data.article.excerpt },
    { property: "og:title", content: data.article.title },
    { property: "og:description", content: data.article.excerpt },
    { property: "og:image", content: data.article.mainImage },
    { property: "og:type", content: "article" },
    { property: "article:published_time", content: data.article.publishedAt },
    { property: "article:author", content: data.article.author.name },
    { property: "article:section", content: data.article.category },
  ];
};

// Portable Text components for rendering
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-serif font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-serif font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-serif font-bold mt-6 mb-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-serif font-bold mt-6 mb-3">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-secondary pl-4 my-6 italic text-text-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:text-primary-600"
      >
        {children}
      </a>
    ),
  },
};

export default function ArticlePage() {
  const { article, relatedArticles } = useLoaderData<typeof loader>();

  return (
    <article>
      {/* Header */}
      <section className="bg-surface py-8 border-b border-surface">
        <Container size="narrow">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/articles"
              className="inline-flex items-center text-text-muted hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              Back to Articles
            </Link>

            <div className="flex items-center gap-2">
              {article.publication && (
                <Link
                  to={`/publications/${article.publication.slug}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-body-sm font-semibold bg-primary/90 text-white hover:bg-primary transition-colors"
                >
                  {article.publication.name}
                </Link>
              )}
              <Link
                to={`/articles?category=${encodeURIComponent(article.category)}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-body-sm font-semibold bg-secondary/20 text-primary hover:bg-secondary/30 transition-colors"
              >
                {article.category}
              </Link>
            </div>
          </div>

          <h1 className="font-serif font-bold text-display-sm md:text-display-md text-primary mb-6 text-balance">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-body-sm text-text-muted">
            <Link
              to={`/authors/${article.author.slug}`}
              className="flex items-center gap-3 hover:text-primary transition-colors"
            >
              {article.author.image && (
                <img
                  src={article.author.image}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <span className="block text-text font-medium">
                  {article.author.name}
                </span>
                <time dateTime={article.publishedAt} className="text-text-light">
                  {formatDate(article.publishedAt)}
                </time>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Image */}
      {article.mainImage && (
        <section className="py-8">
          <Container size="default">
            <div className="aspect-video md:aspect-[21/9] overflow-hidden rounded-xl">
              <img
                src={article.mainImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </Container>
        </section>
      )}

      {/* Article Content */}
      <section className="py-8">
        <Container size="narrow">
          {/* Lead paragraph */}
          {article.excerpt && (
            <p className="text-body-lg text-text leading-relaxed mb-8 font-medium">
              {article.excerpt}
            </p>
          )}

          {/* Main content - Portable Text */}
          {article.body && (
            <div className="prose-content">
              <PortableText value={article.body} components={portableTextComponents} />
            </div>
          )}

          {/* Share buttons */}
          <div className="border-t border-surface mt-12 pt-8">
            <p className="text-body-sm text-text-muted mb-4 font-medium">
              Share this article
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.share) {
                    navigator.share({
                      title: article.title,
                      text: article.excerpt,
                      url: window.location.href,
                    });
                  }
                }}
              >
                <Share2 className="h-4 w-4 mr-2" aria-hidden="true" />
                Share
              </Button>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  article.title
                )}&url=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Author Bio */}
      <section className="py-8 bg-surface">
        <Container size="narrow">
          <Link
            to={`/authors/${article.author.slug}`}
            className="flex items-start gap-4 group"
          >
            {article.author.image && (
              <img
                src={article.author.image}
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-body-sm text-text-muted mb-1">Written by</p>
              <h3 className="font-serif font-bold text-heading-sm text-primary mb-2 group-hover:text-primary-600 transition-colors">
                {article.author.name}
              </h3>
              <p className="text-body-sm text-text-muted">
                Contributing writer for Hill Country Sun, covering local news,
                events, and community stories from the Wimberley area.
              </p>
              <span className="text-body-sm text-primary font-medium mt-2 inline-block group-hover:underline">
                View all articles →
              </span>
            </div>
          </Link>
        </Container>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 md:py-16">
          <Container size="wide">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif font-bold text-heading-lg text-primary">
                Related Articles
              </h2>
              <Button to="/articles" variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
