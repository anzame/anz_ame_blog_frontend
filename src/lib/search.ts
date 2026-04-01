import Fuse from 'fuse.js';
import type { PostMeta } from '@/types/post';

export function createSearchIndex(posts: PostMeta[]) {
  return new Fuse(posts, {
    keys: ['title', 'description', 'tags'],
    threshold: 0.3,
  });
}
