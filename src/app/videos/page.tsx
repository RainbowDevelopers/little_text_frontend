'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import VideoCard from '@/components/media/VideoCard';
import Button from '@/components/ui/Button';
import { Video, Play, Eye, Film } from 'lucide-react';
import { videosAPI } from '@/lib/api';
import { Video as VideoType } from '@/lib/types';

// Helper function to format duration from seconds to MM:SS format
function formatDuration(seconds?: number): string | undefined {
  if (!seconds || seconds <= 0) return undefined;
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true);
        const response = await videosAPI.getAll(1, 20);
        setVideos(response.data);
      } catch (err) {
        console.error('Error loading videos:', err);
        setError('Failed to load videos');
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
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
              <Video className="w-12 h-12 text-black dark:text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6 leading-tight"
            >
              Video Tutorials
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8"
            >
              Watch in-depth tutorials, insights, and deep dives into modern web
              development.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto"
            >
              Learn from comprehensive video tutorials covering the latest
              technologies, best practices, and real-world projects.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Featured Video */}
      {!loading && videos.length > 0 && (
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
                    Featured Video
                  </h2>
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                    Our latest and most popular tutorial
                  </p>
                </div>
              </div>

              {/* Featured Video Card - Interactive */}
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
                      <Film className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      <span className="px-3 py-1 bg-white/90 dark:bg-white text-black text-xs md:text-sm font-bold uppercase tracking-wider rounded-full">
                        Latest
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
          </Container>
        </section>
      )}

      {/* All Videos Grid */}
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
              All Videos
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
              Browse our complete collection of video tutorials
            </p>
          </motion.div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {videos.map((video, index) => (
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
                  duration={formatDuration(video.duration)}
                  publishedAt={video.publishedAt}
                  category={video.category?.name}
                />
              </motion.div>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-black dark:border-white"></div>
              <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">Loading videos...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <Video className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && videos.length === 0 && (
            <div className="text-center py-20">
              <Video className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                No videos available yet. Check back soon!
              </p>
              <Button href="/">Back to Home</Button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
