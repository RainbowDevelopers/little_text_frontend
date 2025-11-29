'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Video, Headphones, Play, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import CategoryCarousel from '@/components/blog/CategoryCarousel';
import FeaturedHero from '@/components/blog/FeaturedHero';
import AudioCard from '@/components/media/AudioCard';
import VideoCard from '@/components/media/VideoCard';
import { Post, Podcast, Video as VideoType } from '@/lib/types';
import { postsAPI, podcastsAPI, videosAPI } from '@/lib/api';

// Helper function to format duration from seconds to MM:SS format
function formatDuration(seconds?: number): string | undefined {
  if (!seconds || seconds <= 0) return undefined;
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Define the categories in the order they should appear
const ORDERED_CATEGORIES = [
  { name: 'Heroes', slug: 'heroes' },
  { name: 'Startup', slug: 'startup' },
  { name: 'Growth', slug: 'growth' },
  { name: 'Explore', slug: 'explore' },
];

export default function HomePage() {
  const [categoryPosts, setCategoryPosts] = useState<{ [key: string]: Post[] }>({});
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const catPosts: { [key: string]: Post[] } = {};

        // Load featured posts first
        try {
          const featured = await postsAPI.getFeatured();
          console.log('Featured posts loaded:', featured.length, featured);
          setFeaturedPosts(featured);
        } catch (err) {
          console.error('Error loading featured posts:', err);
          setFeaturedPosts([]);
        }

        // Load posts for each specific category
        for (const cat of ORDERED_CATEGORIES) {
          try {
            if (cat.slug === 'latest') {
              // Skip loading for latest as we're using featured posts now
              continue;
            } else {
              // For other categories, get posts by category slug
              try {
                const response = await postsAPI.getByCategory(cat.slug, 1, 6);
                catPosts[cat.slug] = response.data;
              } catch {
                console.warn(`Category ${cat.name} not found or has no posts yet`);
                catPosts[cat.slug] = [];
              }
            }
          } catch (error) {
            console.error(`Error loading ${cat.name} posts:`, error);
            catPosts[cat.slug] = [];
          }
        }
        
        setCategoryPosts(catPosts);

        // Load podcasts (latest 4 - 1 featured + 3 grid)
        try {
          const podcastsResponse = await podcastsAPI.getAll(1, 4);
          console.log('Podcasts loaded:', podcastsResponse.data.length);
          setPodcasts(podcastsResponse.data);
        } catch (err) {
          console.error('Error loading podcasts:', err);
          setPodcasts([]);
        }

        // Load videos (latest 4 - 1 featured + 3 grid)
        try {
          const videosResponse = await videosAPI.getAll(1, 4);
          console.log('Videos loaded:', videosResponse.data.length);
          setVideos(videosResponse.data);
        } catch (err) {
          console.error('Error loading videos:', err);
          setVideos([]);
        }
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
      {/* Featured Posts Hero Section */}
      {!loading && featuredPosts.length > 0 && (
        <FeaturedHero posts={featuredPosts} />
      )}

      {/* Fallback Hero if no featured posts */}
      {!loading && featuredPosts.length === 0 && (
        <section className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black py-12 md:py-16 lg:py-20">
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
                Discover Stories That Matter
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8"
              >
                Thoughtful content delivered with clarity and purpose
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-sm text-gray-500 dark:text-gray-500 italic"
              >
                Note: No featured posts yet. Admin can feature posts to create a hero carousel.
              </motion.p>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Loading State */}
      {loading && (
        <section className="py-16 md:py-24 bg-white dark:bg-black">
          <Container>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-black dark:border-white"></div>
              <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">Loading articles...</p>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="py-16 md:py-24 bg-white dark:bg-black">
          <Container>
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
          </Container>
        </section>
      )}

      {/* Category Sections with Carousel */}
      {!loading && !error && ORDERED_CATEGORIES.map((category, categoryIndex) => {
        const posts = categoryPosts[category.slug] || [];
        if (posts.length === 0) return null;

        const bgClass = categoryIndex % 2 === 0 
          ? 'bg-white dark:bg-black' 
          : 'bg-gray-50 dark:bg-gray-900';

        return (
          <section
            key={category.slug}
            className={`py-16 md:py-24 ${bgClass}`}
          >
            <Container>
              <div className="space-y-8">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-2">
                      {category.name}
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                      {category.slug === 'latest' 
                        ? 'Fresh perspectives and insights from our newest posts'
                        : category.slug === 'heroes'
                        ? 'Stories of inspiring individuals making a difference'
                        : category.slug === 'startup'
                        ? 'Innovation and entrepreneurship insights'
                        : category.slug === 'growth'
                        ? 'Strategies for personal and professional development'
                        : 'Discover new topics and expand your horizons'}
                    </p>
                  </div>
                  <Link
                    href={category.slug === 'latest' ? '/posts' : `/posts?category=${category.slug}`}
                    className="hidden md:flex items-center gap-2 text-black dark:text-white font-medium hover:opacity-70 transition-opacity text-lg"
                  >
                    View All <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>

                {/* Carousel */}
                <CategoryCarousel posts={posts} categorySlug={category.slug} />

                {/* Mobile View All Link */}
                <div className="md:hidden text-center">
                  <Link
                    href={category.slug === 'latest' ? '/posts' : `/posts?category=${category.slug}`}
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

      {/* Podcasts Section */}
      {!loading && podcasts.length > 0 && (
        <section className="py-16 md:py-24 bg-white dark:bg-black">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Headphones className="w-10 h-10 text-black dark:text-white" />
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white">
                      Latest Podcasts
                    </h2>
                  </div>
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                    Deep conversations with experts and thought leaders
                  </p>
                </div>
                <Link
                  href="/podcasts"
                  className="hidden md:flex items-center gap-2 text-black dark:text-white font-medium hover:opacity-70 transition-opacity text-lg"
                >
                  Explore More <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Featured Podcast */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group"
                  onClick={() => window.location.href = `/podcasts/${podcasts[0].slug}`}
                >
                  {/* Background Image */}
                  <div className="relative aspect-[21/9] md:aspect-[21/8] lg:aspect-[21/7]">
                    {podcasts[0].bannerImage && (
                      <>
                        <img
                          src={podcasts[0].bannerImage}
                          alt={podcasts[0].title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 dark:from-black/95 dark:via-black/80 dark:to-black/50" />
                      </>
                    )}
                    
                    {!podcasts[0].bannerImage && (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-700 to-pink-700 dark:from-purple-950 dark:via-purple-800 dark:to-pink-800" />
                    )}
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/50 group-hover:scale-110 transition-transform duration-300">
                        <Headphones className="w-10 h-10 md:w-12 md:h-12 text-white ml-1" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                      <div className="flex items-center gap-3 mb-4">
                        <Headphones className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        <span className="px-3 py-1 bg-white/90 dark:bg-white text-black text-xs md:text-sm font-bold uppercase tracking-wider rounded-full">
                          Featured
                        </span>
                        {podcasts[0].category && (
                          <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs md:text-sm font-semibold uppercase tracking-wider rounded-full border border-white/30">
                            {podcasts[0].category.name}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 max-w-4xl group-hover:text-gray-100 transition-colors">
                        {podcasts[0].title}
                      </h3>
                      
                      <p className="text-base md:text-lg text-gray-200 dark:text-gray-300 mb-6 max-w-3xl line-clamp-2">
                        {podcasts[0].description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 md:gap-6">
                        {podcasts[0].duration && (
                          <div className="flex items-center gap-2 text-white">
                            <Headphones className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-sm md:text-base font-medium">
                              {Math.floor(podcasts[0].duration / 60)}:{(podcasts[0].duration % 60).toString().padStart(2, '0')}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm md:text-base font-medium group-hover:bg-white/20 transition-colors">
                          <Headphones className="w-4 h-4 md:w-5 md:h-5" />
                          <span>Listen Now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {podcasts.slice(1, 4).map((podcast, index) => (
                  <motion.div
                    key={podcast.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <AudioCard
                      id={podcast.id}
                      slug={podcast.slug}
                      title={podcast.title}
                      description={podcast.description}
                      audioUrl={podcast.audioUrl}
                      duration={podcast.duration ? `${Math.floor(podcast.duration / 60)}:${(podcast.duration % 60).toString().padStart(2, '0')}` : undefined}
                      publishedAt={podcast.publishedAt}
                      category={podcast.category?.name}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Mobile Explore More Link */}
              <div className="md:hidden text-center mt-8">
                <Link
                  href="/podcasts"
                  className="inline-flex items-center gap-2 text-black dark:text-white font-medium hover:opacity-70 transition-opacity text-lg"
                >
                  Explore More Podcasts <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Videos Section */}
      {!loading && (
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Video className="w-10 h-10 text-black dark:text-white" />
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white">
                      Latest Videos
                    </h2>
                  </div>
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                    Comprehensive video tutorials and visual guides
                  </p>
                </div>
                <Link
                  href="/videos"
                  className="hidden md:flex items-center gap-2 text-black dark:text-white font-medium hover:opacity-70 transition-opacity text-lg"
                >
                  Explore More <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {videos.length > 0 ? (
                <>
                  {/* Featured Video */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                      className="relative overflow-hidden rounded-2xl cursor-pointer group"
                      onClick={() => window.location.href = `/videos/${videos[0].id}`}
                    >
                      {/* Background Image */}
                      <div className="relative aspect-[21/9] md:aspect-[21/8] lg:aspect-[21/7]">
                        <img
                          src={videos[0].thumbnailUrl}
                          alt={videos[0].title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 dark:from-black/95 dark:via-black/80 dark:to-black/50" />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/50 group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-1" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                          <div className="flex items-center gap-3 mb-4">
                            <Video className="w-6 h-6 md:w-8 md:h-8 text-white" />
                            <span className="px-3 py-1 bg-white/90 dark:bg-white text-black text-xs md:text-sm font-bold uppercase tracking-wider rounded-full">
                              Featured
                            </span>
                            {videos[0].category && (
                              <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs md:text-sm font-semibold uppercase tracking-wider rounded-full border border-white/30">
                                {videos[0].category.name}
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 max-w-4xl group-hover:text-gray-100 transition-colors">
                            {videos[0].title}
                          </h3>
                          
                          <p className="text-base md:text-lg text-gray-200 dark:text-gray-300 mb-6 max-w-3xl line-clamp-2">
                            {videos[0].description}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-4 md:gap-6">
                            <div className="flex items-center gap-2 text-white">
                              <Play className="w-4 h-4 md:w-5 md:h-5" />
                              <span className="text-sm md:text-base font-medium">{videos[0].duration}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm md:text-base font-medium group-hover:bg-white/20 transition-colors">
                              <Eye className="w-4 h-4 md:w-5 md:h-5" />
                              <span>Watch Now</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {videos.slice(1, 4).map((video, index) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <VideoCard
                          id={video.id}
                          title={video.title}
                          description={video.description}
                          thumbnailUrl={video.thumbnailUrl}
                          videoUrl={video.videoUrl}
                          publishedAt={video.publishedAt}
                          category={video.category?.name}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile Explore More Link */}
                  <div className="md:hidden text-center mt-8">
                    <Link
                      href="/videos"
                      className="inline-flex items-center gap-2 text-black dark:text-white font-medium hover:opacity-70 transition-opacity text-lg"
                    >
                      Explore More Videos <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <Video className="w-24 h-24 text-gray-300 dark:text-gray-700 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                    No Videos Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Check back soon for our latest video content!
                  </p>
                  <Button href="/videos" size="lg">
                    View All Videos
                  </Button>
                </div>
              )}
            </motion.div>
          </Container>
        </section>
      )}
    </div>
  );
}
