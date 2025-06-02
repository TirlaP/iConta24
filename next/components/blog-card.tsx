"use client";
import { Link } from "next-view-transitions";
import React from "react";
import { BlurImage } from "@/components/blur-image";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { truncate } from "@/lib/utils";
// Removed date-fns dependency
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Article } from "@/types/types";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

export const BlogCard = ({ article, locale }: { article: Article, locale: string }) => {
  const readingTime = Math.ceil((article.description?.length || 0) / 200);
  
  return (
    <Link
      href={`/${locale}/blog/${article.slug}`}
      className="group"
    >
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100 hover:border-primary/20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Image Section */}
          <div className="relative h-64 lg:h-full overflow-hidden">
            {article.image ? (
              <BlurImage
                src={strapiImage(article.image.url)}
                alt={article.title}
                height="600"
                width="800"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
                <Tag className="w-16 h-16 text-primary/20" />
              </div>
            )}
            
            {/* Category Badge */}
            {article.categories && article.categories.length > 0 && (
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary border border-primary/20">
                  {article.categories[0].name}
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              {/* Additional Categories */}
              {article.categories && article.categories.length > 1 && (
                <div className="flex gap-2 flex-wrap mb-4">
                  {article.categories.slice(1).map((category, idx) => (
                    <span
                      key={`category-${idx}`}
                      className="text-xs font-medium text-gray-600 px-3 py-1 bg-gray-100 rounded-full"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-bold text-accent mb-4 group-hover:text-primary transition-colors line-clamp-2">
                <Balancer>{article.title}</Balancer>
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed line-clamp-3 mb-6">
                {article.description}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.publishedAt).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} min citire</span>
                </div>
              </div>
              
              <div className="flex items-center text-primary group-hover:gap-2 transition-all">
                <span className="text-sm font-semibold">Citește</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export const BlogCardVertical = ({ article, locale }: { article: Article, locale: string }) => {
  const readingTime = Math.ceil((article.description?.length || 0) / 200);
  
  return (
    <Link
      href={`/${locale}/blog/${article.slug}`}
      className="group h-full"
    >
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100 hover:border-primary/20"
      >
        {/* Image Section */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          {article.image ? (
            <BlurImage
              src={strapiImage(article.image.url || "")}
              alt={article.title}
              height="400"
              width="600"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
              <Tag className="w-12 h-12 text-primary/20" />
            </div>
          )}
          
          {/* Category Badge */}
          {article.categories && article.categories.length > 0 && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary border border-primary/20">
                {article.categories[0].name}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            {/* Title */}
            <h3 className="text-xl font-bold text-accent mb-3 group-hover:text-primary transition-colors line-clamp-2">
              <Balancer>{article.title}</Balancer>
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {article.description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(article.publishedAt).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{readingTime} min</span>
              </div>
            </div>
            
            <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
