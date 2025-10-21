'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Container from '@/components/layout/Container';
import PostHero from '@/components/blog/PostHero';
import RichContent from '@/components/blog/RichContent';
import PostGrid from '@/components/blog/PostGrid';
import Button from '@/components/ui/Button';
import { Post } from '@/lib/types';
import { postsAPI } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SinglePostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const postData = await postsAPI.getBySlug(slug);
        setPost(postData);

        // Load related posts
        try {
          const related = await postsAPI.getRelated(postData.id, 3);
          setRelatedPosts(related);
        } catch (err) {
          console.error('Error loading related posts:', err);
        }
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24">
        <Container>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            <p className="mt-4 text-gray-600">Loading article...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="py-24">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button href="/posts" icon={<ArrowLeft className="w-5 h-5" />}>
              Back to Articles
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <article>
      {/* Back Link */}
      <div className="py-8 border-b border-gray-200">
        <Container>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </Container>
      </div>

      {/* Post Hero */}
      <div className="py-12 md:py-16">
        <Container size="narrow">
          <PostHero post={post} />
        </Container>
      </div>

      {/* Post Content */}
      <div className="py-8 md:py-12">
        <Container size="narrow">
          <RichContent content={post.content} />
        </Container>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="py-8 border-t border-gray-200">
          <Container size="narrow">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <Container>
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Related Articles
                </h2>
                <p className="text-lg text-gray-600">
                  Continue exploring similar stories
                </p>
              </div>
              <PostGrid posts={relatedPosts} columns={3} />
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
