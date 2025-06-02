"use client";
import React from "react";
import { BlogCardVertical } from "./blog-card";
import { Article } from "@/types/types";
import { motion } from "framer-motion";

export const BlogPostRows = ({ 
  articles, 
  locale = "ro" 
}: { 
  articles: Article[];
  locale?: string;
}) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <BlogCardVertical article={article} locale={locale} />
        </motion.div>
      ))}
    </div>
  );
};
