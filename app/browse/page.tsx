import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/utils/prismaClient";

export default async function BrowsePage() {
  const posts = await prisma.post.findMany({});
  return (
    <div className="mx-auto max-w-md md:max-w-2xl xl:max-w-4xl">
      <PostsGrid posts={posts} />
    </div>
  );
}
