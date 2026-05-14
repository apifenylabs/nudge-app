import { getMeta, getHomepageData } from '@/lib/getData';
import { getAllPosts } from '@/lib/blog-data';
import HomeContent from './page-content';

export default function Page() {
  const meta = getMeta();
  const homepageData = getHomepageData();
  const posts = getAllPosts().slice(0, 6);
  return <HomeContent meta={meta} homepageData={homepageData} blogPosts={posts} />;
}
