"use client";

import { Link } from "@remix-run/react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";

interface Publication {
  title: string;
  description: string;
  href: string;
  image: string;
}

interface QuickLinksProps {
  publications?: Publication[];
  title?: string;
  subtitle?: string;
}

// Fallback publications if none provided from Sanity
const defaultPublications: Publication[] = [
  {
    title: "Hill Country Sun",
    description:
      "Your source for Hill Country news, events, and stories celebrating our vibrant community.",
    href: "/publications/hill-country-sun",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    title: "Welcome to Wimberley",
    description:
      "Discover the charm of this Hill Country village. Find things to do, places to eat, and local tips.",
    href: "/publications/welcome-to-wimberley",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
  },
  {
    title: "River Region Guide",
    description:
      "Explore the best swimming holes, water activities, and riverside adventures in the area.",
    href: "/publications/river-region-guide",
    image:
      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&q=80",
  },
  {
    title: "Hunting Guide",
    description:
      "Everything you need to know about hunting seasons, regulations, and ranches in the Hill Country.",
    href: "/publications/hunting-guide",
    image:
      "https://images.unsplash.com/photo-1516655855035-d5215bcb5604?w=600&q=80",
  },
];

const defaultTitle = "Explore Our Publications";
const defaultSubtitle = "In-depth resources to help you make the most of the Hill Country.";

export function QuickLinks({ publications, title, subtitle }: QuickLinksProps) {
  const displayPublications = publications && publications.length > 0 ? publications : defaultPublications;
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? {} : { opacity: 0, y: 30 },
    visible: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
      <Container size="wide">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            title={title || defaultTitle}
            subtitle={subtitle || defaultSubtitle}
            align="center"
          />
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {displayPublications.map((publication) => (
              <motion.div
                key={publication.href}
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Link
                  to={publication.href}
                  className="group relative block overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Background Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={publication.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <div className="inline-flex items-center justify-center w-9 h-9 bg-secondary rounded-lg mb-2">
                      <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-white mb-1 group-hover:text-secondary transition-colors">
                      {publication.title}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm mb-2 line-clamp-2">
                      {publication.description}
                    </p>
                    <span className="inline-flex items-center text-secondary text-xs sm:text-sm font-semibold">
                      Learn More
                      <ArrowRight
                        className="ml-1 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
        </motion.div>
      </Container>
    </section>
  );
}
