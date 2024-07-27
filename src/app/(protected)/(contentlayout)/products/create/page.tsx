"use client"
import api from '@/app/lib/axios';
import { fieldErrorMessage, isFieldInvalid } from '@/app/lib/helpers';
import MediaLibrary from '@/components/media-libarary/media-library';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/input/input';
import Select from '@/components/ui/select/select';
import { productTags, availabilityStatus } from '@/shared/data/pages/ecommerces/addproductsdata';
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import { IconTrash } from '@public/assets/iconfonts/tabler-icons/icons-react';
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';

import * as Yup from 'yup';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });




interface SelectOption {
    value: string;
    label: string;
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .max(100, 'Name should not exceed 100 characters')
        .required('Product Name is required'),
    actual_price: Yup.number()
        .required('Actual price is required'),
    price: Yup.number()
        .required('Price is required'),
    short_description: Yup.string()
        .max(500, 'Description should not exceed 500 characters')
        .required('Description is required'),
    // description: Yup.string()
    //     .required('Description is required'),
    type: Yup.string()
        .required('Type is required'),
    author_id: Yup.number()
        .required('Author is required'),
    status: Yup.string()
        .required('Status is required'),
    tags: Yup.array()
        .of(Yup.string().required('Each tag must be a string'))
        .required('Tags are required')
        .min(1, 'At least one tag is required'),
    main_image_id: Yup.number()
        .required('Main image is required'),
});

