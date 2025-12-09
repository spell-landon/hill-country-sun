import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Container } from "~/components/ui/Container";
import { getUniqueAuthors, getArticlesByAuthor } from "~/lib/mock-data";

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
  const authors = getUniqueAuthors();

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {authors.map((author) => {
              const articleCount = getArticlesByAuthor(author.name).length;

              return (
                <Link
                  key={author.slug}
                  to={`/authors/${author.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-xl shadow-sm border border-surface overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6 flex items-start gap-4">
                      <img
                        src={author.image}
                        alt=""
                        className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h2 className="font-serif font-bold text-heading-sm text-primary mb-1 group-hover:text-primary-600 transition-colors">
                          {author.name}
                        </h2>
                        <p className="text-body-sm text-secondary font-medium mb-2">
                          {author.role}
                        </p>
                        <p className="text-body-sm text-text-muted line-clamp-2">
                          {author.bio}
                        </p>
                        <p className="text-body-sm text-text-light mt-2">
                          {articleCount} {articleCount === 1 ? "article" : "articles"}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
