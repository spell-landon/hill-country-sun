import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { ArrowLeft } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { IssueCard } from "~/components/magazine/IssueCard";
import {
  getPublicationBySlug,
  getIssuesByPublication,
  urlFor,
} from "~/lib/sanity.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;

  if (!slug) {
    throw new Response("Publication slug required", { status: 400 });
  }

  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    throw new Response("Publication not found", { status: 404 });
  }

  const issues = await getIssuesByPublication(slug);

  // Transform data
  const transformedPublication = {
    name: publication.name,
    slug: publication.slug.current,
  };

  const transformedIssues = issues.map((issue) => ({
    id: issue._id,
    title: issue.title,
    slug: issue.slug.current,
    coverImage: issue.coverImage ? urlFor(issue.coverImage).width(400).url() : "",
    publishedAt: issue.publishedAt,
    isCurrent: issue.isCurrent || false,
  }));

  return json({ publication: transformedPublication, issues: transformedIssues });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.publication) {
    return [{ title: "Issues Not Found | Hill Country Sun" }];
  }

  return [
    { title: `${data.publication.name} Archive | Hill Country Sun` },
    {
      name: "description",
      content: `Browse all issues of ${data.publication.name}. Featuring stories, events, and guides from the Hill Country community.`,
    },
  ];
};

export default function PublicationIssues() {
  const { publication, issues } = useLoaderData<typeof loader>();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <Container size="wide">
          <Link
            to={`/publications/${publication.slug}`}
            className="inline-flex items-center text-primary-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            Back to {publication.name}
          </Link>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif font-bold text-display-sm md:text-display-md text-white mb-4">
              {publication.name} Archive
            </h1>
            <p className="text-primary-200 text-body-lg">
              Explore past and present issues of {publication.name}. Each edition
              captures the stories, events, and spirit of our community.
            </p>
          </div>
        </Container>
      </section>

      {/* Issues Grid */}
      <section className="py-16 md:py-24">
        <Container size="wide">
          <SectionHeading
            title="All Issues"
            subtitle="Click on any issue to read the full digital edition."
          />

          {issues.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {issues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  publicationSlug={publication.slug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-muted text-body-lg">
                No issues available yet. Check back soon!
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
