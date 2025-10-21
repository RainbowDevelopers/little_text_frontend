import React from 'react';
import { Post } from '@/lib/types';
import PostCard from './PostCard';

interface PostGridProps {
  posts: Post[];
  columns?: 2 | 3;
}

/**
 * PostGrid component displaying posts in a responsive grid
 * Design: 3 columns on desktop, 2 on tablet, 1 on mobile
 */
export default function PostGrid({ posts, columns = 3 }: PostGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6 md:gap-8`}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