const AddProduct = () => {


    const [isLoading, setIsLoading] = useState(false);
    const [isOpenMediaLibrary, setIsOpenMediaLibrary] = useState(false);
    const [isOpenGalleryMediaLibrary, setIsOpenGalleryMediaLibrary] = useState(false);

    const openMediaLibrary = useCallback(() => setIsOpenMediaLibrary(true), []);
    const closeMediaLibrary = useCallback(() => setIsOpenMediaLibrary(false), []);
    const openGalleryMediaLibrary = useCallback(() => setIsOpenGalleryMediaLibrary(true), []);
    const closeGalleryMediaLibrary = useCallback(() => setIsOpenGalleryMediaLibrary(false), []);
    const [mainImage, setMainImage] = useState<{ id: number, thumbnail: string } | null>(null);
    const [galleryImages, setGalleryImages] = useState<{ id: number, thumbnail: string }[]>([]);

    const [categories, setCategories] = useState<SelectOption[]>([]);
    const [publishers, setPublishers] = useState<SelectOption[]>([]);
    const [languages, setLanguages] = useState<SelectOption[]>([]);
    const [authors, setAuthors] = useState<SelectOption[]>([]);

    useEffect(() => {
        getFormInitialApi();
    }, [])


    const getFormInitialApi = async () => {
        try {
            const response = await api.get('/product-initial-form');
            setCategories(response.data.categories);
            setPublishers(response.data.publishers);
            setLanguages(response.data.languages);
            setAuthors(response.data.authors);
        } catch {
            throw Error('Initial Load Error')
        }
    }

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            name: '',
            category_ids: [],
            publisher_id: '',
            actual_price: '',
            price: '',
            short_description: '',
            description: '',
            type: '',
            language_id: '',
            author_id: '',
            status: '',
            is_featured: false,
            tags: [],
            is_published: false,
            main_image_id: null,
            gallery_image_ids: [],
        },
        onSubmit: async (value, { resetForm }) => {
            setIsLoading(true);
            try {
                const res = await api.post('/products', value);
                alert(res.data.message)
                resetForm()
            } catch (e) {

            }

            setIsLoading(false);


        }
    })

    const handleSelectChange = (option: SelectOption[], name: string) => {
        const values = option?.map(item => item.value);
        formik.setFieldValue(name, values);
    }

    const addProduct = () => {
        formik.setFieldValue('is_published', true);
        formik.submitForm();
    }
    const saveProduct = () => {
        formik.setFieldValue('is_published', false);
        formik.submitForm();
    }

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
                                                <Input label='Product Name' placeholder='Name' isInvalid={isFieldInvalid('name', formik)} errorMessage={fieldErrorMessage('name', formik)} {...formik.getFieldProps('name')} />
                                                <label htmlFor="product-name-add" className="form-label mt-1 text-[0.75rem] opacity-[0.5] !text-[#8c9097] dark:text-white/50 !mb-0">*Product Name should not exceed 30 characters</label>
                                            </div>
                                            <div className="xl:col-span-4 col-span-12">
                                                <Select options={categories} label='Category' id="category" className="w-full !rounded-md" isInvalid={isFieldInvalid('category_id', formik)} errorMessage={fieldErrorMessage('category_ids', formik)} name="category_ids" isMulti isSearchable placeholder="Select" onChange={(value: any) => handleSelectChange(value, 'category_ids')}
                                                />
                                            </div>
                                            <div className="xl:col-span-4 col-span-12">
                                                <Select name="author_id" options={authors} label='Author' className="w-full !rounded-md" isSearchable={true} placeholder="Select" onChange={(value: any) => formik.setFieldValue('author_id', value.value)}
                                                />
                                            </div>
                                            <div className="xl:col-span-4 col-span-12">
                                                <Select name="publisher_id" options={publishers} label='Publisher' className="w-full !rounded-md" isSearchable={true} placeholder="Select" onChange={(value: any) => formik.setFieldValue('publisher_id', value.value)}
                                                />
                                            </div>

                                            <div className="xl:col-span-6 col-span-12">
                                                <Input label='Actual Price' placeholder='Actual Price' isInvalid={isFieldInvalid('actual_price', formik)} errorMessage={fieldErrorMessage('actual_price', formik)} {...formik.getFieldProps('actual_price')} />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <Input label='Price' placeholder='Price' isInvalid={isFieldInvalid('price', formik)} errorMessage={fieldErrorMessage('price', formik)} {...formik.getFieldProps('price')} />
                                                <label htmlFor="product-cost-add" className="form-label mt-1 text-[0.75rem] opacity-[0.5] !text-[#8c9097] dark:text-white/50 mb-0">*Mention final price of the product</label>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="product-description-add" className="form-label">Product Description</label>
                                                <textarea className={`form-control w-full !rounded-md" id="product-description-add ${isFieldInvalid('short_description', formik) && '!border-danger focus:border-danger focus:ring-danger'}`} rows={3} {...formik.getFieldProps('short_description')}></textarea>
                                                {isFieldInvalid('short_description', formik) &&
                                                    <p className="text-sm text-red-600 mt-2" id="hs-validation-name-error-helper">{fieldErrorMessage('short_description', formik)}</p>}
                                                <label htmlFor="product-description-add" className="form-label mt-1 text-[0.75rem] opacity-[0.5] !text-[#8c9097] dark:text-white/50 mb-0">*Description should not exceed 500 letters</label>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12 mb-4">
                                                <label className="form-label">Product Features</label>
                                                <div id="product-features">
                                                    <ReactQuill
                                                        onChange={(value) => formik.setFieldValue('description', value)}
                                                        modules={{
                                                            toolbar: {
                                                                container: [
                                                                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                                                    ['bold', 'italic', 'underline', 'strike'],
                                                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                                    ['link', 'image'],
                                                                    ['clean']
                                                                ],
                                                                handlers: {
                                                                    // You can add custom handlers here if needed
                                                                }
                                                            },
                                                            clipboard: {
                                                                matchVisual: false,
                                                            },
                                                        }}
                                                        theme="snow"
                                                        style={{ height: '500px' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6 col-span-12">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="xl:col-span-4 col-span-12">
                                                <Select name="type" options={[{ value: 'book', label: 'Book' }, { value: 'souvenir', label: 'Souvenir' }]} label='Product Type' id="type" className="w-full !rounded-md" placeholder="Select" onChange={(value: any) => formik.setFieldValue('type', value.value)}
                                                />

                                            </div>
                                            <div className="xl:col-span-4 col-span-12">
                                                <Select name="language_id" options={languages} label='Language' id="language_id" className="w-full !rounded-md" placeholder="Select" onChange={(value: any) => formik.setFieldValue('language_id', value.value)}
                                                />
                                            </div>
                                            <div className="xl:col-span-4 col-span-12">
                                                <Select name="status" options={availabilityStatus} label='Availability' id="status" className="w-full !rounded-md" placeholder="Select" onChange={(value: any) => formik.setFieldValue('status', value.value)}
                                                />

                                            </div>


                                            <div className="xl:col-span-12 col-span-12">
                                                <Select name="tags" options={productTags} isMulti label='Product Tags' id="tags" className="w-full !rounded-md" placeholder="Select" onChange={(value: any) => handleSelectChange(value, 'tags')}
                                                />
                                            </div>

                                            <div className="xl:col-span-12 col-span-12">
                                                <div className="flex items-center">
                                                    <input type="checkbox" id="hs-basic-with-description-unchecked" className="ti-switch mb-4" name='is_featured' checked={formik.values.is_featured} onChange={formik.handleChange} />
                                                    <label htmlFor="hs-basic-with-description-unchecked" className="text-sm text-gray-500 ms-3 dark:text-[#8c9097] dark:text-white/50 mb-4">Featured</label>
                                                </div>
                                            </div>

                                            <div className="xl:col-span-12 col-span-12">
                                                <label className="form-label">Main Image</label>
                                                <div className='w-24 aspect-[3/4] rounded-sm border border-gray-300 overflow-hidden'>
                                                    {mainImage ?
                                                        <div className='relative h-full w-full group'>
                                                            <Image
                                                                src={mainImage.thumbnail}
                                                                className='object-cover'
                                                                alt='Main Image'
                                                                fill
                                                                sizes="100%"
                                                            />
                                                            <button className='absolute top-0 left-0 bg-white opacity-0 group-hover:opacity-80 transition-opacity  z-20 h-full w-full flex justify-center items-center' onClick={() => {
                                                                setMainImage(null);
                                                                formik.setFieldValue('main_image_id', null)
                                                            }}><IconTrash size={30} className='text-danger' /> </button>
                                                        </div>
                                                        :
                                                        <button className='h-full w-full flex justify-center items-center' onClick={openMediaLibrary}><IoMdAddCircleOutline size={30} className='text-gray-400' /></button>}

                                                </div>
                                                <label className="form-label mt-1 text-[0.75rem] opacity-[0.5] !text-[#8c9097] dark:text-white/50 mb-0">*Image should be 1000 x 1300</label>
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label className="form-label">Gallery Image</label>
                                                <div className='flex flex-wrap gap-3'>
                                                    {galleryImages?.map(media => (
                                                        <div key={media.id} className='w-24 aspect-[3/4] overflow-hidden rounded-sm border border-gray-300  relative h-full group' >
                                                            <Image
                                                                src={media.thumbnail}
                                                                className='object-cover'
                                                                alt='Gallery Image'
                                                                fill
                                                                sizes="100%"
                                                            />
                                                            <button className='absolute top-0 left-0 bg-white opacity-0 group-hover:opacity-80 transition-opacity  z-20 h-full w-full flex justify-center items-center' onClick={() => {
                                                                setGalleryImages((prev) => prev.filter(item => item.id != media.id))
                                                                formik.setFieldValue('gallery_image_ids', galleryImages.filter(item => item.id != media.id).map(media => media.id))
                                                            }}
                                                            ><IconTrash size={30} className='text-danger' /> </button>

                                                        </div>
                                                    ))}

                                                    <div className='w-24 aspect-[3/4] rounded-sm border border-gray-300 '>
                                                        <button className='h-full w-full flex justify-center items-center' onClick={openGalleryMediaLibrary}><IoMdAddCircleOutline size={30} className='text-gray-400' /> </button>
                                                    </div>
                                                </div>
                                                <label className="form-label mt-1 text-[0.75rem] opacity-[0.5] !text-[#8c9097] dark:text-white/50 mb-0">*Image should be 1000 x 1300</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-dashed dark:border-defaultborder/10 sm:flex justify-end gap-3">
                                <Button disabled={isLoading} loading={isLoading} type="button" color='primary' variant='light' onClick={addProduct}>Add Product<i className="bi bi-plus-lg ms-2"></i></Button>
                                <Button disabled={isLoading} loading={isLoading} type="button" color='success' variant='light' onClick={saveProduct}>Save Product<i className="bi bi-download ms-2"></i></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MediaLibrary
                isModalOpen={isOpenMediaLibrary}
                closeModal={closeMediaLibrary}
                onSelectChange={(selectedMedia) => {
                    setMainImage(selectedMedia[0]);
                    formik.setFieldValue('main_image_id', selectedMedia[0].id)
                }}
                multiple={false} // Set to false for single selection
            />

            <MediaLibrary
                isModalOpen={isOpenGalleryMediaLibrary}
                closeModal={closeGalleryMediaLibrary}
                images={galleryImages}
                onSelectChange={(selectedMedia) => {
                    setGalleryImages(selectedMedia);
                    formik.setFieldValue('gallery_image_ids', selectedMedia.map(media => media.id))
                }}
                multiple={true} // Set to false for single selection
            />
        </Fragment>
    )
}

export default AddProduct