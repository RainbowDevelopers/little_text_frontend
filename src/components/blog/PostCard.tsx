import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Post } from '@/lib/types';
import { formatDate, calculateReadTime } from '@/lib/utils';
import Card from '@/components/ui/Card';
import { Clock, Calendar } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

/**
 * PostCard component displaying post preview
 * Design: White card with image, title, excerpt, and metadata
 */
export default function PostCard({ post }: PostCardProps) {
  const readTime = post.readTime || calculateReadTime(post.content);
  const imageUrl = post.featuredImage || post.bannerImage || '/placeholder-post.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/posts/${post.slug}`} className="block group">
        <Card hover padding="none" className="overflow-hidden h-full">
          {/* Featured Image */}
          <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Category */}
            {post.category && (
              <span className="inline-block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
                {post.category.name}
              </span>
            )}

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-3 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
