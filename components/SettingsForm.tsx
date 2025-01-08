"use client";

import { updateProfileAction } from "@/actions/actions";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Profile } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function SettingsForm({ profile }: { profile: Profile | null }) {
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || null);
  const [uploading, setUploading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const uploadFile = async () => {
    try {
      if (!file) {
        // alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setAvatarUrl(signedUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      // alert("Trouble uploading file");
    }
  };

  useEffect(() => {
    uploadFile();
  }, [file]);

  return (
    <form action={updateProfileAction} className="mt-4 flex flex-col gap-4">
      <div className="mb-4 flex items-center gap-4">
        <div>
          <div className="size-24 rounded-full bg-gray-100 shadow-sm ring-1 ring-gray-200">
            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt="display picture"
                width={200}
                height={200}
                className="aspect-square rounded-full object-cover"
                priority
              ></Image>
            )}
          </div>
        </div>
        <div>
          <Button
            type="button"
            variant={"outline"}
            disabled={uploading}
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            {uploading ? "Uploading..." : "Change Avatar"}
          </Button>
        </div>
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={(e) => {
            setFile(e.target?.files?.[0] || null);
          }}
        />
        <input type="hidden" name="avatar" value={avatarUrl || ""} />
      </div>

      <Label htmlFor="username">Username</Label>
      <Input
        placeholder="Username"
        type="text"
        name="username"
        id="username"
        defaultValue={profile?.username || ""}
      />

      <Label htmlFor="name">Name</Label>
      <Input
        placeholder="John"
        type="text"
        name="name"
        id="name"
        defaultValue={profile?.name || ""}
      />

      <Label htmlFor="subtitle">Subtitle</Label>
      <Input
        placeholder="Graphic designer"
        type="text"
        name="subtitle"
        id="subtitle"
        defaultValue={profile?.subtitle || ""}
      />

      <Label htmlFor="bio">Bio</Label>
      <Textarea
        placeholder="Your bio"
        name="bio"
        defaultValue={profile?.bio || ""}
        className="resize-none"
      ></Textarea>

      <Button className="">Submit</Button>
    </form>
  );
}
