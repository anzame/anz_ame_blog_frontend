import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'プロフィール',
};

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/username' },
  { name: 'X (Twitter)', url: 'https://x.com/username' },
];

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-8">About</h1>

      <section className="mb-12">
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          こんにちは。Web開発に興味があるエンジニアです。
          このブログでは、日々の学びや技術メモを発信しています。
        </p>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
          {/* TODO: 自己紹介文をここに追記 */}
          好きな技術: TypeScript / Next.js / Spring Boot
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Links</h2>
        <ul className="space-y-2">
          {socialLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
