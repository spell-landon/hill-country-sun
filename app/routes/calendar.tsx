import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { EventCard } from "~/components/calendar/EventCard";
import { getEvents } from "~/lib/sanity.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const events = await getEvents();

  // Transform events for component
  const transformedEvents = events.map((event) => ({
    id: event._id,
    title: event.title,
    date: event.date,
    endDate: event.endDate,
    location: event.location,
    description: event.description,
    category: event.category || "Community",
    link: event.link,
    featured: event.featured || false,
  }));

  // Get unique categories
  const categories = ["All", ...new Set(transformedEvents.map((e) => e.category))];

  return json({ events: transformedEvents, categories });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Events Calendar | Hill Country Sun" },
    {
      name: "description",
      content:
        "Find upcoming events in Wimberley and the Texas Hill Country. From market days to live music, discover what's happening in our community.",
    },
  ];
};

export default function Calendar() {
  const { events, categories } = useLoaderData<typeof loader>();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sort events by date
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Filter by category
  const filteredEvents =
    selectedCategory === "All"
      ? sortedEvents
      : sortedEvents.filter((e) => e.category === selectedCategory);

  // Group events by month
  const eventsByMonth = filteredEvents.reduce(
    (acc, event) => {
      const monthYear = new Date(event.date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(event);
      return acc;
    },
    {} as Record<string, typeof filteredEvents>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <Container size="wide">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif font-bold text-display-sm md:text-display-md text-white mb-4">
              Events Calendar
            </h1>
            <p className="text-primary-200 text-body-lg mb-8">
              Discover what's happening in Wimberley and the surrounding Hill
              Country. From markets and festivals to live music and community
              gatherings.
            </p>
            <Button
              to="/contact"
              variant="secondary"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
              Submit an Event
            </Button>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="border-b border-surface sticky top-16 md:top-20 bg-white z-20">
        <Container size="wide">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-body-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-surface text-text-muted hover:bg-surface hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Events List */}
      <section className="py-12 md:py-16">
        <Container size="default">
          {Object.keys(eventsByMonth).length === 0 ? (
            <div className="text-center py-12">
              <CalendarDays className="h-16 w-16 text-text-light mx-auto mb-4" />
              <p className="text-text-muted text-body-lg">
                No upcoming events in this category.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(eventsByMonth).map(([monthYear, monthEvents]) => (
                <div key={monthYear}>
                  <h2 className="font-serif font-bold text-heading-md text-primary mb-6 pb-2 border-b border-surface">
                    {monthYear}
                  </h2>
                  <div className="space-y-4">
                    {monthEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-surface">
        <Container size="narrow" className="text-center">
          <h2 className="font-serif font-bold text-heading-lg text-primary mb-4">
            Have an Event to Share?
          </h2>
          <p className="text-text-muted text-body-lg mb-6">
            Submit your community event to be featured in our calendar and reach
            thousands of Hill Country residents and visitors.
          </p>
          <Button to="/contact" variant="primary" size="lg">
            Submit Your Event
          </Button>
        </Container>
      </section>
    </>
  );
}
