import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PortableText } from "@portabletext/react";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { CopyEmail } from "~/components/ui/CopyEmail";
import { Mail, Award, Users, Newspaper } from "lucide-react";
import { getAboutPage, getTeamMembers, urlFor } from "~/lib/sanity.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const [aboutPage, teamMembers] = await Promise.all([
    getAboutPage(),
    getTeamMembers(),
  ]);

  if (!aboutPage) {
    // Return fallback data if no About page exists in Sanity yet
    return json({
      aboutPage: null,
      fallback: true,
    });
  }

  // Prefer standalone teamMember documents, fall back to aboutPage.teamMembers
  const transformedTeamMembers = teamMembers.length > 0
    ? teamMembers.map((member) => ({
        name: member.name,
        role: member.role,
        email: member.email,
        image: member.image ? urlFor(member.image).width(400).url() : "",
        bio: member.bio,
      }))
    : aboutPage.teamMembers?.map((member) => ({
        name: member.name,
        role: member.role,
        email: member.email,
        image: member.image ? urlFor(member.image).width(400).url() : "",
        bio: member.bio,
      })) || [];

  // Transform data for component
  const transformedData = {
    heroTitle: aboutPage.heroTitle,
    heroSubtitle: aboutPage.heroSubtitle,
    missionTitle: aboutPage.missionTitle,
    missionContent: aboutPage.missionContent,
    storyTitle: aboutPage.storyTitle,
    storyContent: aboutPage.storyContent,
    storyImage: aboutPage.storyImage ? urlFor(aboutPage.storyImage).width(800).url() : "",
    foundedYear: aboutPage.foundedYear,
    teamTitle: aboutPage.teamTitle,
    teamSubtitle: aboutPage.teamSubtitle,
    teamMembers: transformedTeamMembers,
    stats: aboutPage.stats || [],
  };

  return json({ aboutPage: transformedData, fallback: false });
};

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

// Portable Text components for rendering
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-4">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="text-heading-md md:text-heading-lg text-text font-serif italic">
        {children}
      </blockquote>
    ),
  },
};

// Icon mapping for stats
const statIcons: Record<string, typeof Award> = {
  "Years Serving": Award,
  "Monthly Readers": Users,
  "Issues Published": Newspaper,
};

export default function About() {
  const { aboutPage, fallback } = useLoaderData<typeof loader>();

  // Fallback content if no Sanity data
  if (fallback || !aboutPage) {
    return (
      <div className="py-16 text-center">
        <Container size="narrow">
          <h1 className="font-serif font-bold text-display-sm text-primary mb-4">
            About Page Coming Soon
          </h1>
          <p className="text-text-muted">
            Content is being set up in our CMS. Please check back later.
          </p>
        </Container>
      </div>
    );
  }

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
              {aboutPage.heroTitle}
            </h1>
            <p className="text-primary-200 text-body-lg">
              {aboutPage.heroSubtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      {aboutPage.stats && aboutPage.stats.length > 0 && (
        <section className="py-12 bg-surface">
          <Container size="wide">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {aboutPage.stats.map((stat) => {
                const Icon = statIcons[stat.label] || Award;
                return (
                  <div key={stat._key || stat.label} className="text-center">
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
      )}

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <Container size="default">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="font-serif font-bold text-display-sm text-primary mb-4 relative inline-block">
                {aboutPage.storyTitle}
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-secondary rounded-full" />
              </h2>
              <div className="mt-6 space-y-4 text-body-md text-text-muted">
                {aboutPage.storyContent && (
                  <PortableText value={aboutPage.storyContent} components={portableTextComponents} />
                )}
              </div>
            </div>
            <div className="relative">
              {aboutPage.storyImage && (
                <>
                  <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={aboutPage.storyImage}
                      alt="Our Story"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {aboutPage.foundedYear && (
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary rounded-lg flex items-center justify-center shadow-lg">
                      <span className="font-serif font-bold text-primary text-heading-md">
                        {aboutPage.foundedYear}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      {aboutPage.missionContent && (
        <section className="py-16 md:py-24 bg-surface">
          <Container size="narrow" className="text-center">
            <h2 className="font-serif font-bold text-display-sm text-primary mb-6">
              {aboutPage.missionTitle}
            </h2>
            <div className="text-heading-md md:text-heading-lg text-text font-serif italic">
              <PortableText value={aboutPage.missionContent} components={portableTextComponents} />
            </div>
          </Container>
        </section>
      )}

      {/* Team Section */}
      {aboutPage.teamMembers && aboutPage.teamMembers.length > 0 && (
        <section className="py-16 md:py-24">
          <Container size="wide">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-display-sm text-primary mb-4">
                {aboutPage.teamTitle}
              </h2>
              <p className="text-body-lg text-text-muted max-w-2xl mx-auto">
                {aboutPage.teamSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {aboutPage.teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-xl p-6 shadow-sm border border-surface"
                >
                  <div className="flex items-start gap-4">
                    {member.image && (
                      <img
                        src={member.image}
                        alt=""
                        className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <div>
                      <h3 className="font-serif font-bold text-heading-sm text-primary">
                        {member.name}
                      </h3>
                      <p className="text-secondary font-medium text-body-sm mb-2">
                        {member.role}
                      </p>
                      <p className="text-body-sm text-text-muted">{member.bio}</p>
                      {member.email && (
                        <CopyEmail
                          email={member.email}
                          className="text-body-sm text-primary hover:text-primary-600 mt-2"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

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
