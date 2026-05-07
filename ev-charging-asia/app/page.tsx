import { getMeta, getAllStations } from '@/lib/getData';
import { getAllPosts } from '@/lib/blog-data';
import HomeContent from './page-content';

export default function Page() {
  const meta = getMeta();
  const stations = getAllStations();
  const posts = getAllPosts();
  return <HomeContent meta={meta} stations={stations} blogPosts={posts} />;
}
