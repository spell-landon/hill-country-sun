import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import {
  getPublicationBySlug,
  getCurrentIssue,
  getIssuesByPublication,
  getArticlesByPublication,
  urlFor,
} from "~/lib/sanity.server";
import { formatDate } from "~/lib/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;

  if (!slug) {
    throw new Response("Publication slug required", { status: 400 });
  }

  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    throw new Response("Publication not found", { status: 404 });
  }

  const [currentIssue, allIssues, articles] = await Promise.all([
    getCurrentIssue(slug),
    getIssuesByPublication(slug),
    getArticlesByPublication(slug),
  ]);

  // Transform publication
  const transformedPublication = {
    id: publication._id,
    name: publication.name,
    shortName: publication.shortName,
    slug: publication.slug.current,
    description: publication.description,
    heroImage: publication.heroImage ? urlFor(publication.heroImage).width(1600).url() : "",
    sections: publication.sections?.map((section) => ({
      title: section.title,
      content: section.content,
      image: section.image ? urlFor(section.image).width(800).url() : null,
    })) || [],
  };

  // Transform current issue
  const transformedIssue = currentIssue ? {
    id: currentIssue._id,
    title: currentIssue.title,
    slug: currentIssue.slug.current,
    coverImage: currentIssue.coverImage ? urlFor(currentIssue.coverImage).width(600).url() : "",
    publishedAt: currentIssue.publishedAt,
  } : null;

  return json({
    publication: transformedPublication,
    currentIssue: transformedIssue,
    issueCount: allIssues.length,
    articleCount: articles.length,
  });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.publication) {
    return [{ title: "Publication Not Found | Hill Country Sun" }];
  }

  return [
    { title: `${data.publication.name} | Hill Country Sun` },
    { name: "description", content: data.publication.description },
    { property: "og:title", content: data.publication.name },
    { property: "og:description", content: data.publication.description },
    { property: "og:image", content: data.publication.heroImage },
    { property: "og:type", content: "website" },
  ];
};

export default function PublicationPage() {
  const { publication, currentIssue, issueCount, articleCount } =
    useLoaderData<typeof loader>();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          {publication.heroImage && (
            <img
              src={publication.heroImage}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <Container size="wide" className="relative z-10 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="font-serif font-bold text-display-sm md:text-display-md lg:text-display-lg text-white mb-6">
              {publication.name}
            </h1>
            <p className="text-white/90 text-body-lg mb-8">
              {publication.description}
            </p>
            <Button
              to={`/articles?publication=${publication.slug}`}
              variant="secondary"
              size="lg"
            >
              Explore Stories
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Latest Issue Section */}
      {currentIssue && (
        <section className="py-16 md:py-24 bg-surface">
          <Container size="wide">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <span className="text-secondary font-semibold text-body-sm uppercase tracking-wider">
                  Latest Issue
                </span>
                <h2 className="font-serif font-bold text-display-sm md:text-heading-xl text-primary mt-2 mb-4">
                  {currentIssue.title}
                </h2>
                <div className="flex items-center gap-2 text-text-muted text-body-md mb-6">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={currentIssue.publishedAt}>
                    {formatDate(currentIssue.publishedAt)}
                  </time>
                </div>
                <p className="text-text-muted text-body-lg mb-8">
                  Read the latest edition of {publication.name} featuring stories,
                  events, and guides from the Hill Country community.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    to={`/publications/${publication.slug}/issues/${currentIssue.slug}`}
                    variant="primary"
                    size="md"
                  >
                    <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                    Read Online
                  </Button>
                  <Button
                    to={`/publications/${publication.slug}/issues`}
                    variant="outline"
                    size="md"
                  >
                    View All Issues ({issueCount})
                  </Button>
                </div>
              </div>
              <div>
                <Link
                  to={`/publications/${publication.slug}/issues/${currentIssue.slug}`}
                  className="block group"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                    {currentIssue.coverImage && (
                      <img
                        src={currentIssue.coverImage}
                        alt={`${currentIssue.title} cover`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Explore Stories CTA */}
      {articleCount > 0 && (
        <section className="py-12 md:py-16 bg-primary">
          <Container size="wide">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="font-serif font-bold text-heading-lg text-white mb-2">
                  Explore {publication.name} Stories
                </h2>
                <p className="text-primary-200 text-body-md">
                  Browse {articleCount} articles from {publication.name}.
                </p>
              </div>
              <Button
                to={`/articles?publication=${publication.slug}`}
                variant="secondary"
                size="lg"
              >
                View All Stories
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Content Sections */}
      {publication.sections && publication.sections.length > 0 && (
        <>
          {publication.sections.map((section, index) => (
            <section
              key={section.title}
              className={`py-16 md:py-24 ${index % 2 === 0 ? "" : "bg-surface"}`}
            >
              <Container size="wide">
                <div
                  className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <h2 className="font-serif font-bold text-display-sm text-primary mb-4 relative inline-block">
                      {section.title}
                      <span className="absolute -bottom-2 left-0 w-16 h-1 bg-secondary rounded-full" />
                    </h2>
                    <p className="text-body-lg text-text-muted mt-6 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                  {section.image && (
                    <div className={index % 2 === 1 ? "md:order-1" : ""}>
                      <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={section.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Container>
            </section>
          ))}
        </>
      )}

      {/* Bottom CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <Container size="narrow" className="text-center">
          <h2 className="font-serif font-bold text-display-sm text-white mb-4">
            Ready to Explore?
          </h2>
          <p className="text-primary-200 text-body-lg mb-8">
            Check out our calendar for upcoming events or browse our articles for
            more Hill Country stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/calendar" variant="secondary" size="lg">
              View Events
            </Button>
            <Button
              to={`/articles?publication=${publication.slug}`}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Read Articles
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
