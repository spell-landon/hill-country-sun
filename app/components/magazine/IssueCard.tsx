import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { MagazineIssue } from "~/lib/mock-data";
import { formatDate } from "~/lib/utils";

interface IssueCardProps {
  issue: MagazineIssue;
  publicationSlug?: string;
}

export function IssueCard({ issue, publicationSlug }: IssueCardProps) {
  // Use the provided publicationSlug or fall back to the issue's publicationSlug
  const pubSlug = publicationSlug || issue.publicationSlug;
  const issueUrl = `/publications/${pubSlug}/issues/${issue.slug}`;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link
        to={issueUrl}
        className="block"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-shadow">
          <img
            src={issue.coverImage}
            alt={`${issue.title} magazine cover`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {issue.isCurrent && (
            <div className="absolute top-3 left-3 bg-secondary text-primary px-3 py-1 rounded-full text-body-sm font-semibold shadow-sm">
              Current Issue
            </div>
          )}
        </div>
        <div className="mt-4">
          <h3 className="font-serif font-bold text-heading-sm text-primary group-hover:text-primary-600 transition-colors">
            {issue.title}
          </h3>
          <div className="flex items-center gap-2 text-text-muted text-body-sm mt-2">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <time dateTime={issue.publishedAt}>
              {formatDate(issue.publishedAt)}
            </time>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
