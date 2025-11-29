'use client';
     
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Clock, Calendar, User } from 'lucide-react';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import { Podcast } from '@/lib/types';
import { podcastsAPI } from '@/lib/api';
import { formatDate } from '@/lib/utils';

export default function PodcastDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    async function loadPodcast() {
      try {
        setLoading(true);
        const podcastData = await podcastsAPI.getBySlug(slug);
        setPodcast(podcastData);
      } catch (err) {
        console.error('Error loading podcast:', err);
        setError('Podcast not found');
      } finally {
        setLoading(false);
      }
    }

    loadPodcast();
  }, [slug]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setAudioDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      if (audio) {
        audio.pause();
      }
    };
  }, [podcast]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = x / width;
    audio.currentTime = percentage * audio.duration;
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = audioDuration > 0 ? (currentTime / audioDuration) * 100 : 0;

  if (loading) {
    return (
      <div className="py-24">
        <Container>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading podcast...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !podcast) {
    return (
      <div className="py-24">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Podcast Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The podcast you're looking for doesn't exist or has been removed.
            </p>
            <Button href="/podcasts" icon={<ArrowLeft className="w-5 h-5" />}>
              Back to Podcasts
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Convert /uploads/podcasts/file.mp3 to /api/v1/restapi/stream/podcasts/file.mp3
  let fullAudioUrl = podcast.audioUrl;
  if (!podcast.audioUrl.startsWith('http')) {
    const parts = podcast.audioUrl.replace('/uploads/', '').split('/');
    fullAudioUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/v1/restapi/stream/${parts[0]}/${parts[1]}`;
  }

  return (
    <article className="bg-white dark:bg-black">
      {/* Back Link */}
      <div className="pt-12 pb-8">
        <Container>
          <Link
            href="/podcasts"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Podcasts
          </Link>
        </Container>
      </div>

      {/* Podcast Header */}
      <section className="py-12 md:py-16">
        <Container size="default">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Category */}
            {podcast.category && (
              <div className="text-center">
                <span className="inline-block text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  {podcast.category.name}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white text-center leading-tight">
              {podcast.title}
            </h1>

            {/* Author and Metadata */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm md:text-base text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium text-black dark:text-white">{podcast.author.name}</span>
              </div>
              <span className="text-gray-400 dark:text-gray-600">•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={podcast.publishedAt}>
                  {formatDate(podcast.publishedAt)}
                </time>
              </div>
              {podcast.duration && (
                <>
                  <span className="text-gray-400 dark:text-gray-600">•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(podcast.duration)}</span>
                  </div>
                </>
              )}
            </div>

            {/* Banner Image */}
            {podcast.bannerImage && (
              <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg">
                <Image
                  src={podcast.bannerImage}
                  alt={podcast.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            )}

            {/* Audio Player */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 md:p-8 space-y-4 shadow-lg">
              <div className="flex items-center gap-4">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 
transition-all hover:scale-105 shadow-lg flex-shrink-0"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7" fill="currentColor" />
                  ) : (
                    <Play className="w-7 h-7 ml-1" fill="currentColor" />
                  )}
                </button>

                {/* Time and Progress */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{formatTime(currentTime)}</span>
                    <span className="font-medium">{formatTime(audioDuration || podcast.duration || 0)}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div 
                    className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer overflow-hidden group"
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="h-full bg-black dark:bg-white transition-all group-hover:bg-gray-700 dark:group-hover:bg-gray-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Volume Control */}
                <button
                  onClick={toggleMute}
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors p-2"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Hidden audio element */}
              <audio
                ref={audioRef}
                src={fullAudioUrl}
                preload="metadata"
                className="hidden"
              />
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {podcast.description}
              </p>
            </div>

            {/* Episode Info */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 md:p-8 space-y-4">
              <h2 className="text-2xl font-bold text-black dark:text-white">Episode Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Host</p>
                  <p className="font-semibold text-black dark:text-white">{podcast.author.name}</p>
                </div>
                {podcast.category && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Category</p>
                    <p className="font-semibold text-black dark:text-white">{podcast.category.name}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Published</p>
                  <p className="font-semibold text-black dark:text-white">{formatDate(podcast.publishedAt)}</p>
                </div>
                {podcast.duration && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Duration</p>
                    <p className="font-semibold text-black dark:text-white">{formatTime(podcast.duration)}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </article>
  );
}