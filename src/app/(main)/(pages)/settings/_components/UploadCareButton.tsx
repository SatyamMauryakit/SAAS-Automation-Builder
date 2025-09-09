"use client";

import React from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { useRouter } from "next/navigation";

type Props = {
  onUpload: (cdnUrl: string) => Promise<void> | void;
  title?: string;
};

export default function UploadCareButton({ onUpload, title }: Props) {
  const router = useRouter();

  return (
    <div className="w-full">
      {title && (
        <h2 className="mb-3 text-sm font-medium text-foreground">{title}</h2>
      )}

      <div className="relative overflow-hidden rounded-lg border border-gray-200/60 bg-white/80 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700/60 dark:bg-gray-800/80">
        <FileUploaderRegular
          pubkey="2175e29c44c4aa80078e"
          sourceList="local, camera, gdrive"
          classNameUploader="uc-light dark:uc-dark"
          onFileUploadSuccess={async (file) => {
            try {
              await onUpload(file.cdnUrl);
              router.refresh();
            } catch (err) {
              console.error("Upload failed:", err);
            }
          }}
        />
      </div>
    </div>
  );
}
