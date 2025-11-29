'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Post } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface FeaturedHeroProps {
  posts: Post[];
}

/**
 * FeaturedHero component - Hero section with large carousel and thumbnail navigation
 * Features: Large image carousel, thumbnail scroll, click to change, smooth transitions
 */
export default function FeaturedHero({ posts }: FeaturedHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!posts || posts.length === 0) return null;

  const activePost = posts[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % posts.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const scrollToThumbnail = (index: number) => {
    const element = document.getElementById(`thumbnail-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    scrollToThumbnail(index);
  };

  return (
    <section className="relative bg-black dark:bg-black">
      <div className="max-w-[1920px] mx-auto">
        {/* Main Carousel */}
        <div className="relative aspect-[21/9] lg:aspect-[21/8] overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <Image
                src={activePost.featuredImage || activePost.bannerImage}
                alt={activePost.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-end">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-20 lg:pb-24">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-3xl"
                  >
                    {/* Category */}
                    {activePost.category && (
                      <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-semibold uppercase tracking-wider rounded-full mb-4">
                        {activePost.category.name}
                      </span>
                    )}

                    {/* Title - Clickable */}
                    <Link href={`/posts/${activePost.slug}`}>
                      <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight hover:text-gray-200 transition-colors cursor-pointer">
                        {activePost.title}
                      </h1>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 line-clamp-2 md:line-clamp-3">
                      {activePost.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-6 text-sm md:text-base text-gray-300">
                      <span>{formatDate(activePost.publishedAt)}</span>
                      {activePost.readTime && (
                        <>
                          <span>•</span>
                          <span>{activePost.readTime} min read</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {posts.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
              </button>
            </>
          )}

          {/* Slide Indicators */}
          {posts.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 md:hidden">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {posts.length > 1 && (
          <div className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-12">
              {/* Section Header */}
              <div className="mb-6">
                <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Featured Stories
                </p>
              </div>

              <div className="relative">
                {/* Scroll Container */}
                <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4">
                  {posts.map((post, index) => (
                    <button
                      key={post.id}
                      id={`thumbnail-${index}`}
                      onClick={() => handleThumbnailClick(index)}
                      className="flex-shrink-0 group snap-start focus:outline-none"
                    >
                      <div className={`relative transition-all duration-500 ${
                        index === activeIndex ? 'scale-100' : 'scale-95 opacity-50 hover:opacity-75 hover:scale-100'
                      }`}>
                        {/* Card Container */}
                        <div className="relative w-56 md:w-64 lg:w-72">
                          {/* Image Container */}
                          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                            <Image
                              src={post.featuredImage || post.bannerImage}
                              alt={post.title}
                              fill
                              className={`object-cover transition-all duration-500 ${
                                index === activeIndex 
                                  ? 'scale-100' 
                                  : 'scale-110 grayscale group-hover:scale-105 group-hover:grayscale-0'
                              }`}
                              sizes="(max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                            />
                            
                            {/* Active indicator - corner ribbon */}
                            {index === activeIndex && (
                              <div className="absolute top-0 right-0">
                                <div className="relative">
                                  <div className="absolute top-4 right-4 w-3 h-3 bg-white dark:bg-black rounded-full border-2 border-black dark:border-white animate-pulse shadow-lg" />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="space-y-2 px-1">
                            {/* Category Badge */}
                            {post.category && (
                              <span className={`inline-block text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors duration-300 ${
                                index === activeIndex
                                  ? 'bg-black dark:bg-white text-white dark:text-black'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                              }`}>
                                {post.category.name}
                              </span>
                            )}

                            {/* Title */}
                            <h3 className={`text-sm md:text-base font-bold line-clamp-2 leading-tight transition-colors duration-300 ${
                              index === activeIndex
                                ? 'text-black dark:text-white'
                                : 'text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'
                            }`}>
                              {post.title}
                            </h3>

                            {/* Progress indicator */}
                            <div className="pt-2">
                              <div className={`h-1 rounded-full transition-all duration-500 ${
                                index === activeIndex 
                                  ? 'w-full bg-black dark:bg-white shadow-lg' 
                                  : 'w-0 bg-gray-200 dark:bg-gray-700 group-hover:w-1/3'
                              }`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation Hint - Desktop */}
                <div className="hidden lg:flex items-center justify-center gap-2 mt-8 text-xs text-gray-400 dark:text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-0.5 bg-gray-300 dark:bg-gray-700 rounded" />
                    <span>Scroll to explore</span>
                    <div className="w-5 h-0.5 bg-gray-300 dark:bg-gray-700 rounded" />
                  </div>
                </div>

                {/* Scroll Progress Indicators - Mobile/Tablet */}
                <div className="flex justify-center gap-2 mt-8 lg:hidden">
                  {posts.map((post, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? 'w-8 bg-black dark:bg-white'
                          : 'w-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
