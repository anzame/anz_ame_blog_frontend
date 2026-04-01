import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Works',
  description: 'ポートフォリオ・作品紹介',
};

type Work = {
  title: string;
  description: string;
  url: string;
  tags: string[];
};

const works: Work[] = [
  {
    title: '個人技術ブログ',
    description: 'Next.js + Tailwind CSS で構築した技術ブログ。Markdownで記事管理、Fuse.jsで全文検索。',
    url: 'https://github.com/username/blog',
    tags: ['Next.js', 'TypeScript'],
  },
  {
    title: 'サンプルプロジェクト',
    description: 'ここに作品の説明を書きます。',
    url: 'https://github.com/username/sample',
    tags: ['Spring Boot', 'Java'],
  },
];

export default function WorksPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-8">Works</h1>

      <div className="space-y-6">
        {works.map((work) => (
          <a
            key={work.title}
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <h2 className="font-semibold">{work.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {work.description}
            </p>
            <div className="flex gap-2 mt-3">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
