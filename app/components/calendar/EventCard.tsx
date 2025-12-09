import { Link } from "@remix-run/react";
import { MapPin, ExternalLink } from "lucide-react";
import type { Event } from "~/lib/mock-data";
import { formatDateRange } from "~/lib/utils";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const dateStr = formatDateRange(event.date, event.endDate);
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleDateString("en-US", { month: "short" });

  return (
    <article className="group flex gap-4 p-4 rounded-xl bg-white border border-surface hover:shadow-md transition-shadow">
      {/* Date Badge */}
      <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-lg flex flex-col items-center justify-center text-white">
        <span className="text-body-sm font-medium uppercase">{month}</span>
        <span className="text-heading-md font-bold leading-none">{day}</span>
      </div>

      {/* Event Details */}
      <div className="flex-1 min-w-0">
        <span className="inline-block text-body-sm text-secondary font-medium mb-1">
          {event.category}
        </span>
        <h3 className="font-serif font-bold text-heading-sm text-primary group-hover:text-primary-600 transition-colors truncate">
          {event.title}
        </h3>
        <p className="text-body-sm text-text-muted mt-1 line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center gap-4 mt-2 text-body-sm text-text-light">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="truncate">{event.location}</span>
          </div>
          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:text-primary-600 transition-colors"
            >
              <span>Details</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      {/* Event Image (optional) */}
      {event.image && (
        <div className="hidden sm:block flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
          <img
            src={event.image}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
    </article>
  );
}
