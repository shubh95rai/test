"use server";

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/utils/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/profile" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData: FormData) {
  const session = await auth();
  const email = session?.user?.email as string;

  const newUserData = {
    username: formData.get("username") as string,
    name: formData.get("name") as string,
    subtitle: formData.get("subtitle") as string,
    bio: formData.get("bio") as string,
    avatar: formData.get("avatar") as string,
  };

  await prisma.profile.upsert({
    where: {
      email,
    },
    update: newUserData,
    create: {
      email,
      ...newUserData,
    },
  });
  revalidatePath("/profile");
  redirect("/profile");
}

export async function createPostAction(formData: FormData) {
  const session = await auth();
  const email = session?.user?.email as string;

  const image = formData.get("image") as string;
  const description = formData.get("description") as string;

  const post = await prisma.post.create({
    data: {
      author: email,
      image,
      description,
    },
  });

  redirect(`/posts/${post.id}`);
}

export async function postCommentAction(formData: FormData) {
  const session = await auth();
  const email = session?.user?.email as string;
  const postId = formData.get("postId") as string;
  const comment = formData.get("comment") as string;

  await prisma.comment.create({
    data: {
      author: email,
      postId,
      comment,
    },
  });

  revalidatePath("/posts/[id]", "page");
}

export async function likeAction(formData: FormData) {
  const session = await auth();
  const email = session?.user?.email as string;
  const postId = formData.get("postId") as string;

  await prisma.like.create({
    data: {
      author: email,
      postId,
    },
  });

  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likesCount: await prisma.like.count({
        where: {
          postId,
        },
      }),
    },
  });
}

export async function dislikeAction(formData: FormData) {
  const session = await auth();
  const email = session?.user?.email as string;
  const postId = formData.get("postId") as string;

  await prisma.like.deleteMany({
    where: {
      author: email,
      postId,
    },
  });

  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likesCount: await prisma.like.count({
        where: {
          postId,
        },
      }),
    },
  });
}

export async function getSessionEmail() {
  const session = await auth();
  const email = session?.user?.email as string;

  // if (!email) {
  //   throw "User not logged in!";
  // }

  return email;
}

export async function followUserAction(followingToProfileId: string) {
  const sessionProfile = await prisma.profile.findFirst({
    where: { email: await getSessionEmail() },
  });

  await prisma.following.create({
    data: {
      followingToProfileId,
      followedByProfileEmail: sessionProfile?.email as string,
      followedByProfileId: sessionProfile?.id as string,
    },
  });
}

export async function unfollowUserAction(followingToProfileId: string) {
  const sessionProfile = await prisma.profile.findFirst({
    where: { email: await getSessionEmail() },
  });

  await prisma.following.deleteMany({
    where: {
      followingToProfileId,
      followedByProfileEmail: sessionProfile?.email as string,
      followedByProfileId: sessionProfile?.id as string,
    },
  });
}

export async function bookmarkAction(formData: FormData) {
  const postId = formData.get("postId") as string;
  const sessionEmail = await getSessionEmail();

  await prisma.bookmark.create({
    data: {
      author: sessionEmail,
      postId,
    },
  });
}

export async function unbookmarkAction(formData: FormData) {
  const postId = formData.get("postId") as string;
  const sessionEmail = await getSessionEmail();

  await prisma.bookmark.deleteMany({
    where: {
      author: sessionEmail,
      postId,
    },
  });
}
