import { ReactNode } from "react";
import { getSessionEmail } from "@/actions/actions";
import ProfilePageContent from "@/components/ProfilePageContent";
import { prisma } from "@/utils/prismaClient";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const sessionEmail = await getSessionEmail();

  const profile = await prisma.profile.findFirst({
    where: {
      email: sessionEmail,
    },
  });

  if (!profile) {
    redirect("/settings");
  }

  const myFollow = await prisma.following.findFirst({
    where: {
      followedByProfileEmail: sessionEmail,
      followingToProfileId: profile.id,
    },
  });

  return (
    <div>
      <ProfilePageContent
        profile={profile}
        myFollow={myFollow}
        isMyProfile={sessionEmail === profile.email}
      />

      {children}
    </div>
  );
}
