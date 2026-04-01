import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

const featuredWorks = [
  {
    title: '個人技術ブログ',
    description: 'Next.js + Tailwind CSS で構築した技術ブログ。',
    url: 'https://github.com/username/blog',
  },
  {
    title: 'サンプルプロジェクト',
    description: 'ここに作品の説明を書きます。',
    url: 'https://github.com/username/sample',
  },
];

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <main className="max-w-2xl mx-auto px-4 py-20">
      {/* Hero */}
      <section className="mb-20">
        <h1 className="text-3xl font-bold tracking-tight">naoino</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
          Web開発が好きなエンジニア。技術メモや学びを発信しています。
        </p>
      </section>

      {/* Recent Posts */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
          <Link href="/blog" className="text-sm text-gray-500 hover:underline">
            View all &rarr;
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <p className="text-gray-500 text-sm">記事がありません。</p>
        ) : (
          <ul className="space-y-6">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <time className="text-sm text-gray-500">{post.date}</time>
                  <h3 className="font-medium mt-0.5 group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {post.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Featured Works */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Featured Works</h2>
          <Link href="/works" className="text-sm text-gray-500 hover:underline">
            View all &rarr;
          </Link>
        </div>
        <div className="space-y-4">
          {featuredWorks.map((work) => (
            <a
              key={work.title}
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <h3 className="font-medium">{work.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {work.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
