"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import Button from '../ui/button/button';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image'
import api from '@/app/lib/axios';

const baseStyle: any = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px',
  borderWidth: 2,
  borderRadius: '0.75rem',
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',

};
const focusedStyle: any = {
  borderColor: '#2196f3'
};

const acceptStyle: any = {
  borderColor: '#00e676'
};

const rejectStyle: any = {
  borderColor: '#ff1744'
};
export interface FileWithPreview extends File {

  file: File;
  preview: string;
  uploadPercentage: number;
  id: string;
  error?: string;
}

const FileUpload = ({ multiple = false }: { multiple?: boolean }) => {
  const [imageUrls, setImageUrls] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: any[] = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      uploadPercentage: 0,
      id: Math.random().toString(36).substr(2, 9)
    }));

    setImageUrls(prev => [...prev, ...newFiles]);

    newFiles.forEach(fileWithPreview => {
      const formData = new FormData();
      formData.append('file', fileWithPreview.file);

      console.log('Uploading file:', fileWithPreview.file.name, 'Size:', fileWithPreview.file.size, 'Type:', fileWithPreview.file.type);

      api.post('/media-items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setImageUrls(prev => prev.map(f =>
              f.id === fileWithPreview.id ? { ...f, uploadPercentage: percentCompleted } : f
            ));
          }
        }
      }).then(res => {
        console.log('Upload response:', res.data);
        setImageUrls(prev => prev.map(f =>
          f.id === fileWithPreview.id ? { ...f, uploadPercentage: 100 } : f
        ));
      }).catch(error => {
        console.error('Error uploading file:', fileWithPreview.file.name, error);
        let errorMessage = 'Upload failed';
        if (error.response) {
          console.error('Error response:', error.response.data);
          errorMessage = error.response.data.message || JSON.stringify(error.response.data);
        }
        setImageUrls(prev => prev.map(f =>
          f.id === fileWithPreview.id ? { ...f, error: errorMessage, uploadPercentage: 0 } : f
        ));
      });
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop, accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
      'image/gif': []
    },
    maxSize: 2 * 1024 * 1024, // 2MB 
    multiple
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);



  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: { 'image/*': [] }
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => imageUrls?.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const removeFile = (id: string) => {
    setImageUrls(prev => prev.filter(file => file.id !== id));
  }

  return (
    <div>
      <div className="">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>{`Drag 'n' drop some files here, or click to select files`}</p>
        </div>
      </div>
      <div className='mt-5 flex gap-3 flex-wrap'>
        {imageUrls.map((file) => (
          <div key={file.id} className='w-32 aspect-square overflow-hidden rounded-xl relative group'>
            <Button color="danger" variant="default" rounded className='absolute top-2 right-2 z-20 size-10 opacity-0 group-hover:opacity-100 transition-opacity' onClick={() => removeFile(file.id)}>
              <IoMdClose size={15} />
            </Button>
            <Image src={file.preview} fill className='object-cover' alt='' sizes='100%' />
            {file.uploadPercentage < 100 && (
              <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1'>
                {file.uploadPercentage}%
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default FileUpload;