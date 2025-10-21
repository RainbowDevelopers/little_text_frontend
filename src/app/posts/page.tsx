'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import PostGrid from '@/components/blog/PostGrid';
import Button from '@/components/ui/Button';
import { Post, Category } from '@/lib/types';
import { postsAPI, categoriesAPI } from '@/lib/api';
import { ChevronLeft, ChevronRight, BookOpen, Eye, Users, TrendingUp, FileText } from 'lucide-react';

const stats = [
  { icon: FileText, label: 'Total Articles', value: '250+' },
  { icon: Eye, label: 'Total Reads', value: '100K+' },
  { icon: Users, label: 'Active Readers', value: '15K+' },
  { icon: TrendingUp, label: 'Growing', value: '220%' },
];

export default function PostsPage() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  // Load categories and set initial category from URL
  useEffect(() => {
    async function loadCategories() {
      try {
        setCategoriesLoading(true);
        const cats = await categoriesAPI.getAll();
        setCategories(cats);

        // Check if there's a category in the URL
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
          setSelectedCategory(categoryParam);
        }
      } catch (err) {
        console.error('Error loading categories:', err);
      } finally {
        setCategoriesLoading(false);
      }
    }

    loadCategories();
  }, [searchParams]);

  // Load posts
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const response = await postsAPI.getAll(page, limit, selectedCategory || undefined);
        setPosts(response.data);
        setTotalPages(response.pagination.totalPages);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [page, selectedCategory]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    setPage(1); // Reset to first page when changing category
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black py-20 md:py-32 lg:py-40">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <BookOpen className="w-12 h-12 text-black dark:text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6 leading-tight"
            >
              All Articles
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8"
            >
              Explore our collection of thoughtful stories, insights, and ideas
              that matter.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto"
            >
              Dive into articles covering technology, design, culture, and more.
              Each piece is crafted with care and attention to detail.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-black dark:bg-gray-950">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-10 h-10 md:w-12 md:h-12 text-white mx-auto mb-4" />
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Posts Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
              {selectedCategory
                ? categories.find(c => c.slug === selectedCategory)?.name || 'Latest Stories'
                : 'Latest Stories'
              }
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
              {selectedCategory
                ? 'Explore articles in this category'
                : 'Browse our newest articles and discover fresh perspectives'
              }
            </p>
          </motion.div>

          {/* Category Filter */}
          {!categoriesLoading && categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === null
                      ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  All Articles
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      selectedCategory === category.slug
                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-black dark:border-white"></div>
              <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">Loading articles...</p>
            </motion.div>
          )}

          {/* Error State */}
          {error && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-red-500 dark:text-red-400" />
                </div>
                <p className="text-red-600 dark:text-red-400 mb-6 text-lg font-medium">{error}</p>
                <Button onClick={() => window.location.reload()} size="lg">
                  Try Again
                </Button>
              </div>
            </motion.div>
          )}

          {/* Posts Grid */}
          {!loading && !error && posts.length > 0 && (
            <>
              <PostGrid posts={posts} columns={3} />

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    variant="secondary"
                    size="lg"
                    icon={<ChevronLeft className="w-5 h-5" />}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                      Page <span className="text-black dark:text-white font-bold">{page}</span> of{' '}
                      <span className="text-black dark:text-white font-bold">{totalPages}</span>
                    </span>
                  </div>

                  <Button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    variant="secondary"
                    size="lg"
                    icon={<ChevronRight className="w-5 h-5" />}
                  >
                    Next
                  </Button>
                </motion.div>
              )}
            </>
          )}

          {/* Empty State */}
          {!loading && !error && posts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                  {selectedCategory
                    ? `No articles found in this category. Try another category or check back soon!`
                    : 'No articles found. Check back soon for new content!'
                  }
                </p>
                <Button href="/" size="lg">
                  Back to Home
                </Button>
              </div>
            </motion.div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black dark:bg-gray-950">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <BookOpen className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Stay Informed
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
              Subscribe to our newsletter and never miss a story. Get the latest
              articles delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="secondary" size="lg">
                Subscribe Now
              </Button>
              <Button href="/about" size="lg">
                Learn More
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
