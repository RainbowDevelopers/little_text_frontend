'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import AudioCard from '@/components/media/AudioCard';
import Button from '@/components/ui/Button';
import { Headphones, Play, Clock, Mic } from 'lucide-react';
import { Podcast } from '@/lib/types';
import { podcastsAPI } from '@/lib/api';

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPodcasts() {
      try {
        setLoading(true);
        const response = await podcastsAPI.getAll(1, 50);
        setPodcasts(response.data);
      } catch (err) {
        console.error('Error loading podcasts:', err);
        setError('Failed to load podcasts');
      } finally {
        setLoading(false);
      }
    }

    loadPodcasts();
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
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <Headphones className="w-12 h-12 text-black dark:text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6 leading-tight"
            >
              Modcrew Podcasts
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8"
            >
              Deep conversations about technology, design, and the future of
              digital content.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto"
            >
              Listen to thought-provoking discussions with industry experts,
              creators, and innovators shaping the digital landscape.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-16 md:py-24 bg-white dark:bg-black">
          <Container>
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-black dark:border-white"></div>
              <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">Loading podcasts...</p>
            </div>
          </Container>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="py-16 md:py-24 bg-white dark:bg-black">
          <Container>
            <div className="text-center py-16">
              <p className="text-red-600 dark:text-red-400 mb-6 text-lg font-medium">{error}</p>
              <Button onClick={() => window.location.reload()} size="lg">
                Try Again
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Featured Podcast */}
      {!loading && !error && podcasts.length > 0 && (
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
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
                    Featured Episode
                  </h2>
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                    Our latest and most popular conversation
                  </p>
                </div>
              </div>

              {/* Featured Podcast Card - Interactive */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-2xl cursor-pointer group"
                onClick={() => window.location.href = `/podcasts/${podcasts[0].id}`}
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
                      <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-1" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <Mic className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      <span className="px-3 py-1 bg-white/90 dark:bg-white text-black text-xs md:text-sm font-bold uppercase tracking-wider rounded-full">
                        Latest
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
                          <Clock className="w-4 h-4 md:w-5 md:h-5" />
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
          </Container>
        </section>
      )}

      {/* All Podcasts Grid */}
      {!loading && !error && podcasts.length > 0 && (
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
                All Episodes
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                Browse our complete collection of podcast episodes
              </p>
            </motion.div>

            {/* Podcasts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {podcasts.map((podcast, index) => (
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
          </Container>
        </section>
      )}

      {/* Empty State */}
      {!loading && !error && podcasts.length === 0 && (
        <section className="py-16 md:py-24 bg-white dark:bg-black">
          <Container>
            <div className="text-center py-16">
              <Headphones className="w-24 h-24 text-gray-300 dark:text-gray-700 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                No Podcasts Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Check back soon for our latest podcast episodes!
              </p>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
