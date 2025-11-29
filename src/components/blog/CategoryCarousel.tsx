'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Post } from '@/lib/types';
import PostCard from './PostCard';

interface CategoryCarouselProps {
  posts: Post[];
  categorySlug?: string;
}

export default function CategoryCarousel({ posts, categorySlug }: CategoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHeroesCategory = categorySlug === 'heroes';
  const isExploreCategory = categorySlug === 'explore';

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="relative group">
      {/* Navigation Buttons */}
      {posts.length > 3 && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-black dark:text-white" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-black dark:text-white" />
          </button>
        </>
      )}

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <PostCard 
              post={post} 
              variant={
                isExploreCategory ? 'explore' : 
                isHeroesCategory ? 'hero' : 
                'default'
              } 
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
