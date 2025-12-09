"use client";

import { Link } from "@remix-run/react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Fish, Target, ArrowRight } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";

const guides = [
  {
    title: "Welcome to Wimberley",
    description:
      "Discover the charm of this Hill Country village. Find things to do, places to eat, and local tips.",
    href: "/welcome-to-wimberley",
    icon: MapPin,
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
  },
  {
    title: "River Region Guide",
    description:
      "Explore the best swimming holes, water activities, and riverside adventures in the area.",
    href: "/river-region-guide",
    icon: Fish,
    image:
      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&q=80",
  },
  {
    title: "Hunting Guide",
    description:
      "Everything you need to know about hunting seasons, regulations, and ranches in the Hill Country.",
    href: "/hunting-guide",
    icon: Target,
    image:
      "https://images.unsplash.com/photo-1516655855035-d5215bcb5604?w=600&q=80",
  },
];

export function QuickLinks() {
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
            title="Explore Our Guides"
            subtitle="In-depth resources to help you make the most of the Hill Country."
            align="center"
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <motion.div
                key={guide.href}
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Link
                  to={guide.href}
                  className="group relative block overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Background Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={guide.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-secondary rounded-lg mb-3">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-white mb-2 group-hover:text-secondary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-3 line-clamp-2">
                      {guide.description}
                    </p>
                    <span className="inline-flex items-center text-secondary text-sm font-semibold">
                      Learn More
                      <ArrowRight
                        className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
