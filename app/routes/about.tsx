import type { MetaFunction } from "@remix-run/node";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { Mail, Award, Users, Newspaper } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "About Us | Hill Country Sun" },
    {
      name: "description",
      content:
        "Learn about the Hill Country Sun, serving Wimberley and the River Region since 1990. Meet our team and discover our mission.",
    },
  ];
};

const team = [
  {
    name: "Julie Harrington",
    role: "Publisher",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Julie has been at the helm of the Hill Country Sun for over 15 years, bringing her passion for local journalism and community connection to every issue.",
  },
  {
    name: "Melissa Ball",
    role: "Editor",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Melissa oversees all editorial content, ensuring each story captures the essence of Hill Country life while maintaining the highest standards of journalism.",
  },
];

const stats = [
  { label: "Years Serving", value: "35+", icon: Award },
  { label: "Monthly Readers", value: "50K+", icon: Users },
  { label: "Issues Published", value: "400+", icon: Newspaper },
];

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <Container size="wide" className="relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif font-bold text-display-sm md:text-display-md text-white mb-6">
              About Hill Country Sun
            </h1>
            <p className="text-primary-200 text-body-lg">
              For over three decades, we've been the voice of Wimberley and the
              River Region, telling the stories that matter to our community.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-surface">
        <Container size="wide">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-secondary/20 rounded-full mb-3">
                    <Icon className="h-6 w-6 md:h-8 md:w-8 text-secondary" aria-hidden="true" />
                  </div>
                  <p className="font-serif font-bold text-heading-lg md:text-display-sm text-primary">
                    {stat.value}
                  </p>
                  <p className="text-body-sm text-text-muted">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <Container size="default">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="font-serif font-bold text-display-sm text-primary mb-4 relative inline-block">
                Our Story
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-secondary rounded-full" />
              </h2>
              <div className="mt-6 space-y-4 text-body-md text-text-muted">
                <p>
                  The Hill Country Sun was founded in 1990 with a simple mission:
                  to connect the communities of Wimberley and the River Region
                  through quality local journalism.
                </p>
                <p>
                  What started as a small community newsletter has grown into the
                  region's most trusted source for local news, events, and stories.
                  We've watched Wimberley grow and change over the decades, and
                  we've been proud to document that journey.
                </p>
                <p>
                  Today, we continue that mission through our quarterly magazine,
                  online articles, and community events calendar. We believe that
                  local journalism matters—it's what keeps communities connected
                  and informed.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"
                  alt="Newspaper printing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary rounded-lg flex items-center justify-center shadow-lg">
                <span className="font-serif font-bold text-primary text-heading-md">
                  1990
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-surface">
        <Container size="narrow" className="text-center">
          <h2 className="font-serif font-bold text-display-sm text-primary mb-6">
            Our Mission
          </h2>
          <blockquote className="text-heading-md md:text-heading-lg text-text font-serif italic">
            "To celebrate and preserve the unique character of the Texas Hill
            Country by telling the stories of the people, places, and traditions
            that make our region special."
          </blockquote>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <Container size="wide">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-display-sm text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-body-lg text-text-muted max-w-2xl mx-auto">
              The dedicated journalists and editors who bring you the Hill Country
              Sun every quarter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl p-6 shadow-sm border border-surface"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={member.image}
                    alt=""
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-heading-sm text-primary">
                      {member.name}
                    </h3>
                    <p className="text-secondary font-medium text-body-sm mb-2">
                      {member.role}
                    </p>
                    <p className="text-body-sm text-text-muted">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <Container size="narrow" className="text-center">
          <Mail className="h-12 w-12 text-secondary mx-auto mb-6" aria-hidden="true" />
          <h2 className="font-serif font-bold text-display-sm text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-primary-200 text-body-lg mb-8">
            Have a story tip, want to advertise, or just want to say hello? We'd
            love to hear from you.
          </p>
          <Button to="/contact" variant="secondary" size="lg">
            Contact Us
          </Button>
        </Container>
      </section>
    </>
  );
}
