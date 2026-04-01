'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Fuse from 'fuse.js';
import type { PostMeta } from '@/types/post';

type Props = {
  posts: PostMeta[];
  allTags: string[];
  activeTag?: string;
};

export function PostList({ posts, allTags, activeTag: initialTag }: Props) {
  const searchParams = useSearchParams();
  const activeTag = initialTag ?? searchParams.get('tag');
  const [query, setQuery] = useState('');

  const tagFiltered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  const fuse = useMemo(
    () =>
      new Fuse(tagFiltered, {
        keys: ['title', 'description', 'tags'],
        threshold: 0.3,
      }),
    [tagFiltered],
  );

  const results = query
    ? fuse.search(query).map((r) => r.item)
    : tagFiltered;

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="記事を検索..."
        className="w-full px-3 py-2 mb-6 border border-gray-200 dark:border-gray-700 rounded bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
      />

      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/blog"
          className={`text-xs px-2 py-1 rounded ${
            !activeTag
              ? 'bg-foreground text-background'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All
        </Link>
        {allTags.map((tag) => (
          <Link
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className={`text-xs px-2 py-1 rounded ${
              activeTag === tag
                ? 'bg-foreground text-background'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tag}
          </Link>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="text-gray-500">記事がありません。</p>
      ) : (
        <ul className="space-y-8">
          {results.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <time className="text-sm text-gray-500">{post.date}</time>
                <h2 className="text-lg font-semibold mt-1 group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
