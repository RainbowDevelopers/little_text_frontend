import React from 'react';
import Image from 'next/image';
import { Post } from '@/lib/types';
import { formatDate, calculateReadTime } from '@/lib/utils';
import { Clock, Calendar, User } from 'lucide-react';

interface PostHeroProps {
  post: Post;
}

/**
 * PostHero component for single post page
 * Design: Large featured image, title, author info, and metadata
 */
export default function PostHero({ post }: PostHeroProps) {
  const readTime = post.readTime || calculateReadTime(post.content);
  const imageUrl = post.bannerImage || post.featuredImage;

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Category */}
      {post.category && (
        <div className="text-center">
          <span className="inline-block text-sm font-semibold text-gray-600 uppercase tracking-wider">
            {post.category.name}
          </span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center leading-tight max-w-4xl mx-auto">
        {post.title}
      </h1>

      {/* Author and Metadata */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm md:text-base text-gray-600">
        {/* Author */}
        <div className="flex items-center gap-2">
          {post.author.avatar ? (
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          )}
          <span className="font-medium text-black">{post.author.name}</span>
        </div>

        <span className="text-gray-400">•</span>

        {/* Published Date */}
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>

        <span className="text-gray-400">•</span>

        {/* Read Time */}
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{readTime} min read</span>
        </div>
      </div>

      {/* Featured Image */}
      {imageUrl && (
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      )}
    </div>
  );
}
