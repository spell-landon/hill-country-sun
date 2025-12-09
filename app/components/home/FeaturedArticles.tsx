"use client";

import { useRef, useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { Button } from "~/components/ui/Button";
import type { Article } from "~/lib/mock-data";
import { getPublicationBySlug } from "~/lib/mock-data";
import { formatDate } from "~/lib/utils";

interface FeaturedArticlesProps {
  articles: Article[];
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const shouldReduceMotion = useReducedMotion();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (articles.length === 0) return null;

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Get the width of one card (including gap)
    const card = container.querySelector("article");
    const cardWidth = card?.offsetWidth || 300;
    const gap = 24; // gap-6 = 24px
    const scrollAmount = direction === "left" ? -(cardWidth + gap) : cardWidth + gap;

    container.scrollBy({
      left: scrollAmount,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section className="py-12 sm:py-16 md:py-24">
      <Container size="wide">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8"
        >
          <SectionHeading
            title="Featured Stories"
            subtitle="The latest news and features from around the Hill Country."
            className="mb-0"
          />
          <Button to="/articles" variant="ghost" className="self-start sm:self-auto text-sm">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all -translate-x-1/2 ${
              canScrollLeft
                ? "opacity-100 hover:bg-gray-50 hover:scale-110"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all translate-x-1/2 ${
              canScrollRight
                ? "opacity-100 hover:bg-gray-50 hover:scale-110"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          </button>

          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {articles.map((article, index) => {
              const publication = getPublicationBySlug(article.publication);
              return (
                <motion.article
                  key={article.id}
                  className="group flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[calc(33.333%-1rem)] snap-start"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link
                    to={`/articles/${article.slug}`}
                    className="block h-full"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                      <img
                        src={article.mainImage}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      {/* Publication Badge */}
                      {publication && (
                        <Link
                          to={`/publications/${publication.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-3 left-3 bg-primary/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded hover:bg-primary transition-colors"
                        >
                          {publication.name}
                        </Link>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                        <Link
                          to={`/articles?category=${encodeURIComponent(article.category)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-block bg-secondary text-primary text-xs font-semibold px-2.5 py-1 rounded-full mb-3 hover:bg-secondary-400 transition-colors"
                        >
                          {article.category}
                        </Link>
                        <h3 className="font-serif font-bold text-lg sm:text-xl md:text-2xl text-white mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-white/80 text-sm mb-3 line-clamp-2 hidden sm:block">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                          <time dateTime={article.publishedAt}>
                            {formatDate(article.publishedAt)}
                          </time>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
