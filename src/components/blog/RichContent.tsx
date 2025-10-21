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
          color: var(--color-black);
        }

        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: var(--color-gray-900);
        }

        .prose h2 {
          font-size: 2rem;
          font-weight: 600;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          color: var(--color-black);
        }

        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: var(--color-black);
        }

        .prose h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--color-black);
        }

        .prose a {
          color: var(--color-black);
          text-decoration: underline;
          text-decoration-color: var(--color-gray-400);
          text-underline-offset: 2px;
          transition: all 0.2s;
        }

        .prose a:hover {
          text-decoration-color: var(--color-black);
        }

        .prose strong {
          font-weight: 600;
          color: var(--color-black);
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
        }

        .prose blockquote {
          border-left: 4px solid var(--color-gray-200);
          padding-left: 1.5rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          margin: 2rem 0;
          background-color: var(--color-gray-50);
          font-style: italic;
          color: var(--color-gray-600);
        }

        .prose code {
          background-color: var(--color-gray-100);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.875em;
          color: var(--color-gray-900);
        }

        .prose pre {
          background-color: var(--color-gray-900);
          color: var(--color-white);
          padding: 1.5rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 2rem 0;
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
          border-top: 1px solid var(--color-gray-200);
          margin: 3rem 0;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
