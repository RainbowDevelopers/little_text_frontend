'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import { Video as VideoIcon, ArrowLeft, Calendar, Tag } from 'lucide-react';
import { videosAPI } from '@/lib/api';
import { Video } from '@/lib/types';

export default function VideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideo() {
      try {
        setLoading(true);
        const id = params.id as string;
        const data = await videosAPI.getById(id);
        setVideo(data);
      } catch (err) {
        console.error('Error loading video:', err);
        setError('Failed to load video');
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadVideo();
    }
  }, [params.id]);

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-black dark:border-white"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">Loading video...</p>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <Container>
          <div className="text-center py-20">
            <VideoIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              {error || 'Video not found'}
            </p>
            <Button onClick={() => router.push('/videos')}>
              Back to Videos
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(video.videoUrl);

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      {/* Back Button */}
      <section className="py-6">
        <Container>
          <button
            onClick={() => router.push('/videos')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Videos</span>
          </button>
        </Container>
      </section>

      {/* Video Player Section */}
      <section className="py-12 md:py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-8 shadow-2xl">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <p className="text-white">Unable to load video</p>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="space-y-6">
              {/* Category & Duration */}
              <div className="flex flex-wrap items-center gap-3">
                {video.category && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      {video.category.name}
                    </span>
                  </div>
                )}
                {video.duration && (
                  <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {video.duration}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(video.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight">
                {video.title}
              </h1>

              {/* Description */}
              {video.description && (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                    {video.description}
                  </p>
                </div>
              )}

              {/* Watch on YouTube Button */}
              <div className="pt-6">
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <VideoIcon className="w-5 h-5" />
                  Watch on YouTube
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-800" />

      {/* More Videos CTA */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <VideoIcon className="w-12 h-12 text-black dark:text-white mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
              Explore More Videos
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Discover more tutorials and insights to help you build better applications
            </p>
            <Button href="/videos" size="lg">
              View All Videos
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
