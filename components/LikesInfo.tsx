"use client";

import { dislikeAction, likeAction } from "@/actions/actions";
import { Like, Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

export default function LikesInfo({
  post,
  sessionLike,
}: {
  post: Post;
  sessionLike: Like | null;
}) {
  const [likedByMe, setLikedByMe] = useState(!!sessionLike);

  const router = useRouter();

  async function handleLike(formData: FormData) {
    if (likedByMe) {
      await dislikeAction(formData);
    } else {
      await likeAction(formData);
    }

    setLikedByMe((prev) => !prev);
    router.refresh();
  }
  return (
    <form action={handleLike} className="flex items-center gap-1">
      <button>
        {likedByMe ? (
          <GoHeartFill size={22} className="text-red-500" />
        ) : (
          <GoHeart size={22} />
        )}
      </button>
      <p>{post.likesCount} people like this</p>
      <input type="hidden" name="postId" value={post.id} />
    </form>
  );
}
