// Server component — preloads metadata and blog posts at build time
import { getMeta } from '@/lib/getData';
import { getAllPosts } from '@/lib/blog-data';
import HomeContent from './page-content';

export default function Page() {
  const meta = getMeta();
  const blogPosts = getAllPosts();
  return <HomeContent meta={meta} blogPosts={blogPosts} />;
}
