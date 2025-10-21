import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Post } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';

interface HeroCardProps {
  post: Post;
}

/**
 * HeroCard - Large featured card for hero stories
 * Full-width with large image and prominent text
 */
export default function HeroCard({ post }: HeroCardProps) {
  const imageUrl = post.bannerImage || post.featuredImage || '/placeholder-hero.jpg';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/posts/${post.slug}`} className="block group">
        <div className="relative overflow-hidden rounded-2xl bg-black dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300">
          {/* Background Image with Overlay */}
          <div className="relative h-[500px] md:h-[600px] w-full">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="100vw"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            {/* Category Badge */}
            {post.category && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block px-4 py-1 bg-white dark:bg-gray-800/20 backdrop-blur-sm text-white text-sm font-semibold uppercase tracking-wider rounded-full mb-4"
              >
                {post.category.name}
              </motion.span>
            )}

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-gray-200 transition-colors"
            >
              {post.title}
            </motion.h2>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 line-clamp-2 max-w-3xl"
            >
              {post.excerpt}
            </motion.p>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-6 text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt} className="text-sm">
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{post.readTime} min read</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
