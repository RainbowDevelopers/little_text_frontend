'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';

interface AudioCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  audioUrl: string;
  duration?: string;
  publishedAt: string;
  category?: string;
}

// Global audio instance to ensure only one plays at a time
let globalAudioInstance: HTMLAudioElement | null = null;
let globalSetIsPlaying: ((playing: boolean) => void) | null = null;

/**
 * AudioCard component for podcast episodes
 * Features: Play/Pause, Progress bar, Volume control, Single playback
 */
export default function AudioCard({
  id,
  slug,
  title,
  description,
  audioUrl,
  duration,
  publishedAt,
  category,
}: AudioCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setAudioDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error('Audio playback error:', {
        title,
        audioUrl,
        fullAudioUrl,
        error: (e.target as HTMLAudioElement).error
      });
      setIsPlaying(false);
    };
    const handleLoadStart = () => {
      console.log('Audio loading started:', fullAudioUrl);
    };
    const handleCanPlay = () => {
      console.log('Audio can play:', fullAudioUrl);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Stop any other playing audio
    if (globalAudioInstance && globalAudioInstance !== audio) {
      globalAudioInstance.pause();
      globalAudioInstance.currentTime = 0;
      if (globalSetIsPlaying) {
        globalSetIsPlaying(false);
      }
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        console.log('Attempting to play audio:', fullAudioUrl);
        await audio.play();
        setIsPlaying(true);
        globalAudioInstance = audio;
        globalSetIsPlaying = setIsPlaying;
      } catch (error) {
        console.error('Error playing audio:', error);
        alert(`Failed to play audio. Error: ${error}`);
        setIsPlaying(false);
      }
    }
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

  // Convert relative audio URL to streaming URL
  // Convert /uploads/podcasts/file.mp3 to http://localhost:8000/api/v1/restapi/stream/podcasts/file.mp3
  const getAudioUrl = () => {
    if (!audioUrl) return '';
    
    // If already a full URL, return as is
    if (audioUrl.startsWith('http')) {
      return audioUrl;
    }
    
    // Extract type and filename from /uploads/podcasts/file.mp3
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1/restapi';
    const urlWithoutUploads = audioUrl.replace(/^\/uploads\//, '');
    const parts = urlWithoutUploads.split('/');
    
    if (parts.length >= 2) {
      const type = parts[0]; // 'podcasts'
      const filename = parts.slice(1).join('/'); // 'file.mp3'
      return `${apiBase}/stream/${type}/${filename}`;
    }
    
    return audioUrl;
  };

  const fullAudioUrl = getAudioUrl();

  // Debug logging
  useEffect(() => {
    console.log('AudioCard Debug:', {
      originalAudioUrl: audioUrl,
      fullAudioUrl,
      title
    });
  }, [audioUrl, fullAudioUrl, title]);

  return (
    <Card hover padding="lg" className="h-full">
      <div className="space-y-4">
        {/* Category */}
        {category && (
          <span className="inline-block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            {category}
          </span>
        )}

        {/* Title - Clickable */}
        <Link href={`/podcasts/${slug}`}>
          <h3 className="text-xl font-semibold text-black dark:text-white line-clamp-2 leading-tight hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-3">
          {description}
        </p>

        {/* Audio Player */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-all hover:scale-105 shadow-md flex-shrink-0"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
              )}
            </button>

            {/* Time Display */}
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{duration || formatTime(audioDuration)}</span>
              </div>
              
              {/* Progress Bar */}
              <div 
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer overflow-hidden group"
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
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Date */}
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {formatDate(publishedAt)}
          </p>

          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            src={fullAudioUrl}
            preload="metadata"
            className="hidden"
            crossOrigin="anonymous"
          />
        </div>
      </div>
    </Card>
  );
}
