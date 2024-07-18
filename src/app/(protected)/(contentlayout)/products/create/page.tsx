"use client"
import MediaLibrary from '@/components/media-libarary/media-library';
import { Addproduct, Addproduct1, Addproduct2, Addproduct3, Addproduct4, Addproduct5, Addproduct6, Addproduct7 } from '@/shared/data/pages/ecommerces/addproductsdata';
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import { IconTrash } from '@public/assets/iconfonts/tabler-icons/icons-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { Fragment, useCallback, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
const Select = dynamic(() => import("react-select"), { ssr: false });
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const AddProduct = () => {


    const productTags = [
        { value: 'book', label: 'Book' },
        { value: 'paperback', label: 'Paperback' },
        { value: 'hardcover', label: 'Hardcover' },
        { value: 'ebook', label: 'eBook' },
        { value: 'audiobook', label: 'Audiobook' },

        { value: 'islamic', label: 'Islamic' },
        { value: 'quran', label: 'Quran' },
        { value: 'hadith', label: 'Hadith' },
        { value: 'prophets', label: 'Prophets' },
        { value: 'islamic_history', label: 'Islamic History' },
        { value: 'islamic_fiction', label: 'Islamic Fiction' },
        { value: 'islamic_biography', label: 'Islamic Biography' },
        { value: 'islamic_law', label: 'Islamic Law' },
        { value: 'islamic_education', label: 'Islamic Education' },
        { value: 'duas', label: 'Duas' },
        { value: 'prayers', label: 'Prayers' },
        { value: 'ramadan', label: 'Ramadan' },
        { value: 'hajj', label: 'Hajj' },

        { value: 'fiction', label: 'Fiction' },
        { value: 'non_fiction', label: 'Non-Fiction' },
        { value: 'mystery', label: 'Mystery' },
        { value: 'thriller', label: 'Thriller' },
        { value: 'romance', label: 'Romance' },
        { value: 'science_fiction', label: 'Science Fiction' },
        { value: 'fantasy', label: 'Fantasy' },
        { value: 'historical_fiction', label: 'Historical Fiction' },
        { value: 'biography', label: 'Biography' },
        { value: 'memoir', label: 'Memoir' },
        { value: 'self_help', label: 'Self-Help' },
        { value: 'children_books', label: 'Children’s Books' },
        { value: 'young_adult', label: 'Young Adult' },
        { value: 'graphic_novels', label: 'Graphic Novels' },
        { value: 'poetry', label: 'Poetry' },
        { value: 'classics', label: 'Classics' },
        { value: 'horror', label: 'Horror' },
        { value: 'adventure', label: 'Adventure' },
        { value: 'crime', label: 'Crime' },
        { value: 'dystopian', label: 'Dystopian' },

        { value: 'best_seller', label: 'Best Seller' },
        { value: 'new_release', label: 'New Release' },
        { value: 'award_winning', label: 'Award-Winning' },
        { value: 'series', label: 'Series' },
        { value: 'signed_copy', label: 'Signed Copy' },
        { value: 'limited_edition', label: 'Limited Edition' },
        { value: 'collectors_edition', label: 'Collector’s Edition' },
        { value: 'friendship', label: 'Friendship' },
        { value: 'war', label: 'War' },
        { value: 'coming_of_age', label: 'Coming of Age' },
        { value: 'family', label: 'Family' },
        { value: 'magic', label: 'Magic' },
        { value: 'detective', label: 'Detective' },
        { value: 'space', label: 'Space' },
        { value: 'time_travel', label: 'Time Travel' },
        { value: 'historical_events', label: 'Historical Events' },
        { value: 'personal_development', label: 'Personal Development' },
        { value: 'health', label: 'Health' },
        { value: 'travel', label: 'Travel' },
        { value: 'cooking', label: 'Cooking' },
        { value: 'english', label: 'English' },
        { value: 'arabic', label: 'Arabic' },
        { value: 'malayalam', label: 'Malayalam' },
        { value: 'for_students', label: 'For Students' },
        { value: 'for_teachers', label: 'For Teachers' }
    ];

    const availabilityStatus = [
        { value: 'in_stock', label: 'In Stock' },
        { value: 'out_of_stock', label: 'Out of Stock' },
        { value: 'pre_order', label: 'Prepublication' }
    ];

    const [isOpenMediaLibrary, setIsOpenMediaLibrary] = useState(false);
    const [isOpenGalleryMediaLibrary, setIsOpenGalleryMediaLibrary] = useState(false);

    const openMediaLibrary = useCallback(() => setIsOpenMediaLibrary(true), []);
    const closeMediaLibrary = useCallback(() => setIsOpenMediaLibrary(false), []);
    const openGalleryMediaLibrary = useCallback(() => setIsOpenGalleryMediaLibrary(true), []);
    const closeGalleryMediaLibrary = useCallback(() => setIsOpenGalleryMediaLibrary(false), []);
    const [mainImage, setMainImage] = useState<{ id: number, thumbnail: string } | null>(null);
    const [galleryImages, setGalleryImages] = useState<{ id: number, thumbnail: string }[]>([]);

    return (
        <Fragment>
            <Seo title={"Add Products"} />
            <Pageheader currentpage="Add Products" activepage="Products" mainpage="Add Products" />
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12  col-span-12">
                    <div className="box">
                        <div className="box-body add-products !p-0">
                            <div className="p-6">
                                <div className="grid grid-cols-12 md:gap-x-[3rem] gap-0">
                                    <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6 col-span-12">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="product-name-add" className="form-label">Product Name</label>
                                                <input type="text" className="form-control w-full !rounded-md" id="product-name-add" placeholder="Name" />
                                                <label htmlFor="product-name-add" className="form-label mt-1 text-[0.75rem] opacity-[0.5] !text-[#8c9097] dark:text-white/50 !mb-0">*Product Name should not exceed 30 characters</label>
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label className="form-label">Publisher</label>
                                                <Select id="product-category-add" options={Addproduct} className="w-full !rounded-md" isSearchable
                                                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Category"
                                                />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label className="form-label">Category</label>
                                                <Select isMulti name="product-tags" options={Addproduct6} defaultValue={[Addproduct6[0], Addproduct6[3]]}
                                                    className="w-full !rounded-md" isSearchable id="product-tags"
                                                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Select"
                                                />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-actual-price" className="form-label">Actual Price</label>
                                                <input type="text" className="form-control w-full !rounded-md" id="product-actual-price" placeholder="Actual Price" />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="product-cost-add" className="form-label">Price</label>
                                                <input type="text" className="form-control w-full !rounded-md" id="product-cost-add" placeholder="Cost" />
                                                <label htmlFor="product-cost-add" className="form-label mt-1 text-[0.75rem] opacity-[0.5] !text-[#8c9097] dark:text-white/50 mb-0">*Mention final price of the product</label>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="product-description-add" className="form-label">Product Description</label>
                                                <textarea className="form-control w-full !rounded-md" id="product-description-add" rows={2}></textarea>
                                                <label htmlFor="product-description-add" className="form-label mt-1 text-[0.75rem] opacity-[0.5] !text-[#8c9097] dark:text-white/50 mb-0">*Description should not exceed 500 letters</label>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12 mb-4">
                                                <label className="form-label">Product Features</label>
                                                <div id="product-features">
                                                    <ReactQuill />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6 col-span-12">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="xl:col-span-6 col-span-12">
                                                <label className="form-label">Language</label>
                                                <Select id="product-category-add" options={Addproduct} className="w-full !rounded-md" isSearchable
                                                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Category"
                                                />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label className="form-label">Availability</label>
                                                <Select name="product-status-add1" options={availabilityStatus} id="product-status-add1"
                                                    className="w-full !rounded-md" isSearchable
                                                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Select"
                                                />
                                            </div>

                                            <div className="xl:col-span-12 col-span-12">
                                                <label className="form-label">Product Tags</label>
                                                <Select isMulti name="product-tags" options={productTags}
                                                    className="w-full !rounded-md" isSearchable id="product-tags"
                                                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Select"
                                                />
                                            </div>

                                            <div className="xl:col-span-12 col-span-12">
                                                <div className="flex items-center">
                                                    <input type="checkbox" id="hs-basic-with-description-unchecked" className="ti-switch mb-4" />
                                                    <label htmlFor="hs-basic-with-description-unchecked" className="text-sm text-gray-500 ms-3 dark:text-[#8c9097] dark:text-white/50 mb-4">Is Featured</label>
                                                </div>
                                            </div>

                                            <div className="xl:col-span-12 col-span-12">
                                                <label className="form-label">Product Tags</label>
                                                <Select isMulti name="product-tags" options={productTags}
                                                    className="w-full !rounded-md" isSearchable id="product-tags"
                                                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Select"
                                                />
                                            </div>

                                            <div className="xl:col-span-12 col-span-12">
                                                <label className="form-label">Main Image</label>
                                                <div className='w-36 aspect-square rounded-sm border border-gray-300 overflow-hidden'>
                                                    {mainImage ?
                                                        <div className='relative h-full w-full group'>
                                                            <Image
                                                                src={mainImage.thumbnail}
                                                                className='object-cover'
                                                                alt='Main Image'
                                                                fill
                                                                sizes="100%"
                                                            />
                                                            <button className='absolute top-0 left-0 bg-white opacity-0 group-hover:opacity-80 transition-opacity  z-20 h-full w-full flex justify-center items-center' onClick={()=>setMainImage(null)}><IconTrash size={30} className='text-primary' /> </button>
                                                        </div>
                                                        :
                                                        <button className='h-full w-full flex justify-center items-center' onClick={openMediaLibrary}><IoMdAddCircleOutline size={30} className='text-primary' /></button>}
                                                </div>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label className="form-label">Gallery Image</label>
                                                <div className='flex flex-wrap gap-3'>
                                                    {galleryImages?.map(media => (
                                                        <div key={media.id} className='w-36 aspect-square overflow-hidden rounded-sm border border-gray-300  relative h-full group' >
                                                            <Image
                                                                src={media.thumbnail}
                                                                className='object-cover'
                                                                alt='Gallery Image'
                                                                fill
                                                                sizes="100%"
                                                            />
                                                            <button className='absolute top-0 left-0 bg-white opacity-0 group-hover:opacity-80 transition-opacity  z-20 h-full w-full flex justify-center items-center' onClick={()=>setGalleryImages((prev) => prev.filter(item => item.id != media.id))}><IconTrash size={30} className='text-primary' /> </button>

                                                        </div>
                                                    ))}

                                                    <div className='w-36 aspect-square rounded-sm border border-gray-300 '>
                                                        <button className='h-full w-full flex justify-center items-center' onClick={openGalleryMediaLibrary}><IoMdAddCircleOutline size={30} className='text-primary' /> </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-4 border-t border-dashed dark:border-defaultborder/10 sm:flex justify-end">
                                <button type="button" className="ti-btn ti-btn-primary !font-medium m-1">Add Product<i className="bi bi-plus-lg ms-2"></i></button>
                                <button type="button" className="ti-btn ti-btn-success !font-medium m-1">Save Product<i className="bi bi-download ms-2"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MediaLibrary
                isModalOpen={isOpenMediaLibrary}
                closeModal={closeMediaLibrary}
                onSelectChange={(selectedMedia) => setMainImage(selectedMedia[0])}
                multiple={false} // Set to false for single selection
            />

            <MediaLibrary
                isModalOpen={isOpenGalleryMediaLibrary}
                closeModal={closeGalleryMediaLibrary}
                images={galleryImages}
                onSelectChange={(selectedMedia) => setGalleryImages(selectedMedia)}
                multiple={true} // Set to false for single selection
            />
        </Fragment>
    )
}

export default AddProduct