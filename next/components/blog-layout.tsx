"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { format } from "date-fns";
import { strapiImage } from "@/lib/strapi/strapiImage";
import DynamicZoneManager from "./dynamic-zone/manager";
import { Article } from "@/types/types";
import { ArrowLeft, Calendar, Clock, Tag, Share2, Facebook, Twitter } from "lucide-react";
import { BlogCardVertical } from "./blog-card";

export function BlogLayout({
  article,
  locale,
  children,
  relatedArticles = [],
}: {
  article: Article;
  locale: string;
  children: React.ReactNode;
  relatedArticles?: Article[];
}) {
  const readingTime = Math.ceil((article.description?.length || 0) / 200 + (article.content?.length || 0) / 250);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${article.title} - iConta24`;

  const handleShare = (platform: 'facebook' | 'twitter' | 'copy') => {
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        // You could add a toast notification here
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <Link 
              href={`/${locale}/blog`} 
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Înapoi la Blog</span>
            </Link>

            {/* Article Header */}
            <div className="max-w-4xl mx-auto">
              {/* Categories */}
              {article.categories && article.categories.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-6">
                  {article.categories.map((category, idx) => (
                    <span
                      key={`category-${idx}`}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                    >
                      <Tag className="w-3 h-3 inline mr-1" />
                      {category.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="heading-1 mb-6">{article.title}</h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(article.publishedAt), "dd MMMM yyyy")}</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} minute citire</span>
                </div>
              </div>

              {/* Description */}
              {article.description && (
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {article.description}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Featured Image */}
        {article.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="container-custom mt-8"
          >
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={strapiImage(article.image.url)}
                  height="800"
                  width="1200"
                  className="w-full h-auto object-cover"
                  alt={article.title}
                  priority
                />
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="article-content"
            >
              {children}
            </motion.article>

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h3 className="text-lg font-semibold text-accent">Distribuie articolul</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-10 h-10 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-10 h-10 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-10 h-10 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                    aria-label="Copy link"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Zone */}
      {article?.dynamic_zone && article.dynamic_zone.length > 0 && (
        <section className="section-padding bg-gray-50">
          <DynamicZoneManager dynamicZone={article.dynamic_zone} locale={locale} />
        </section>
      )}

      {/* Related Articles */}
      {relatedArticles && relatedArticles.length > 0 && (
        <section className="section-padding bg-gradient-to-b from-white to-secondary">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="heading-2 mb-4">Articole Similare</h2>
              <p className="text-gray-600">Continuă să explorezi subiectele care te interesează</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <motion.div
                  key={relatedArticle.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BlogCardVertical article={relatedArticle} locale={locale} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="heading-2 text-white mb-4">Nu rata niciun articol</h2>
            <p className="text-xl text-white/90 mb-8">
              Abonează-te la newsletter-ul nostru pentru a primi cele mai recente articole și noutăți legislative
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email-ul tău"
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button type="submit" className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Abonează-te
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
