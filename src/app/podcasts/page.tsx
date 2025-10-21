'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import AudioCard from '@/components/media/AudioCard';
import Button from '@/components/ui/Button';
import { Headphones, Play, Clock, Mic, TrendingUp, Users } from 'lucide-react';

// Mock data - replace with API call later
const mockPodcasts = [
  {
    id: '1',
    title: 'The Future of Web Development',
    description: 'Exploring the latest trends in modern web development, from server components to edge computing.',
    audioUrl: '/audio/podcast-1.mp3',
    duration: '45:30',
    publishedAt: '2025-01-15T10:00:00Z',
    category: 'Technology',
  },
  {
    id: '2',
    title: 'Building Scalable Applications',
    description: 'Deep dive into architecture patterns and best practices for building applications that scale.',
    audioUrl: '/audio/podcast-2.mp3',
    duration: '38:15',
    publishedAt: '2025-01-10T10:00:00Z',
    category: 'Development',
  },
  {
    id: '3',
    title: 'Design Systems That Work',
    description: 'Creating and maintaining design systems that teams actually use and love.',
    audioUrl: '/audio/podcast-3.mp3',
    duration: '52:00',
    publishedAt: '2025-01-05T10:00:00Z',
    category: 'Design',
  },
  {
    id: '4',
    title: 'AI in Content Creation',
    description: 'How artificial intelligence is transforming the way we create and consume content.',
    audioUrl: '/audio/podcast-4.mp3',
    duration: '41:20',
    publishedAt: '2025-01-02T10:00:00Z',
    category: 'AI',
  },
  {
    id: '5',
    title: 'Remote Work Revolution',
    description: 'The evolution of remote work and its impact on productivity and team culture.',
    audioUrl: '/audio/podcast-5.mp3',
    duration: '36:45',
    publishedAt: '2024-12-28T10:00:00Z',
    category: 'Work Culture',
  },
  {
    id: '6',
    title: 'The Art of Storytelling',
    description: 'Mastering narrative techniques to create compelling content that resonates with audiences.',
    audioUrl: '/audio/podcast-6.mp3',
    duration: '48:30',
    publishedAt: '2024-12-20T10:00:00Z',
    category: 'Content',
  },
];

const stats = [
  { icon: Play, label: 'Total Episodes', value: '50+' },
  { icon: Users, label: 'Active Listeners', value: '10K+' },
  { icon: Clock, label: 'Hours of Content', value: '40+' },
  { icon: TrendingUp, label: 'Growing', value: '150%' },
];

export default function PodcastsPage() {
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
              LittleText Podcasts
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

      {/* Featured Podcast */}
      {mockPodcasts.length > 0 && (
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

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <Mic className="w-8 h-8 text-black dark:text-white" />
                  <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold uppercase tracking-wider rounded-full">
                    Latest
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-4">
                  {mockPodcasts[0].title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl">
                  {mockPodcasts[0].description}
                </p>
                <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{mockPodcasts[0].duration}</span>
                  </div>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    {mockPodcasts[0].category}
                  </span>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* All Podcasts Grid */}
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
            {mockPodcasts.map((podcast, index) => (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AudioCard
                  title={podcast.title}
                  description={podcast.description}
                  audioUrl={podcast.audioUrl}
                  duration={podcast.duration}
                  publishedAt={podcast.publishedAt}
                  category={podcast.category}
                />
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {mockPodcasts.length === 0 && (
            <div className="text-center py-20">
              <Headphones className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                No podcasts available yet. Check back soon!
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
            <Headphones className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Never Miss an Episode
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
              Subscribe to get notified when we release new episodes and exclusive
              content.
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
