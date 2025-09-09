"use client";

import React from "react";
import UploadCareButton from "./UploadCareButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  userImage: string | null;
  onDelete?: () => Promise<boolean>; // async delete function
  onUpload: (fileUrl: string) => Promise<void> | void; // upload handler
  title?: string;
};

const ProfilePicture = ({ userImage, onDelete, onUpload, title }: Props) => {
  const router = useRouter();

  const onRemoveProfileImage = async () => {
    if (!onDelete) return;
    try {
      const response = await onDelete();
      if (response) router.refresh();
    } catch (err) {
      console.error("Failed to delete profile image:", err);
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto p-5 border rounded-lg bg-gray-100 dark:bg-gray-900 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300">
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {title || "Profile Picture"}
      </p>

      <div className="flex flex-col items-center justify-center gap-4 h-[30vh]">
        {userImage ? (
          <>
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 shadow-sm">
              <Image
                src={userImage}
                alt="User Image"
                fill
                className="object-cover"
              />
            </div>
            <Button
              onClick={onRemoveProfileImage}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Remove
            </Button>
          </>
        ) : (
          <div className="w-full">
            <UploadCareButton
              title={`Upload ${title || "Image"}`}
              onUpload={onUpload}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
