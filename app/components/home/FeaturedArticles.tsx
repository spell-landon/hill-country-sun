"use client";

import { Link } from "@remix-run/react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { Button } from "~/components/ui/Button";
import {
  Card,
  CardImage,
  CardContent,
  CardTitle,
  CardMeta,
} from "~/components/ui/Card";
import type { Article } from "~/lib/mock-data";
import { formatDate } from "~/lib/utils";

interface FeaturedArticlesProps {
  articles: Article[];
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const shouldReduceMotion = useReducedMotion();

  if (articles.length === 0) return null;

  const [featuredArticle, ...otherArticles] = articles;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
    visible: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
  };

  return (
    <section className="py-12 sm:py-16 md:py-24">
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8 md:mb-12"
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

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Featured Article (Large) */}
          <motion.article
            className="group"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link
              to={`/articles/${featuredArticle.slug}`}
              className="block h-full"
            >
              <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-xl">
                <img
                  src={featuredArticle.mainImage}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                />
                <div className="absolute inset-0 gradient-overlay-strong" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <Link
                    to={`/articles?category=${encodeURIComponent(featuredArticle.category)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block bg-secondary text-primary text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full mb-2 sm:mb-3 hover:bg-secondary-400 transition-colors"
                  >
                    {featuredArticle.category}
                  </Link>
                  <h3 className="font-serif font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                    <time dateTime={featuredArticle.publishedAt}>
                      {formatDate(featuredArticle.publishedAt)}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Other Articles (Grid) */}
          <motion.div
            className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {otherArticles.slice(0, 4).map((article, index) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card as="article">
                  <Link to={`/articles/${article.slug}`} className="block group">
                    <CardImage
                      src={article.mainImage}
                      alt=""
                      aspectRatio="video"
                    />
                    <CardContent className="p-3 sm:p-4 md:p-6">
                      <Link
                        to={`/articles?category=${encodeURIComponent(article.category)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-block text-xs sm:text-sm text-secondary font-medium mb-1 sm:mb-2 hover:text-secondary-600 transition-colors"
                      >
                        {article.category}
                      </Link>
                      <CardTitle className="text-sm sm:text-base md:text-lg line-clamp-2">{article.title}</CardTitle>
                      <CardMeta className="text-xs sm:text-sm mt-2">
                        <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                        <time dateTime={article.publishedAt}>
                          {formatDate(article.publishedAt)}
                        </time>
                      </CardMeta>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
