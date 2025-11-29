import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Calendar } from 'lucide-react';
import Card from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  videoUrl: string;
  duration?: string;
  publishedAt: string;
  category?: string;
}

/**
 * VideoCard component for video listings
 * Displays thumbnail with play icon overlay
 */
export default function VideoCard({
  id,
  title,
  description,
  thumbnailUrl,
  videoUrl,
  duration,
  publishedAt,
  category,
}: VideoCardProps) {
  // Generate a placeholder using the video title or use a YouTube thumbnail if available
  const getVideoThumbnail = () => {
    if (thumbnailUrl) return thumbnailUrl;
    
    // If videoUrl contains a YouTube video ID, try to get the thumbnail
    if (videoUrl) {
      // Extract YouTube video ID from various YouTube URL formats
      const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/;
      const match = videoUrl.match(youtubeRegex);
      if (match && match[1]) {
        return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
      }
    }
    
    // Fallback to a gray placeholder
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZDFkNWRiIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvbWluZyBTb29uPC90ZXh0Pjwvc3ZnPg==';
  };
  
  return (
    <Link href={`/videos/${id}`} className="block group">
      <Card hover padding="none" className="overflow-hidden h-full">
        {/* Thumbnail with Play Overlay */}
        <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
          <Image
            src={getVideoThumbnail()}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 dark:bg-black/40 dark:group-hover:bg-black/50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-white/95 dark:bg-gray-900/95 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Play className="w-8 h-8 text-black dark:text-white ml-1" />
            </div>
          </div>

          {/* Duration Badge */}
          {duration && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 dark:bg-black/90 text-white text-xs font-semibold rounded">
              {duration}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          {category && (
            <span className="inline-block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
              {category}
            </span>
          )}

          {/* Title */}
          <h3 className="text-xl font-semibold text-black dark:text-white mb-3 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {description}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
