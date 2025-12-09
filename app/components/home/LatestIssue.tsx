import { Link } from "@remix-run/react";
import { BookOpen, ArrowRight } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { Button } from "~/components/ui/Button";
import type { MagazineIssue } from "~/lib/mock-data";
import { formatDate } from "~/lib/utils";

interface LatestIssueProps {
  issue: MagazineIssue;
}

export function LatestIssue({ issue }: LatestIssueProps) {
  return (
    <section className="py-16 md:py-24 bg-surface">
      <Container size="wide">
        <SectionHeading
          title="Latest Issue"
          subtitle="Browse our newest publication featuring the best of Hill Country living."
        />

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Magazine Cover */}
          <Link
            to={`/publications/hill-country-sun/issues/${issue.slug}`}
            className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="aspect-[3/4] relative">
              <img
                src={issue.coverImage}
                alt={`${issue.title} magazine cover`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-secondary text-primary px-3 py-1 rounded-full text-body-sm font-semibold">
                Current Issue
              </div>
            </div>
          </Link>

          {/* Issue Details */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 text-text-muted mb-4">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              <span className="text-body-sm font-medium">
                Published {formatDate(issue.publishedAt)}
              </span>
            </div>

            <h3 className="font-serif font-bold text-display-sm text-primary mb-4">
              {issue.title}
            </h3>

            <p className="text-body-lg text-text-muted mb-6">
              Dive into the latest stories from Wimberley and the River Region.
              This issue features local events, community spotlights, seasonal guides,
              and everything you need to make the most of life in the Hill Country.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Community spotlights & local heroes",
                "Seasonal events calendar",
                "Business directory & guides",
                "Arts, culture & lifestyle features",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-body-md">
                  <span className="text-secondary mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button to={`/publications/hill-country-sun/issues/${issue.slug}`} variant="primary" size="lg">
                Read Now
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
              <Button to="/publications/hill-country-sun/issues" variant="outline" size="lg">
                View All Issues
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
