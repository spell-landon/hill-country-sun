"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";

interface HeroProps {
  currentIssueSlug?: string;
}

export function Hero({ currentIssueSlug }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with subtle zoom */}
      <motion.div
        className="absolute inset-0"
        initial={shouldReduceMotion ? {} : { scale: 1.1 }}
        animate={shouldReduceMotion ? {} : { scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 md:bg-gradient-to-r md:from-black/80 md:via-black/60 md:to-transparent" />
      </motion.div>

      {/* Content */}
      <Container size="wide" className="relative z-10 py-8 sm:py-12 md:py-20">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Tagline */}
          <motion.p
            className="text-secondary font-semibold text-sm sm:text-base md:text-lg mb-3 sm:mb-4"
            variants={shouldReduceMotion ? {} : fadeInUp}
            transition={{ duration: 0.5 }}
          >
            Your Hill Country Connection
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            className="font-serif font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 leading-tight"
            variants={shouldReduceMotion ? {} : fadeInUp}
            transition={{ duration: 0.5 }}
          >
            Stories, Events & Life in the{" "}
            <span className="text-secondary">Texas Hill Country</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-white/90 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl leading-relaxed"
            variants={shouldReduceMotion ? {} : fadeInUp}
            transition={{ duration: 0.5 }}
          >
            Covering Wimberley and the River Region since 1990. Discover local news,
            upcoming events, and the best of Hill Country living.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            variants={shouldReduceMotion ? {} : fadeInUp}
            transition={{ duration: 0.5 }}
          >
            {currentIssueSlug ? (
              <Button to={`/publications/hill-country-sun/issues/${currentIssueSlug}`} variant="secondary" size="md" className="w-full sm:w-auto">
                Read Latest Issue
              </Button>
            ) : (
              <Button to="/publications/hill-country-sun" variant="secondary" size="md" className="w-full sm:w-auto">
                Browse Magazine
              </Button>
            )}
            <Button to="/articles" variant="outline" size="md" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
              Explore Articles
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block motion-reduce:animate-none"
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={shouldReduceMotion ? {} : { opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1"
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
