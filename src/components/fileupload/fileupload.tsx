import React, { useCallback, useState } from 'react';
import Dropzone, { useDropzone, DropzoneOptions } from 'react-dropzone';

const FileUpload: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
          setImageUrl(URL.createObjectURL(file));
        };
        reader.readAsArrayBuffer(file);
      }
    });
  }, []);

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: { 'image/*': [] }
  };

  return (
    <div>
      <Dropzone {...dropzoneOptions}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      
    </div>
  );
};

export default FileUpload;