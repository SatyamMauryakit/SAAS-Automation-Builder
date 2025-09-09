import ProfileForm from "@/components/forms/profile-form";
import React from "react";
import ProfilePicture from "./_components/profile-picture";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const SettingsPage = async () => {
  const authUser = await currentUser();
  if (!authUser) return null;

  const user = await db.user.upsert({
    where: {
      clerkId: authUser.id,
    },
    update: {},
    create: {
      clerkId: authUser.id,
      email:
        authUser.primaryEmailAddress?.emailAddress ||
        authUser.emailAddresses?.[0]?.emailAddress ||
        `${authUser.id}@example.com`,
      name:
        authUser.fullName || authUser.firstName || authUser.username || null,
      profileImage: authUser.imageUrl || null,
    },
  });

  const onUpdate = async (name: string) => {
    "use server";
    const auth = await currentUser();
    if (!auth) return null;
    const response = await db.user.upsert({
      where: {
        clerkId: auth.id,
      },
      update: {
        name,
      },
      create: {
        clerkId: auth.id,
        email:
          auth.primaryEmailAddress?.emailAddress ||
          auth.emailAddresses?.[0]?.emailAddress ||
          `${auth.id}@example.com`,
        name,
        profileImage: auth.imageUrl || null,
      },
    });
    return response;
  };

  const removeProfileImage = async () => {
    "use server";
    const auth = await currentUser();
    if (!auth) return false;
    await db.user.upsert({
      where: {
        clerkId: auth.id,
      },
      update: {
        profileImage: "",
      },
      create: {
        clerkId: auth.id,
        email:
          auth.primaryEmailAddress?.emailAddress ||
          auth.emailAddresses?.[0]?.emailAddress ||
          `${auth.id}@example.com`,
        name: auth.fullName || auth.firstName || auth.username || null,
        profileImage: "",
      },
    });
    return true;
  };

  // Removed unused logo handlers

  const uploadProfileImage = async (image: string) => {
    "use server";
    const auth = await currentUser();
    if (!auth) return;
    await db.user.upsert({
      where: {
        clerkId: auth.id,
      },
      update: {
        profileImage: image,
      },
      create: {
        clerkId: auth.id,
        email:
          auth.primaryEmailAddress?.emailAddress ||
          auth.emailAddresses?.[0]?.emailAddress ||
          `${auth.id}@example.com`,
        name: auth.fullName || auth.firstName || auth.username || null,
        profileImage: image,
      },
    });
    return;
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/100 p-6 text-4xl backdrop-blur-lg ">
        <span>Settings</span>
      </h1>
      <div className="flex flex-col gap-10 p-6">
        <div>
          <h2 className="text-2xl font-bold">User Profile</h2>
          <p className="text-base text-white/50">
            Add or update your information
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ProfilePicture
            title="Profile Image"
            onDelete={removeProfileImage}
            userImage={user?.profileImage || ""}
            onUpload={uploadProfileImage}
          />
        </div>

        <ProfileForm user={user} onUpdate={onUpdate} />
      </div>
    </div>
  );
};

export default SettingsPage;
