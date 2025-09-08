'use client'
import React from 'react'
import UploadCareButton from './UploadCareButton'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  userImage: string | null
  
  onDelete?: any
  onUpload: any
}

const ProfilePicture = ({ userImage, onDelete, onUpload }: Props) => {
  const router = useRouter()

  const onRemoveProfileImage = async () => {
    const response = await onDelete()
    if (response) {
      router.refresh()
    }
  }

  return (
    <div className='flex flex-col'>
        <p className='text-lg text-white'>Profile Picture</p>
        {userImage ? (
          <>
          <div className='relative h-full w-2/12'>
          <Image
            src={userImage}
            alt='Profile Picture'
            fill/>
            <Button
            onClick={onRemoveProfileImage}
            className='bg-transparent text-red-500 hover:bg-red-500 hover:text-white'
          >
           <X /> Remove Logo
          </Button>
          </div>
          </>
        ):
        (
          <>
          <div className="flex h-[30vh] flex-col items-center justify-center">
            <UploadCareButton  onUpload={onUpload}/>
         </div>

          </>)}
         
    </div>
  )
}
export default ProfilePicture