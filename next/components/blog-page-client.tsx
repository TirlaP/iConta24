"use client";
import { motion } from "framer-motion";
import { BlogCard, BlogCardVertical } from "@/components/blog-card";
import { Article } from "@/types/types";
import { FileText, Search } from "lucide-react";
import { useState } from "react";

interface BlogPageClientProps {
  blogPage?: any;
  featuredArticle?: Article;
  recentArticles: Article[];
  categories?: any;
  locale: string;
  totalArticles: number;
}

export function BlogPageClient({
  blogPage,
  featuredArticle,
  recentArticles,
  categories,
  locale,
  totalArticles
}: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleArticles, setVisibleArticles] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("recent");

  // Filter and sort articles
  const filteredAndSortedArticles = recentArticles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || 
        article.categories?.some(cat => cat.id === selectedCategory);
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "recent":
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });

  const handleLoadMore = () => {
    setVisibleArticles(prev => prev + 6);
  };

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setVisibleArticles(6); // Reset visible articles when changing category
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-24 pb-8">
        <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-6">
              <FileText className="w-4 h-4 mr-2" />
              Blog & Resurse
            </div>
            <h1 className="heading-1 mb-4">{blogPage?.heading || "Blog & Resurse"}</h1>
            <p className="text-lead max-w-3xl mx-auto">
              {blogPage?.sub_heading || "Află ultimele noutăți din domeniul contabilității și fiscalității"}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Caută articole..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
          </motion.div>

          {/* Categories Filter */}
          {categories?.data && categories.data.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <button 
                onClick={() => handleCategoryClick(null)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !selectedCategory 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                Toate Articolele
              </button>
              {categories.data.map((category: any) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && !searchQuery && !selectedCategory && (
        <section className="pt-12 pb-8">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-3 mb-6">Articol Recomandat</h2>
              <BlogCard article={featuredArticle} locale={locale} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Recent Articles Grid */}
      {filteredAndSortedArticles.length > 0 && (
        <section className={`${featuredArticle && !searchQuery && !selectedCategory ? 'pt-8' : 'pt-12'} pb-16 bg-gradient-to-b from-white to-secondary`}>
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="heading-3 mb-2">
                    {searchQuery ? `Rezultate pentru "${searchQuery}"` : 
                     selectedCategory ? "Articole Filtrate" : "Articole Recente"}
                  </h2>
                  <p className="text-gray-600">
                    {filteredAndSortedArticles.length} {filteredAndSortedArticles.length === 1 ? 'articol' : 'articole'} 
                    {selectedCategory && ` în categoria selectată`}
                  </p>
                </div>
                
                {/* Sort Options */}
                <div className="flex items-center gap-4">
                  <label className="text-sm text-gray-600">Sortează după:</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
                  >
                    <option value="recent">Cele mai recente</option>
                    <option value="oldest">Cele mai vechi</option>
                    <option value="title">Alfabetic</option>
                  </select>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedArticles.slice(0, visibleArticles).map((article: Article, index: number) => (
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

            {/* Load More Button */}
            {filteredAndSortedArticles.length > visibleArticles && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mt-12"
              >
                <button onClick={handleLoadMore} className="btn-primary">
                  Vezi Mai Multe Articole
                </button>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredAndSortedArticles.length === 0 && (searchQuery || selectedCategory) && (
        <section className="section-padding">
          <div className="container-custom text-center">
            <p className="text-gray-600 text-lg mb-4">
              {searchQuery && selectedCategory ? "Nu am găsit articole pentru căutarea și categoria selectată." :
               searchQuery ? "Nu am găsit articole pentru căutarea ta." :
               "Nu există articole în această categorie."}
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
              className="btn-primary"
            >
              Vezi toate articolele
            </button>
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
            <h2 className="heading-2 text-white mb-4">Abonează-te la Newsletter</h2>
            <p className="text-xl text-white/90 mb-8">
              Primește cele mai recente articole și actualizări legislative direct în inbox
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