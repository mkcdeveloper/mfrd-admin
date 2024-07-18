"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Modal from '../ui/modal/modal'
import MediaList from '../medialist/MediaList'
import Button from '../ui/button/button'
import ModalFooter from '../ui/modal/modal-footer'
import FileUpload from '../fileupload/fileupload'

const MediaLibrary = ({ isModalOpen, closeModal, onSelectChange, images = [], multiple = false }: { isModalOpen: boolean, closeModal: () => void, onSelectChange: (selectedMedia: { id: number, thumbnail: string }[]) => void, images?: { id: number, thumbnail: string }[], multiple?: boolean }) => {
    const [tempSelectedMedia, setTempSelectedMedia] = useState<{ id: number, thumbnail: string }[]>(images);
    const [tabIndex, setTabIndex] = useState(0);

    const handleTempSelectChange = useCallback((id: number, thumbnail: string) => {
        setTempSelectedMedia(prevSelected => {
            if (multiple) {
                const isAlreadySelected = prevSelected.some(item => item.id === id);
                if (isAlreadySelected) {
                    return prevSelected.filter(item => item.id !== id);
                } else {
                    return [...prevSelected, { id, thumbnail }];
                }
            } else {
                return [{ id, thumbnail }];
            }
        });
    }, [multiple]);

    const handleInsert = () => {
        onSelectChange(tempSelectedMedia);
        closeModal();
    };

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Media Library">
            <div className='tab'>
                <div className='tab-header flex gap-2'>
                    <Button label='Browse Media' color='primary' variant={tabIndex === 0 ? 'default' : 'light'} onClick={() => setTabIndex(0)} />
                    <Button label='Upload' color='primary' variant={tabIndex === 1 ? 'default' : 'light'} onClick={() => setTabIndex(1)} />
                </div>

                <div className="tab-body py-2">
                    {tabIndex === 0 && (
                        <MediaList onSelectChange={handleTempSelectChange} selectedMedia={tempSelectedMedia} multiple={multiple} />
                    )}
                    {tabIndex === 1 && (
                        <FileUpload />
                    )}
                </div>
            </div>
            <ModalFooter>
                <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" onClick={closeModal}>
                    Close
                </button>
                <button className="ti-btn ti-btn-primary-full" onClick={handleInsert}>
                    Insert
                </button>
            </ModalFooter>
        </Modal>
    )
}

export default MediaLibrary
