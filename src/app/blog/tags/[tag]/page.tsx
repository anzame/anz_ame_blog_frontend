import { Suspense } from 'react';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { PostList } from '@/components/PostList';

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getAllPosts();
  const allTags = getAllTags();

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-8">Tag: {decodedTag}</h1>
      <Suspense>
        <PostList posts={posts} allTags={allTags} activeTag={decodedTag} />
      </Suspense>
    </main>
  );
}
