import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { IssuuEmbed } from "~/components/magazine/IssuuEmbed";
import { IssueCard } from "~/components/magazine/IssueCard";
import {
  getPublicationBySlug,
  getIssueBySlug,
  getIssuesByPublication,
  urlFor,
} from "~/lib/sanity.server";
import { formatDate } from "~/lib/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug, issueSlug } = params;

  if (!slug || !issueSlug) {
    throw new Response("Publication and issue slugs required", { status: 400 });
  }

  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    throw new Response("Publication not found", { status: 404 });
  }

  const issue = await getIssueBySlug(issueSlug);

  if (!issue || issue.publication?.slug?.current !== slug) {
    throw new Response("Issue not found", { status: 404 });
  }

  // Get related issues (other issues from same publication, excluding current)
  const allIssues = await getIssuesByPublication(slug);
  const relatedIssues = allIssues
    .filter((i) => i._id !== issue._id)
    .slice(0, 3)
    .map((i) => ({
      id: i._id,
      title: i.title,
      slug: i.slug.current,
      coverImage: i.coverImage ? urlFor(i.coverImage).width(400).url() : "",
      publishedAt: i.publishedAt,
      isCurrent: i.isCurrent || false,
    }));

  // Transform data for component
  const transformedPublication = {
    name: publication.name,
    slug: publication.slug.current,
  };

  const transformedIssue = {
    id: issue._id,
    title: issue.title,
    slug: issue.slug.current,
    coverImage: issue.coverImage ? urlFor(issue.coverImage).width(600).url() : "",
    issuuEmbedUrl: issue.issuuEmbedUrl || "",
    publishedAt: issue.publishedAt,
    isCurrent: issue.isCurrent || false,
  };

  return json({ publication: transformedPublication, issue: transformedIssue, relatedIssues });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.issue || !data?.publication) {
    return [{ title: "Issue Not Found | Hill Country Sun" }];
  }

  return [
    { title: `${data.issue.title} | ${data.publication.name}` },
    {
      name: "description",
      content: `Read the ${data.issue.title} issue of ${data.publication.name}. Featuring stories and events from the Hill Country community.`,
    },
    {
      property: "og:title",
      content: `${data.issue.title} | ${data.publication.name}`,
    },
    { property: "og:image", content: data.issue.coverImage },
    { property: "og:type", content: "article" },
  ];
};

export default function PublicationIssueDetail() {
  const { publication, issue, relatedIssues } = useLoaderData<typeof loader>();

  return (
    <>
      {/* Header */}
      <section className="bg-surface py-8 border-b border-surface">
        <Container size="wide">
          <Link
            to={`/publications/${publication.slug}/issues`}
            className="inline-flex items-center text-text-muted hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            Back to {publication.name} Archive
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link
                  to={`/publications/${publication.slug}`}
                  className="text-secondary text-body-sm font-semibold hover:underline"
                >
                  {publication.name}
                </Link>
                {issue.isCurrent && (
                  <span className="bg-secondary text-primary text-body-sm font-semibold px-3 py-1 rounded-full">
                    Current Issue
                  </span>
                )}
                <div className="flex items-center gap-2 text-text-muted text-body-sm">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={issue.publishedAt}>
                    {formatDate(issue.publishedAt)}
                  </time>
                </div>
              </div>
              <h1 className="font-serif font-bold text-display-sm md:text-display-md text-primary">
                {issue.title}
              </h1>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `${issue.title} - ${publication.name}`,
                    url: window.location.href,
                  });
                }
              }}
            >
              <Share2 className="h-4 w-4 mr-2" aria-hidden="true" />
              Share
            </Button>
          </div>
        </Container>
      </section>

      {/* Magazine Embed */}
      <section className="py-8 md:py-12">
        <Container size="wide">
          <IssuuEmbed embedUrl={issue.issuuEmbedUrl} title={issue.title} />
        </Container>
      </section>

      {/* Related Issues */}
      {relatedIssues.length > 0 && (
        <section className="py-12 md:py-16 bg-surface">
          <Container size="wide">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif font-bold text-heading-lg text-primary">
                More Issues
              </h2>
              <Button
                to={`/publications/${publication.slug}/issues`}
                variant="ghost"
                size="sm"
              >
                View All
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {relatedIssues.map((relatedIssue) => (
                <IssueCard
                  key={relatedIssue.id}
                  issue={relatedIssue}
                  publicationSlug={publication.slug}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
