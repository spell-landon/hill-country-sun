import type { MetaFunction } from "@remix-run/node";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { getGuideBySlug } from "~/lib/mock-data";
import { ArrowRight, Target } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Hunting Guide | Hill Country Sun" },
    {
      name: "description",
      content:
        "Everything you need to know about hunting in the Texas Hill Country. Seasons, regulations, ranches, and tips for a successful hunt.",
    },
  ];
};

export default function HuntingGuide() {
  const guide = getGuideBySlug("hunting-guide");

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
              <Target className="h-5 w-5" aria-hidden="true" />
              <span className="text-body-sm font-semibold">Hunting Season</span>
            </div>
            <h1 className="font-serif font-bold text-display-sm md:text-display-md lg:text-display-lg text-white mb-6">
              {guide.title}
            </h1>
            <p className="text-white/90 text-body-lg mb-8">{guide.intro}</p>
            <Button
              href="https://tpwd.texas.gov/regulations/outdoor-annual/"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              TPWD Regulations
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

      {/* Important Notice */}
      <section className="py-12 bg-accent/10">
        <Container size="default">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-accent/20">
            <h3 className="font-serif font-bold text-heading-md text-primary mb-3">
              Important Notice
            </h3>
            <p className="text-body-md text-text-muted">
              Hunting regulations change annually. Always verify current seasons,
              bag limits, and required permits with Texas Parks & Wildlife before
              your hunt. This guide is for informational purposes only and may not
              reflect the most current regulations.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <Container size="narrow" className="text-center">
          <h2 className="font-serif font-bold text-display-sm text-white mb-4">
            Plan Your Hunt
          </h2>
          <p className="text-primary-200 text-body-lg mb-8">
            Contact local hunting ranches and outfitters to book your Hill Country
            hunting experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contact" variant="secondary" size="lg">
              Contact Us
            </Button>
            <Button
              to="/articles"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Hunting Stories
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
