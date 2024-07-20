"use client"
import api from '@/app/lib/axios';
import React, { useEffect } from 'react'
import useSWR from 'swr';
import Button from '../ui/button/button';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';

const MediaList = ({
    onSelectChange,
    selectedMedia = [],
    multiple = false
}: {
    onSelectChange: (id: number, thumbnail: string) => void,
    selectedMedia: { id: number, thumbnail: string }[],
    multiple: boolean
}) => {
    const { data, isLoading, error } = useSWR(`/media-items`, async () => {
        try {
            const response = await api.get(`/media-items`);
            return response.data;
        } catch (error) {
            throw new Error('An error occurred while fetching the data.');
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading media items</div>;

    return (
        <div className='mt-5 flex gap-3 flex-wrap'>
            {data?.map((media: any) => {
                const isSelected = selectedMedia.some(item => item.id === media.id);
                return (
                    <div
                        key={media.id}
                        className={`w-32 aspect-square overflow-hidden rounded-sm relative group border-1 ${isSelected ? 'border-blue-600' : 'border-blue-400'}`}
                        onClick={() => onSelectChange(media.id, media.thumbnail)}
                    >
                        <Image src={media.thumbnail} fill className='object-cover' alt='' sizes='100%' />
                        {isSelected && (
                            <div className="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center">
                                <span className="text-white">✓</span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    )
}

export default MediaList
