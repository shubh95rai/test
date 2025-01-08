import { getSessionEmail } from "@/actions/actions";
import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/utils/prismaClient";

export default async function ProfilePage() {
  const sessionEmail = await getSessionEmail();

  const posts = await prisma.post.findMany({
    where: {
      author: sessionEmail,
    },
  });

  return (
    <div className="mt-4">
      <PostsGrid posts={posts} />
    </div>
  );
}
