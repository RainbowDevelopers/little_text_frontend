import React from 'react';

interface RichContentProps {
  content: string;
}

/**
 * RichContent component for rendering post content
 * Design: Max-width 700px for optimal readability, proper typography spacing
 */
export default function RichContent({ content }: RichContentProps) {
  return (
    <div
      className="prose prose-lg max-w-none"
      style={{
        maxWidth: '700px',
        margin: '0 auto',
      }}
    >
      <style jsx global>{`
        .prose {
          color: #000;
        }

        .dark .prose {
          color: #fff;
        }

        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: #111827;
        }

        .dark .prose p {
          color: #e5e7eb;
        }

        .prose h2 {
          font-size: 2rem;
          font-weight: 600;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          color: #000;
        }

        .dark .prose h2 {
          color: #fff;
        }

        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #000;
        }

        .dark .prose h3 {
          color: #fff;
        }

        .prose h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #000;
        }

        .dark .prose h4 {
          color: #fff;
        }

        .prose a {
          color: #000;
          text-decoration: underline;
          text-decoration-color: #9ca3af;
          text-underline-offset: 2px;
          transition: all 0.2s;
        }

        .dark .prose a {
          color: #fff;
          text-decoration-color: #6b7280;
        }

        .prose a:hover {
          text-decoration-color: #000;
        }

        .dark .prose a:hover {
          text-decoration-color: #fff;
        }

        .prose strong {
          font-weight: 600;
          color: #000;
        }

        .dark .prose strong {
          color: #fff;
        }

        .prose ul,
        .prose ol {
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .prose li {
          margin-bottom: 0.5rem;
          line-height: 1.8;
          color: #111827;
        }

        .dark .prose li {
          color: #e5e7eb;
        }

        .prose blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1.5rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          margin: 2rem 0;
          background-color: #f9fafb;
          font-style: italic;
          color: #4b5563;
        }

        .dark .prose blockquote {
          border-left-color: #374151;
          background-color: #1f2937;
          color: #9ca3af;
        }

        .prose code {
          background-color: #f3f4f6;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.875em;
          color: #111827;
        }

        .dark .prose code {
          background-color: #374151;
          color: #e5e7eb;
        }

        .prose pre {
          background-color: #111827;
          color: #fff;
          padding: 1.5rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 2rem 0;
        }

        .dark .prose pre {
          background-color: #1f2937;
        }

        .prose pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }

        .prose img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 2rem 0;
        }

        .prose hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 3rem 0;
        }

        .dark .prose hr {
          border-top-color: #374151;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
