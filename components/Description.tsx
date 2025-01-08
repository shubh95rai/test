import { Post, Profile } from "@prisma/client";
import Avatar from "./Avatar";

export default function Description({
  post,
  authorProfile,
}: {
  post: Post;
  authorProfile: Profile;
}) {
  return (
    <div className="flex gap-4 rounded-md bg-gray-100 p-4 shadow dark:bg-neutral-800">
      <div>
        <Avatar src={authorProfile.avatar || ""} />
      </div>
      <div className="flex-1">
        <div className="flex gap-2">
          <h3 className="font-semibold">{authorProfile.name}</h3>
          <p className="text-sm text-gray-500">@{authorProfile.username}</p>
        </div>
        <p className="mt-2">{post.description}</p>
        <div className="mt-2 space-x-1 text-right text-xs text-gray-400">
          <span>
            {post.createdAt.toLocaleDateString("en-gb", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span>·</span>
          <span>
            {post.createdAt.toLocaleTimeString([], {
              timeStyle: "short",
              timeZone: "Asia/Kolkata",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
