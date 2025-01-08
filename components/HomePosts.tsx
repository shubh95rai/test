import { prisma } from "@/utils/prismaClient";
import { Profile } from "@prisma/client";
import Image from "next/image";
import LikesInfo from "./LikesInfo";
import BookmarkInfo from "./BookmarkInfo";
import Avatar from "./Avatar";
import { getSessionEmail } from "@/actions/actions";
import Link from "next/link";

export default async function HomePosts({
  followedProfiles,
}: {
  followedProfiles: Profile[];
}) {
  const posts = await prisma.post.findMany({
    where: {
      author: {
        in: followedProfiles.map((f) => {
          return f.email;
        }),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

  const myLikes = await prisma.like.findMany({
    where: {
      author: await getSessionEmail(),
      postId: {
        in: posts.map((p) => {
          return p.id;
        }),
      },
    },
  });

  const myBookmarks = await prisma.bookmark.findMany({
    where: {
      author: await getSessionEmail(),
      postId: {
        in: posts.map((p) => {
          return p.id;
        }),
      },
    },
  });

  return (
    <div className="mt-8 flex flex-col gap-8 border-t border-gray-300 pt-8">
      {posts.length > 0 ? (
        posts.map((post) => {
          const profile = followedProfiles.find((f) => {
            return post.author === f.email;
          });

          return (
            <div
              key={post.id}
              className="mx-auto flex max-w-lg flex-col justify-between gap-4 rounded-md bg-gray-100 p-4 shadow dark:bg-neutral-800"
            >
              <section className="flex items-center gap-2">
                <Avatar src={profile?.avatar || ""} size="size-10" />
                <p className="font-semibold">{profile?.username}</p>
              </section>

              <section className="flex aspect-square size-full items-center">
                <Link href={`/posts/${post.id}`} className="size-full">
                  <Image
                    src={post.image}
                    alt="image"
                    width={500}
                    height={500}
                    className="size-full object-contain"
                    priority
                  />
                </Link>
              </section>

              <section className="flex justify-between border-t border-gray-300 pt-4">
                <LikesInfo
                  post={post}
                  sessionLike={
                    myLikes.find((like) => {
                      return like.postId === post.id;
                    }) || null
                  }
                />
                <BookmarkInfo
                  post={post}
                  sessionBookmark={
                    myBookmarks.find((like) => {
                      return like.postId === post.id;
                    }) || null
                  }
                />
              </section>

              <section className="flex gap-2">
                <p className="font-semibold">{profile?.username}</p>
                <p>{post.description}</p>
              </section>
            </div>
          );
        })
      ) : (
        <p className="text-center font-semibold text-gray-400">
          No posts to show.
        </p>
      )}
    </div>
  );
}
