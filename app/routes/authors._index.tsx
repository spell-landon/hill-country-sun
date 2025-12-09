import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Container } from "~/components/ui/Container";
import {
  getAuthors,
  getArticlesByAuthor,
  urlFor,
} from "~/lib/sanity.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const authors = await getAuthors();

  // Get article counts for each author
  const authorsWithCounts = await Promise.all(
    authors.map(async (author) => {
      const articles = await getArticlesByAuthor(author.slug.current);
      return {
        name: author.name,
        slug: author.slug.current,
        image: author.image ? urlFor(author.image).width(200).url() : "",
        role: author.role || "Contributing Writer",
        bio: author.bio || "",
        articleCount: articles.length,
      };
    })
  );

  return json({ authors: authorsWithCounts });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Our Writers | Hill Country Sun" },
    {
      name: "description",
      content:
        "Meet the talented writers and contributors who bring you stories from the Texas Hill Country.",
    },
  ];
};

export default function AuthorsIndex() {
  const { authors } = useLoaderData<typeof loader>();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <Container size="wide">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif font-bold text-display-sm md:text-display-md text-white mb-4">
              Our Writers
            </h1>
            <p className="text-primary-200 text-body-lg">
              Meet the talented writers and contributors who bring you stories
              from across the Hill Country.
            </p>
          </div>
        </Container>
      </section>

      {/* Authors Grid */}
      <section className="py-12 md:py-16">
        <Container size="wide">
          {authors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted text-body-lg">
                No authors found. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {authors.map((author) => (
                <Link
                  key={author.slug}
                  to={`/authors/${author.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-xl shadow-sm border border-surface overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6 flex items-start gap-4">
                      {author.image && (
                        <img
                          src={author.image}
                          alt=""
                          className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h2 className="font-serif font-bold text-heading-sm text-primary mb-1 group-hover:text-primary-600 transition-colors">
                          {author.name}
                        </h2>
                        <p className="text-body-sm text-secondary font-medium mb-2">
                          {author.role}
                        </p>
                        {author.bio && (
                          <p className="text-body-sm text-text-muted line-clamp-2">
                            {author.bio}
                          </p>
                        )}
                        <p className="text-body-sm text-text-light mt-2">
                          {author.articleCount} {author.articleCount === 1 ? "article" : "articles"}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
