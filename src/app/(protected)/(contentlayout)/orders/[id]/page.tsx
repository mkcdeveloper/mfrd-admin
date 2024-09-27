"use client"
import api from '@/app/lib/axios';
import { formatPriceINR } from '@/app/lib/helpers';
import ShippingLabelPrint from '@/components/ShippingLabelPrint ';
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import Link from 'next/link';
import React, { Fragment } from 'react'
import { useQuery } from 'react-query';

const Orderdetails = ({ params }: { params: { id: string } }) => {

    const { id } = params;

    const print = () => {
        window.print();
    };

    const fetchOrder = async () => {
        try {
            const response = await api.get(`/orders/${id}`)
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            throw new Error('Fetch Error')
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['order-single', id],
        queryFn: fetchOrder
    });

    if (isLoading) {
        return <p>Loading....</p>
    }

    return (
        <Fragment>
            <Seo title={"Order Details"} />
            <Pageheader currentpage="Order Details" activepage="Ecommerce" mainpage="Order Details" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header sm:flex justify-between">
                            <div className="box-title">
                                Order No - <span className="text-primary">#{data?.order_number}</span>
                            </div>
                            {/* <div>
                                <span className="badge bg-primary/10 text-primary">
                                    Estimated delivery : 30,Nov 2022
                                </span>
                            </div> */}
                        </div>
                        <div className="card-body !p-0">
                            <div className="table-responsive">
                                <table className="table whitespace-nowrap min-w-full">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-start min-w-[22rem]">Item</th>
                                            <th scope="col" className="text-start">Tracking No</th>
                                            <th scope="col" className="text-start">Price</th>
                                            <th scope="col" className="text-start">Quantity</th>
                                            <th scope="col" className="text-start">Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.order_items?.map((item: any) => (
                                            <tr key={item.id} className="border border-inherit border-solid dark:border-defaultborder/10">
                                                <td>
                                                    <div className="flex items-center">
                                                        <div className="me-4">
                                                            <span className="avatar avatar-xxl bg-light">
                                                                <img src={item.product.image.thumb} alt="" />
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className="mb-1 text-[0.875rem] font-semibold">
                                                                <Link href="#!" scroll={false}>{item.product.name}</Link>
                                                            </div>
                                                            {/* <div className="mb-1">
                                                                <span className="me-1">Dial Size:</span><span className="text-[#8c9097] dark:text-white/50 me-2">44mm</span>
                                                            </div>
                                                            <div className="mb-1">
                                                                <span className="me-1">Color:</span><span className="text-[#8c9097] dark:text-white/50 me-2">Metallic Black</span>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><Link href="#!" scroll={false} className="text-primary">SPK1218153635</Link></td>
                                                <td>
                                                    <span className="text-[0.9375rem] font-semibold">{formatPriceINR(item.price)}</span>
                                                </td>
                                                <td>{item.quantity}</td>
                                                <td>{formatPriceINR(item.total)}</td>
                                            </tr>
                                        ))}


                                        <tr className="border border-inherit border-solid dark:border-defaultborder/10">
                                            <td colSpan={2}></td>
                                            <td colSpan={2}>
                                                <div className="font-semibold">Total Items :</div>
                                            </td>
                                            <td>
                                            {String(data?.item_count).padStart(2, '0')}
                                            </td>
                                        </tr>
                                        {/* <tr className="border border-inherit border-solid dark:border-defaultborder/10">
                                            <td colSpan={2}></td>
                                            <td colSpan={2}>
                                                <div className="font-semibold">Sub Total :</div>
                                            </td>
                                            <td>
                                                $3,100
                                            </td>
                                        </tr>
                                        <tr className="border border-inherit border-solid dark:border-defaultborder/10">
                                            <td colSpan={2}></td>
                                            <td colSpan={2}>
                                                <div className="font-semibold">Applied Coupon :</div>
                                            </td>
                                            <td>
                                                <span className="badge bg-success/10 text-success">SPKFIR</span>
                                            </td>
                                        </tr>
                                        <tr className="border border-inherit border-solid dark:border-defaultborder/10">
                                            <td colSpan={2}></td>
                                            <td colSpan={2}>
                                                <div className="font-semibold">Delivery Fees :</div>
                                            </td>
                                            <td>
                                                <span className="text-danger">+$29</span>
                                            </td>
                                        </tr>
                                        <tr className="border border-inherit border-solid dark:border-defaultborder/10">
                                            <td colSpan={2}></td>
                                            <td colSpan={2}>
                                                <div className="font-semibold">Total Saved :</div>
                                            </td>
                                            <td>
                                                <span className="text-[0.875rem] font-semibold text-success">$3,799</span>
                                            </td>
                                        </tr> */}
                                        <tr>
                                            <td colSpan={2}></td>
                                            <td colSpan={2}>
                                                <div className="font-semibold">Total Price :</div>
                                            </td>
                                            <td>
                                                <span className="text-[1rem] font-semibold">{formatPriceINR(data.grand_total)}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="box-footer !border-t-0">
                            <div className="btn-list ltr:float-right rtl:float-left">
                                <ShippingLabelPrint recipientInfo={data.shipping_address} to={data.customer.name} orderNumber={data.order_number}/>
                                <button aria-label="button" type="button" className="ti-btn bg-primary text-white !py-1 !px-2 !font-medium me-2" onClick={() => print()}><i className="ri-printer-line me-1 align-middle inline-block"></i>Print</button>
                                <button aria-label="button" type="button" className="ti-btn bg-secondary text-white !py-1 !px-2 !font-medium"><i className="ri-share-forward-line me-1 align-middle inline-block"></i>Share Details</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                User Details
                            </div>
                        </div>
                        <div className="box-body !p-0">
                            <div className="flex items-center border-b border-dashed dark:border-defaultborder/10 p-3 flex-wrap">
                                <div className="me-2">
                                    <span className="avatar avatar-lg avatar-rounded">
                                        <img src="../../../assets/images/faces/9.jpg" alt="" />
                                    </span>
                                </div>
                                
                                <div className="flex-grow">
                                    <p className="mb-0">{data.customer.name}</p>
                                    <p className="mb-0 text-[#8c9097] dark:text-white/50 text-[0.75rem]">{data.customer.email}</p>
                                </div>
                                {/* <div>
                                    <span className="badge bg-primary/10 text-primary">Prime User</span>
                                </div> */}
                            </div>
                            <div className="p-4 border-b border-dashed dark:border-defaultborder/10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[0.875rem] font-semibold">Delivery address :</span>
                                    <button aria-label="button" type="button" className="ti-btn bg-primary ti-btn-sm text-white"><i className="ri-pencil-line"></i></button>
                                </div>
                                <p className="mb-2 text-[#8c9097] dark:text-white/50"><span className="font-semibold text-defaulttextcolor dark:text-defaulttextcolor/70">Landmark : </span>{data.shipping_address.landmark}</p>
                                <p className="mb-2 text-[#8c9097] dark:text-white/50"><span className="font-semibold text-defaulttextcolor dark:text-defaulttextcolor/70">City : </span>{data.shipping_address.city}</p>
                                <p className="mb-2 text-[#8c9097] dark:text-white/50"><span className="font-semibold text-defaulttextcolor dark:text-defaulttextcolor/70">State : </span>{data.shipping_address.state}</p>
                                <p className="mb-0 text-[#8c9097] dark:text-white/50"><span className="font-semibold text-defaulttextcolor dark:text-defaulttextcolor/70">Pin Code : </span>{data.shipping_address.pin_code}</p>
                            </div>
                            <div className="p-4 border-b border-dashed dark:border-defaultborder/10">
                                <div className="mb-4">
                                    <span className="text-[0.875rem] font-semibold">Send updates to :</span>
                                </div>
                                <p className="mb-2 text-[#8c9097] dark:text-white/50">
                                    <span className="font-semibold !text-defaulttextcolor dark:!text-defaulttextcolor/70">Phone : </span>
                                    {data.customer.mobile}
                                </p>
                                <p className="mb-0 text-[#8c9097] dark:text-white/50">
                                    <span className="font-semibold !text-defaulttextcolor dark:!text-defaulttextcolor/70">Email : </span>
                                    {data.customer.email}
                                </p>
                            </div>
                            <div className="p-4 border-b border-dashed dark:border-defaultborder/10">
                                <div className="mb-4">
                                    <span className="text-[0.875rem] font-semibold">Order Summary</span>
                                </div>
                                <p className="mb-2 text-[#8c9097] dark:text-white/50">
                                    <span className="font-semibold !text-defaulttextcolor dark:!text-defaulttextcolor/70">Ordered Date : </span>
                                    24,Nov 2022
                                </p>
                                <p className="mb-2 text-[#8c9097] dark:text-white/50">
                                    <span className="font-semibold !text-defaulttextcolor dark:!text-defaulttextcolor/70">Ordered Time : </span>
                                    11:47AM
                                </p>
                                <p className="mb-0 text-[#8c9097] dark:text-white/50">
                                    <span className="font-semibold !text-defaulttextcolor dark:!text-defaulttextcolor/70">Payment Interface : </span>
                                    UPI
                                </p>
                            </div>
                        </div>
                        <div className="box-footer">Total
                            <span className="text-success"> 294 items</span> purchased upto now
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Order Tracking
                            </div>
                            <div className="ms-auto text-success">#SPK1218153635</div>
                        </div>
                        <div className="box-body">
                            <div className="order-track">
                                <div className="hs-accordion-group" data-hs-accordion-always-open>
                                    <div className="hs-accordion active" id="order-heading-one">
                                        <Link href="#!" scroll={false} className="hs-accordion-toggle group pb-3 inline-flex items-center gap-x-3 w-full font-semibold text-start transition"
                                            aria-controls="order-collapse-one">
                                            <div className="flex mb-0">
                                                <div className="me-2">
                                                    <span className="avatar avatar-md avatar-rounded">
                                                        <img src="../../../assets/images/ecommerce/png/32.png" alt="" />
                                                    </span>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-semibold mb-0 text-[0.875rem]">Order Placed</p>
                                                    <span className="text-[0.6875rem] !font-normal text-success">Nov 03, 2022</span>
                                                </div>
                                            </div>
                                        </Link>
                                        <div id="order-collapse-one" className="space-y-3 hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="order-heading-one">
                                            <div className="accordion-body !pt-0 !ps-8">
                                                <div className="text-[0.6875rem]">
                                                    <p className="mb-0 ps-4">Order placed successfully by <Link href="#!" scroll={false} className="font-weight-semibold text-primary">Sansa Taylor</Link></p>
                                                    <span className="text-[#8c9097] dark:text-white/50 opacity-[0.5] ps-4">Nov 03, 2022, 15:36</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hs-accordion active" id="order-heading-two">
                                        <Link href="#!" scroll={false} className="hs-accordion-toggle group pb-3 inline-flex items-center gap-x-3 w-full font-semibold text-start transition"
                                            aria-controls="order-collapse-two">
                                            <div className="flex mb-0">
                                                <div className="me-2">
                                                    <span className="avatar avatar-md avatar-rounded">
                                                        <img src="../../../assets/images/ecommerce/png/33.png" alt="" />
                                                    </span>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-semibold mb-0 text-[0.875rem]">Picked</p>
                                                    <span className="text-[0.75rem] !font-normal">Nov 03, 15:10</span>
                                                </div>
                                            </div>
                                        </Link>
                                        <div id="order-collapse-two"
                                            className="space-y-3 hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                            aria-labelledby="order-heading-two">
                                            <div className="accordion-body !pt-0 !ps-8">
                                                <div className="text-[0.6875rem]">
                                                    <p className="mb-0 ps-4">Your order has been picked up by <span className="font-weight-semibold">Smart Good Services</span></p>
                                                    <span className="text-[#8c9097] dark:text-white/50 opacity-[0.5] ps-4">Nov 03, 2022, 15:36</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hs-accordion active" id="order-heading-three">
                                        <Link href="#!" scroll={false} className="hs-accordion-toggle group pb-3 inline-flex items-center gap-x-3 w-full font-semibold text-start transition" aria-controls="order-collapse-three">
                                            <div className="flex mb-0">
                                                <div className="me-2">
                                                    <span className="avatar avatar-md avatar-rounded">
                                                        <img src="../../../assets/images/ecommerce/png/34.png" alt="" />
                                                    </span>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-semibold mb-0 text-[0.875rem]">Shipping</p>
                                                    <span className="text-[0.75rem] !font-normal">Nov 03, 15:10</span>
                                                </div>
                                            </div>
                                        </Link>
                                        <div id="order-collapse-three"
                                            className="space-y-3 hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                            aria-labelledby="order-heading-three">
                                            <div className="accordion-body !pt-0 !ps-8">
                                                <div className="text-[0.6875rem] mb-4 ps-4">
                                                    <p className="mb-0">Arrived USA <span className="font-weight-semibold">SGS Warehouse</span></p>
                                                    <span className="text-[#8c9097] dark:text-white/50 opacity-[0.5]">Nov 03, 2022, 15:36</span>
                                                </div>
                                                <div className="text-[0.6875rem] mb-4 ps-4">
                                                    <p className="mb-0">picked up by <span className="font-weight-semibold">SGS Agent</span> and on the way to Hyderabad</p>
                                                    <span className="text-[#8c9097] dark:text-white/50 opacity-[0.5]">Nov 03, 2022, 15:36</span>
                                                </div>
                                                <div className="text-[0.6875rem] ps-4">
                                                    <p className="mb-0">Arrived in Hyderabad and expected Delivery is <span className="font-weight-semibold">Apr 16, 2022</span> </p>
                                                    <span className="text-[#8c9097] dark:text-white/50 opacity-[0.5]">Nov 03, 2022, 15:36</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hs-accordion" id="order-heading-four">
                                        <Link href="#!" scroll={false} className="hs-accordion-toggle group pb-3 inline-flex items-center gap-x-3 w-full font-semibold text-start transition">
                                            <div className="flex mb-0">
                                                <div className="me-2">
                                                    <span className="avatar avatar-md avatar-rounded bg-primary/10 !text-primary border !border-primary/10"><i className="fe fe-package text-[0.75rem]"></i></span>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-semibold mb-0 text-[0.875rem]">Out For Delivery</p>
                                                    <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] !font-normal">Nov 03, 15:10 (expected)</span>
                                                </div>
                                            </div>
                                        </Link>
                                        <div id="order-collapse-four"
                                            className="space-y-3 hs-accordion-content hidden  w-full overflow-hidden transition-[height] duration-300"
                                            aria-labelledby="order-heading-four">
                                            <div className="accordion-body !pt-0 !ps-8">
                                                <div className="text-[0.6875rem]">
                                                    <p className="mb-0 ps-4">Your order is out for devlivery</p>
                                                    <span className="text-[#8c9097] dark:text-white/50 opacity-[0.5] ps-4 !font-normal">Nov 03, 2022, 15:36 (expected)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hs-accordion" id="order-heading-five">
                                        <Link href="#!" scroll={false} className="group inline-flex items-center gap-x-3 w-full font-semibold text-start transition">
                                            <div className="flex mb-0">
                                                <div className="me-2">
                                                    <span className="avatar avatar-md avatar-rounded bg-primary/10 !text-primary border !border-primary/10"><i className="fe fe-package text-[0.75rem]"></i></span>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-semibold mb-0 text-[0.875rem]">Delivered</p>
                                                    <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50 !font-normal">Nov 03, 18:42</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
Orderdetails.layout = "Contentlayout"

export default Orderdetails