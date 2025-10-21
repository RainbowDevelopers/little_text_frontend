'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';

interface AudioCardProps {
  title: string;
  description: string;
  audioUrl: string;
  duration?: string;
  publishedAt: string;
  category?: string;
}

/**
 * AudioCard component for podcast episodes
 * Includes custom audio player with play/pause controls
 */
export default function AudioCard({
  title,
  description,
  audioUrl,
  duration,
  publishedAt,
  category,
}: AudioCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Card hover padding="lg" className="h-full">
      <div className="space-y-4">
        {/* Category */}
        {category && (
          <span className="inline-block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            {category}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-black dark:text-white line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-3">
          {description}
        </p>

        {/* Audio Player */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-dark dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 text-white hover:bg-gradient-subtle transition-all hover:scale-105 shadow-md"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            {/* Audio Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Volume2 className="w-4 h-4" />
                  Audio
                </span>
                {duration && <span>{duration}</span>}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {formatDate(publishedAt)}
              </p>
            </div>
          </div>

          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        </div>
      </div>
    </Card>
  );
}
