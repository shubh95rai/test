import { Following, Profile } from "@prisma/client";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import BackButton from "./BackButton";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import FollowButton from "./FollowButton";

export default function ProfilePageInfo({
  profile,
  isMyProfile,
  myFollow,
}: {
  profile: Profile;
  isMyProfile?: boolean;
  myFollow?: Following | null;
}) {
  return (
    <div>
      <section className="relative flex h-10 items-center justify-between text-2xl">
        <BackButton />
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 font-bold">
          {profile.username} <RiVerifiedBadgeFill className="text-sky-600" />
        </div>
        {isMyProfile && (
          <Link href={"/settings"}>
            <IoMdSettings />
          </Link>
        )}
      </section>
      <section className="mt-8 flex justify-center">
        <div className="rounded-full bg-gradient-to-tr from-amber-500 to-fuchsia-600 p-2">
          <div className="rounded-full bg-white p-2 dark:bg-neutral-900">
            <Image
              src={profile.avatar || ""}
              alt="display picture"
              width={500}
              height={500}
              priority
              className="aspect-square size-48 rounded-full object-cover"
            ></Image>
          </div>
        </div>
      </section>
      <section className="mt-4 space-y-1 text-center">
        <h1 className="text-xl font-bold">{profile.name}</h1>
        <p className="text-gray-500">Personal account</p>
        <p>{profile.subtitle}</p>
        <p>{profile.bio}</p>
        <div>
          {!isMyProfile && (
            <FollowButton profileToFollowId={profile.id} myFollow={myFollow} />
          )}
        </div>
      </section>
    </div>
  );
}
