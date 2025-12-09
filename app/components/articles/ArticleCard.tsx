import { Link } from "@remix-run/react";
import { Calendar, User } from "lucide-react";
import {
  Card,
  CardImage,
  CardContent,
  CardTitle,
  CardDescription,
  CardMeta,
} from "~/components/ui/Card";
import { formatDate } from "~/lib/utils";

interface ArticleCardArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage: string;
  author: {
    name: string;
    image?: string;
  };
  category: string;
  publishedAt: string;
  publication?: string | {
    name: string;
    slug: string;
  };
}

interface ArticleCardProps {
  article: ArticleCardArticle;
  variant?: "default" | "horizontal";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const authorSlug = slugify(article.author.name);

  // Handle publication - can be string slug or object with name/slug
  const publication = typeof article.publication === 'object'
    ? article.publication
    : article.publication
      ? { name: article.publication, slug: article.publication }
      : null;

  if (variant === "horizontal") {
    return (
      <article className="group">
        <Link
          to={`/articles/${article.slug}`}
          className="flex flex-col sm:flex-row gap-4 md:gap-6"
        >
          <div className="sm:w-48 md:w-64 flex-shrink-0">
            <div className="aspect-video sm:aspect-[4/3] overflow-hidden rounded-lg relative">
              <img
                src={article.mainImage}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              {publication && (
                <Link
                  to={`/publications/${publication.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-2 left-2 bg-primary/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded hover:bg-primary transition-colors"
                >
                  {publication.name}
                </Link>
              )}
            </div>
          </div>
          <div className="flex-1 py-1">
            <Link
              to={`/articles?category=${encodeURIComponent(article.category)}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-block text-body-sm text-secondary font-medium mb-2 hover:text-secondary-600 transition-colors"
            >
              {article.category}
            </Link>
            <h3 className="font-serif font-bold text-heading-sm text-primary mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-body-sm text-text-muted line-clamp-2 mb-3">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 text-body-sm text-text-light">
              <Link
                to={`/authors/${authorSlug}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <User className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{article.author.name}</span>
              </Link>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <Card as="article">
      <Link to={`/articles/${article.slug}`} className="block group">
        <div className="relative">
          <CardImage src={article.mainImage} alt="" aspectRatio="video" />
          {publication && (
            <Link
              to={`/publications/${publication.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-3 left-3 bg-primary/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded hover:bg-primary transition-colors"
            >
              {publication.name}
            </Link>
          )}
        </div>
        <CardContent>
          <Link
            to={`/articles?category=${encodeURIComponent(article.category)}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-block text-body-sm text-secondary font-medium mb-2 hover:text-secondary-600 transition-colors"
          >
            {article.category}
          </Link>
          <CardTitle>{article.title}</CardTitle>
          <CardDescription>{article.excerpt}</CardDescription>
          <CardMeta>
            <Link
              to={`/authors/${authorSlug}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <User className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{article.author.name}</span>
            </Link>
            <span className="text-text-light">•</span>
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          </CardMeta>
        </CardContent>
      </Link>
    </Card>
  );
}
