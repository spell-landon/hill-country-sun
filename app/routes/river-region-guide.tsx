import type { MetaFunction } from "@remix-run/node";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { getGuideBySlug } from "~/lib/mock-data";
import { ArrowRight, Droplets } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "River Region Guide | Hill Country Sun" },
    {
      name: "description",
      content:
        "Explore the best swimming holes, water activities, and riverside adventures in the Texas Hill Country River Region.",
    },
  ];
};

export default function RiverRegionGuide() {
  const guide = getGuideBySlug("river-region-guide");

  if (!guide) {
    return <div>Guide not found</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={guide.heroImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <Container size="wide" className="relative z-10 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-6">
              <Droplets className="h-5 w-5" aria-hidden="true" />
              <span className="text-body-sm font-semibold">Water Adventures</span>
            </div>
            <h1 className="font-serif font-bold text-display-sm md:text-display-md lg:text-display-lg text-white mb-6">
              {guide.title}
            </h1>
            <p className="text-white/90 text-body-lg mb-8">{guide.intro}</p>
            <Button to="/articles" variant="secondary" size="lg">
              River Stories
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Guide Sections */}
      {guide.sections.map((section, index) => (
        <section
          key={section.title}
          className={`py-16 md:py-24 ${index % 2 === 1 ? "bg-surface" : ""}`}
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

      {/* Safety Tips CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <Container size="narrow" className="text-center">
          <h2 className="font-serif font-bold text-display-sm text-white mb-4">
            Stay Safe on the Water
          </h2>
          <p className="text-primary-200 text-body-lg mb-8">
            Check water levels, weather conditions, and always practice river safety.
            Read our comprehensive river safety guide before your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/articles/river-safety-tips-summer-adventures" variant="secondary" size="lg">
              Safety Guide
            </Button>
            <Button
              to="/calendar"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Water Events
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
