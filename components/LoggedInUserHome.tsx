import HomeTopRow from "./HomeTopRow";
import { getSessionEmail } from "@/actions/actions";
import { prisma } from "@/utils/prismaClient";
import HomePosts from "./HomePosts";

export default async function LoggedInUserHome() {
  const myFollows = await prisma.following.findMany({
    where: {
      followedByProfileEmail: await getSessionEmail(),
    },
  });

  const followedProfiles = await prisma.profile.findMany({
    where: {
      id: {
        in: myFollows.map((f) => {
          return f.followingToProfileId;
        }),
      },
    },
  });

  return (
    <div >
      <HomeTopRow followedProfiles={followedProfiles} />
      <HomePosts followedProfiles={followedProfiles} />
    </div>
  );
}
