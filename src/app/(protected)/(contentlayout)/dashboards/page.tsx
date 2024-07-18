
"use client"
import Seo from '@/shared/layout-components/seo/seo';
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import Button from '@/components/ui/button/button';
import MediaLibrary from '@/components/media-libarary/media-library';
import { useSession } from 'next-auth/react';

const Page = () => {

  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<{ id: number, thumbnail: string }[]>([]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const handleSelectChange = useCallback((selectedMedia: { id: number, thumbnail: string }[]) => {
    setSelectedImages(selectedMedia);
  }, []);


  return (
    <Fragment>
      <Seo title={"Dashboard"} />
      <div className="md:flex block items-center justify-between my-[1.5rem] page-header-breadcrumb">
        <div>
          <p className="font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 ">Welcome back, {session?.user?.name} !</p>
          <p className="font-normal text-[#8c9097] dark:text-white/50 text-[0.813rem]">Track your sales activity, leads and deals here.</p>
        </div>
      </div>
      <Button label='Open Media Library' color='primary' className='mr-3 hs-dropdown-toggle' onClick={openModal} />
      <MediaLibrary
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        onSelectChange={handleSelectChange}
        images={selectedImages}
        multiple={false} // Set to false for single selection
      />

      <div>
        Selected Image IDs: {Array.isArray(selectedImages) ? selectedImages.join(', ') : 'No images selected'}
      </div>
    </Fragment>
  )
}
export default Page;