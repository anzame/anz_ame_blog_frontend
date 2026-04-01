export type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  content: string;
};

export type PostMeta = Omit<Post, 'content'>;
