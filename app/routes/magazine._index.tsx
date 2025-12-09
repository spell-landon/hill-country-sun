import type { MetaFunction } from "@remix-run/node";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { IssueCard } from "~/components/magazine/IssueCard";
import { mockIssues } from "~/lib/mock-data";

export const meta: MetaFunction = () => {
  return [
    { title: "Magazine Archive | Hill Country Sun" },
    {
      name: "description",
      content:
        "Browse all issues of the Hill Country Sun magazine. Featuring stories, events, and guides from Wimberley and the River Region.",
    },
  ];
};

export default function MagazineIndex() {
  // Sort issues by date, newest first
  const sortedIssues = [...mockIssues].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <Container size="wide">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif font-bold text-display-sm md:text-display-md text-white mb-4">
              Magazine Archive
            </h1>
            <p className="text-primary-200 text-body-lg">
              Explore past and present issues of the Hill Country Sun. Each
              edition captures the stories, events, and spirit of our community.
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {sortedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
