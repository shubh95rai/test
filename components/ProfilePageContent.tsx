import { Following, Profile } from "@prisma/client";
import ProfilePageInfo from "./ProfilePageInfo";
import ProfilePageNav from "./ProfilePageNav";

export default function ProfilePageContent({
  profile,
  isMyProfile,
  myFollow,
}: {
  profile: Profile;
  isMyProfile?: boolean;
  myFollow?: Following | null;
}) {
  return (
    <>
      <ProfilePageInfo
        profile={profile}
        isMyProfile={isMyProfile}
        myFollow={myFollow}
      />
      <ProfilePageNav isMyProfile={isMyProfile} username={profile.username} />
    </>
  );
}
