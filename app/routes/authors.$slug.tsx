import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { ArrowLeft, Mail } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { ArticleCard } from "~/components/articles/ArticleCard";
import {
  getAuthorBySlug,
  getArticlesByAuthor,
  urlFor,
} from "~/lib/sanity.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;

  if (!slug) {
    throw new Response("Author slug required", { status: 400 });
  }

  const author = await getAuthorBySlug(slug);

  if (!author) {
    throw new Response("Author not found", { status: 404 });
  }

  const articles = await getArticlesByAuthor(slug);

  // Transform author data
  const transformedAuthor = {
    name: author.name,
    slug: author.slug.current,
    image: author.image ? urlFor(author.image).width(300).url() : "",
    role: author.role || "Contributing Writer",
    bio: author.bio || "",
  };

  // Transform articles
  const transformedArticles = articles.map((article) => ({
    id: article._id,
    title: article.title,
    slug: article.slug.current,
    excerpt: article.excerpt || "",
    mainImage: article.mainImage ? urlFor(article.mainImage).width(800).url() : "",
    author: {
      name: article.author?.name || "Unknown",
      image: article.author?.image ? urlFor(article.author.image).width(100).url() : "",
    },
    category: article.category?.title || "Uncategorized",
    publishedAt: article.publishedAt,
    featured: article.featured || false,
    publication: article.publication?.slug?.current || "hill-country-sun",
  }));

  return json({ author: transformedAuthor, articles: transformedArticles });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.author) {
    return [{ title: "Author Not Found | Hill Country Sun" }];
  }

  return [
    { title: `${data.author.name} | Hill Country Sun` },
    {
      name: "description",
      content: `Read articles by ${data.author.name}, ${data.author.role} at Hill Country Sun.`,
    },
    { property: "og:title", content: data.author.name },
    { property: "og:description", content: data.author.bio },
    { property: "og:image", content: data.author.image },
    { property: "og:type", content: "profile" },
  ];
};

export default function AuthorPage() {
  const { author, articles } = useLoaderData<typeof loader>();

  return (
    <>
      {/* Header */}
      <section className="bg-surface py-8 border-b border-surface">
        <Container size="wide">
          <Link
            to="/authors"
            className="inline-flex items-center text-text-muted hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            All Writers
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
            {author.image && (
              <img
                src={author.image}
                alt=""
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <p className="text-body-sm text-secondary font-semibold mb-2">
                {author.role}
              </p>
              <h1 className="font-serif font-bold text-display-sm md:text-display-md text-primary mb-4">
                {author.name}
              </h1>
              {author.bio && (
                <p className="text-body-lg text-text-muted max-w-2xl mb-4">
                  {author.bio}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <Button
                  to={`/articles?author=${author.slug}`}
                  variant="outline"
                  size="sm"
                >
                  View All Articles ({articles.length})
                </Button>
                <Button
                  href={`mailto:contact@hillcountrysun.com?subject=Message for ${author.name}`}
                  variant="ghost"
                  size="sm"
                >
                  <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Articles */}
      <section className="py-12 md:py-16">
        <Container size="wide">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif font-bold text-heading-lg text-primary">
              Articles by {author.name}
            </h2>
            <span className="text-body-sm text-text-muted">
              {articles.length} {articles.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted text-body-lg">
                No articles found by this author.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
