"use client"

import { FileUploaderRegular } from "@uploadcare/react-uploader/next"
import "@uploadcare/react-uploader/core.css"

export default function UploadCareButton() {
  return (
    <div className="p-4 flex flex-col justify-center items-center border rounded-md border-gray-300 dark:border-gray-700">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">
        Upload File
      </h2>

      <FileUploaderRegular
        pubkey="2175e29c44c4aa80078e"
        sourceList="local, camera, gdrive"
        classNameUploader="uc-light dark:uc-dark"
      />
    </div>
  )
}

