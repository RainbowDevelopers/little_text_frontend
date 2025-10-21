'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import VideoCard from '@/components/media/VideoCard';
import Button from '@/components/ui/Button';
import { Video, Play, Eye, TrendingUp, Users, Film } from 'lucide-react';

// Mock data - replace with API call later
const mockVideos = [
  {
    id: '1',
    title: 'Introduction to Next.js 15',
    description: 'Learn the fundamentals of Next.js 15 and build your first modern web application.',
    thumbnailUrl: '/images/video-thumb-1.jpg',
    videoUrl: '/videos/video-1.mp4',
    duration: '25:30',
    publishedAt: '2025-01-18T10:00:00Z',
    category: 'Tutorial',
  },
  {
    id: '2',
    title: 'Mastering Tailwind CSS',
    description: 'Advanced techniques and tips for creating beautiful designs with Tailwind CSS.',
    thumbnailUrl: '/images/video-thumb-2.jpg',
    videoUrl: '/videos/video-2.mp4',
    duration: '32:45',
    publishedAt: '2025-01-12T10:00:00Z',
    category: 'Design',
  },
  {
    id: '3',
    title: 'TypeScript Best Practices',
    description: 'Write better, more maintainable TypeScript code with these proven best practices.',
    thumbnailUrl: '/images/video-thumb-3.jpg',
    videoUrl: '/videos/video-3.mp4',
    duration: '28:15',
    publishedAt: '2025-01-08T10:00:00Z',
    category: 'Development',
  },
  {
    id: '4',
    title: 'Building with React Server Components',
    description: 'Deep dive into React Server Components and how they change the way we build applications.',
    thumbnailUrl: '/images/video-thumb-4.jpg',
    videoUrl: '/videos/video-4.mp4',
    duration: '35:20',
    publishedAt: '2025-01-05T10:00:00Z',
    category: 'Tutorial',
  },
  {
    id: '5',
    title: 'API Design Principles',
    description: 'Learn how to design clean, scalable, and maintainable APIs for modern applications.',
    thumbnailUrl: '/images/video-thumb-5.jpg',
    videoUrl: '/videos/video-5.mp4',
    duration: '29:45',
    publishedAt: '2025-01-02T10:00:00Z',
    category: 'Backend',
  },
  {
    id: '6',
    title: 'Performance Optimization Techniques',
    description: 'Practical strategies to optimize your web applications for maximum performance.',
    thumbnailUrl: '/images/video-thumb-6.jpg',
    videoUrl: '/videos/video-6.mp4',
    duration: '42:10',
    publishedAt: '2024-12-28T10:00:00Z',
    category: 'Performance',
  },
];

const stats = [
  { icon: Play, label: 'Total Videos', value: '100+' },
  { icon: Eye, label: 'Total Views', value: '50K+' },
  { icon: Users, label: 'Subscribers', value: '5K+' },
  { icon: TrendingUp, label: 'Growing', value: '180%' },
];

export default function VideosPage() {
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

      {/* Featured Video */}
      {mockVideos.length > 0 && (
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

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <Film className="w-8 h-8 text-black dark:text-white" />
                  <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold uppercase tracking-wider rounded-full">
                    Latest
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-4">
                  {mockVideos[0].title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl">
                  {mockVideos[0].description}
                </p>
                <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    <span>{mockVideos[0].duration}</span>
                  </div>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    {mockVideos[0].category}
                  </span>
                </div>
              </div>
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
            {mockVideos.map((video, index) => (
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
                  duration={video.duration}
                  publishedAt={video.publishedAt}
                  category={video.category}
                />
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {mockVideos.length === 0 && (
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
            <Video className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
              Subscribe to get notified when we publish new video tutorials and
              exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="secondary" size="lg">
                Subscribe Now
              </Button>
              <Button href="/posts" size="lg">
                Read Articles
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
