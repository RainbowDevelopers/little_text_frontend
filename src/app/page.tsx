'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Video, Headphones, Users, TrendingUp, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import PostGrid from '@/components/blog/PostGrid';
import HeroCard from '@/components/blog/HeroCard';
import Card from '@/components/ui/Card';
import { Post, Category } from '@/lib/types';
import { postsAPI, categoriesAPI } from '@/lib/api';

const stats = [
  { icon: BookOpen, label: 'Articles', value: '250+' },
  { icon: Users, label: 'Readers', value: '50K+' },
  { icon: Award, label: 'Awards', value: '12' },
  { icon: TrendingUp, label: 'Growth', value: '200%' },
];

const contentTypes = [
  {
    icon: BookOpen,
    title: 'Articles',
    description: 'In-depth articles covering technology, design, culture, and more.',
    link: '/posts',
    color: 'from-gray-900 to-black',
  },
  {
    icon: Video,
    title: 'Videos',
    description: 'Comprehensive video tutorials and visual guides for learning.',
    link: '/videos',
    color: 'from-gray-800 to-gray-900',
  },
  {
    icon: Headphones,
    title: 'Podcasts',
    description: 'Deep conversations with experts and thought leaders.',
    link: '/podcasts',
    color: 'from-gray-700 to-gray-800',
  },
];

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [heroPosts, setHeroPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryPosts, setCategoryPosts] = useState<{ [key: string]: Post[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        // Load latest posts
        const latest = await postsAPI.getAll(1, 6);
        setLatestPosts(latest.data);

        // Load hero posts (featured)
        const heroes = await postsAPI.getFeatured(2);
        setHeroPosts(heroes);

        // Load categories
        const cats = await categoriesAPI.getAll();
        setCategories(cats.slice(0, 3)); // Show top 3 categories

        // Load posts for each category (top 3 posts per category)
        const catPosts: { [key: string]: Post[] } = {};
        for (const cat of cats.slice(0, 3)) {
          const response = await postsAPI.getByCategory(cat.slug, 1, 3);
          catPosts[cat.slug] = response.data;
        }
        setCategoryPosts(catPosts);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black py-20 md:py-32 lg:py-40">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold uppercase tracking-wider rounded-full">
                Welcome to LittleText
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white leading-tight mb-6"
            >
              Stories Worth Reading
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8"
            >
              Thoughtful content delivered with clarity and purpose. Discover
              stories that inspire, inform, and matter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button href="/posts" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Explore Articles
              </Button>
              <Button href="/about" variant="secondary" size="lg">
                Learn More
              </Button>
            </motion.div>
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

      {/* Content Types Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
              Explore Our Content
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Multiple formats to consume the content that matters most to you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {contentTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={type.link} className="block group">
                    <Card padding="lg" className="h-full hover:shadow-2xl transition-all">
                      <div className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        {type.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        {type.description}
                      </p>
                      <div className="flex items-center gap-2 text-black dark:text-white font-medium group-hover:gap-3 transition-all">
                        Explore <ArrowRight className="w-5 h-5" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <Container>
          <div className="space-y-12">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between"
            >
              <div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
                  Latest Articles
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                  Fresh perspectives and insights from our latest posts
                </p>
              </div>
              <Link
                href="/posts"
                className="hidden md:flex items-center gap-2 text-black dark:text-white font-medium hover:opacity-70 transition-opacity text-lg"
              >
                View All <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Posts Grid */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-black dark:border-white"></div>
                <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">Loading posts...</p>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <p className="text-red-600 dark:text-red-400 mb-6 text-lg font-medium">{error}</p>
                <Button onClick={() => window.location.reload()} size="lg">
                  Try Again
                </Button>
              </motion.div>
            )}

            {!loading && !error && latestPosts.length > 0 && (
              <PostGrid posts={latestPosts} columns={3} />
            )}

            {!loading && !error && latestPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">No posts available yet.</p>
                <Button href="/contact" size="lg">
                  Get in Touch
                </Button>
              </motion.div>
            )}

            {/* Mobile View All Link */}
            {!loading && !error && latestPosts.length > 0 && (
              <div className="md:hidden text-center">
                <Link
                  href="/posts"
                  className="inline-flex items-center gap-2 text-black dark:text-white font-medium hover:opacity-70 transition-opacity text-lg"
                >
                  View All Articles <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Category Sections */}
      {!loading && !error && categories.length > 0 && categories.map((category, categoryIndex) => {
        const posts = categoryPosts[category.slug] || [];
        if (posts.length === 0) return null;

        return (
          <section
            key={category.id}
            className={`py-16 md:py-24 ${categoryIndex % 2 === 0 ? 'bg-white dark:bg-black' : 'bg-gray-50 dark:bg-gray-900'}`}
          >
            <Container>
              <div className="space-y-12">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
                      {category.name}
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                      {category.description || `Explore ${category.name.toLowerCase()} articles`}
                    </p>
                  </div>
                  <Link
                    href={`/posts?category=${category.slug}`}
                    className="hidden md:flex items-center gap-2 text-black dark:text-white font-medium hover:opacity-70 transition-opacity text-lg"
                  >
                    View All <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>

                {/* Posts Grid */}
                <PostGrid posts={posts} columns={3} />

                {/* Mobile View All Link */}
                <div className="md:hidden text-center">
                  <Link
                    href={`/posts?category=${category.slug}`}
                    className="inline-flex items-center gap-2 text-black dark:text-white font-medium hover:opacity-70 transition-opacity text-lg"
                  >
                    View All {category.name} <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Heroes Section */}
      {!loading && !error && heroPosts.length > 0 && (
        <section className="py-16 md:py-24 bg-white dark:bg-black">
          <Container>
            <div className="space-y-12">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
                  Featured Stories
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                  Our most impactful and inspiring content
                </p>
              </motion.div>

              {/* Hero Cards */}
              <div className="space-y-8">
                {heroPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <HeroCard post={post} />
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
              Why LittleText?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We are committed to delivering quality content that makes a difference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white dark:text-black" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-2">
                    Quality First
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Every piece is thoughtfully written, carefully edited, and designed
                    to provide value to our readers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white dark:text-black" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-2">
                    Community Driven
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Our readers come first. We write with clarity, respect their time,
                    and deliver value in every piece.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white dark:text-black" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-2">
                    Always Improving
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    We are committed to growth, constantly improving our craft and
                    staying curious about the world.
                  </p>
                </div>
              </div>

              <Button href="/about" variant="secondary" size="lg">
                Learn More About Us
              </Button>
            </motion.div>

            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <BookOpen className="w-24 h-24 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Feature Image Placeholder
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
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
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Start Your Journey
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 dark:text-gray-400 mb-8 leading-relaxed">
              Join thousands of readers who trust LittleText for quality content.
              Subscribe to never miss a story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="secondary" size="lg">
                Subscribe Now
              </Button>
              <Button href="/posts" size="lg">
                Explore Articles
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
