import { Suspense } from 'react';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { PostList } from '@/components/PostList';

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = getAllTags();

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-8">Blog</h1>
      <Suspense>
        <PostList posts={posts} allTags={allTags} />
      </Suspense>
    </main>
  );
}
