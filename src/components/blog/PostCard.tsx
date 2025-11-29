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
  variant?: 'default' | 'hero' | 'explore';
}

/**
 * PostCard component displaying post preview
 * Design: White card with image, title, excerpt, and metadata
 * Variants:
 * - default: Standard horizontal layout (aspect-video image)
 * - hero: Portrait layout for hero stories (aspect-[4/5] image, less text)
 * - explore: Minimal layout with just image and title (aspect-video image)
 */
export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  const readTime = post.readTime || calculateReadTime(post.content);
  const imageUrl = post.featuredImage || post.bannerImage || '/placeholder-post.jpg';
  const isHeroVariant = variant === 'hero';
  const isExploreVariant = variant === 'explore';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/posts/${post.slug}`} className="block group">
        {isExploreVariant ? (
          // Explore variant - Separate image and title, no card
          <div className="space-y-4">
            {/* Image - Standalone with rounded corners */}
            <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-shadow">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            </div>
            
            {/* Title - Centered below image, no background */}
            <h3 className="text-base md:text-lg font-semibold text-black dark:text-white text-center line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors px-2">
              {post.title}
            </h3>
          </div>
        ) : (
          // Default and Hero variants - Card layout
          <Card hover padding="none" className="overflow-hidden h-full">
            {/* Featured Image - Portrait for Heroes, Landscape for Default */}
            <div className={`relative ${isHeroVariant ? 'aspect-[4/5]' : 'aspect-video'} bg-gray-200 dark:bg-gray-800 overflow-hidden`}>
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            </div>

            {/* Content - Condensed for Heroes, Full for Default */}
            <div className={isHeroVariant ? 'p-4' : 'p-6'}>
              {/* Category */}
              {post.category && (
                <span className="inline-block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                  {post.category.name}
                </span>
              )}

              {/* Title - Different sizes for each variant */}
              <h3 className={`${isHeroVariant ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} font-semibold text-black dark:text-white mb-2 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors`}>
                {post.title}
              </h3>

              {/* Excerpt */}
              {!isHeroVariant && (
                <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              
              {isHeroVariant && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Metadata - Compact for Heroes */}
              <div className={`flex items-center gap-3 ${isHeroVariant ? 'text-xs' : 'text-sm'} text-gray-500 dark:text-gray-500`}>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
                {!isHeroVariant && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{readTime} min read</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </Link>
    </motion.div>
  );
}
