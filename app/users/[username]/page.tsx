import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/utils/prismaClient";

type Params = Promise<{ username: string }>;

export default async function UserProfilePage({ params }: { params: Params }) {
  const { username } = await params;

  const profile = await prisma.profile.findFirstOrThrow({
    where: {
      username,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      author: profile.email,
    },
  });

  return (
    <div className="mt-4">
      <PostsGrid posts={posts} />
    </div>
  );
}
