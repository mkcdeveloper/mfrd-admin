
"use client"
import Seo from '@/shared/layout-components/seo/seo';
import React, { Fragment, useCallback, useState } from 'react'
import dynamic from "next/dynamic";
import Button from '@/components/ui/button/button';
import Modal from '@/components/ui/modal/modal';
import ModalFooter from '@/components/ui/modal/modal-footer';
import Dropzone from '@/components/dropzone/dropzone';
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Fragment>
      <Seo title={"Dashboard"} />
      <div className="md:flex block items-center justify-between my-[1.5rem] page-header-breadcrumb">
        <div>
          <p className="font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 ">Welcome back, Json Taylor !</p>
          <p className="font-normal text-[#8c9097] dark:text-white/50 text-[0.813rem]">Track your sales activity, leads and deals here.</p>
        </div>
      </div>
      <Button label='Open Media Library' color='primary' className='mr-3 hs-dropdown-toggle' onClick={openModal} />

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Media Library">

        <div className='tab'>
          <div className='tab-header flex gap-2'>
            <Button label='Browse Media' color='primary' variant={tabIndex == 0 ? 'default' : 'light'} onClick={() => setTabIndex(0)} />
            <Button label='Upload' color='primary' variant={tabIndex == 1 ? 'default' : 'light'} onClick={() => setTabIndex(1)} />
          </div>

          <div className="tab-body py-2">
            {(tabIndex === 0) && (
              <>
                Media
              </>
            )}
            {(tabIndex === 1) && (
              <>
               <Dropzone/>
              </>
            )}
          </div>
        </div>
        <ModalFooter onClose={closeModal} onSave={() => {
          console.log('Saving...');
          closeModal();
        }} />
      </Modal>

    </Fragment>
  )
}
export default Page;