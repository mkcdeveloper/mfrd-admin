"use client"
import api from '@/app/lib/axios'
import { formatPriceINR } from '@/app/lib/helpers'
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import { DateTime } from 'luxon'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'

const Orders = () => {

    const [page, setPage] = useState(1);

    const getOrders = async (page = 1) => {
        try {
            const res = await api.get(`/orders?page=${page}&limit=${12}`);
            return res.data
        } catch (error) {
            throw new Error('Order fetch failed')
        }
    }

    const { data: orders, error, isError, isLoading } = useQuery(['orders-list', page],
        () => getOrders(page),
        {
            keepPreviousData: true,
        }
    )

    const renderPaginationItems = () => {
        const totalPages = orders?.last_page || 1;
        const items = [];
        const maxVisiblePages = 3;

        let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <li key={i} className={`page-item ${i === page ? 'active' : ''}`}>
                    <Link className="page-link !py-[0.375rem] !px-[0.75rem]" href="#" onClick={() => setPage(i)}>
                        {i}
                    </Link>
                </li>
            );
        }

        return items;
    };

    const renderStatus = (status: string) => {

        let color
        switch (status) {
            case 'delivered':
                color = 'orange-500'
                break;
            case 'dispatched':
                color = 'warning'
                break;
            case 'canceled':
                color = 'danger'
                break;
            default:
                color = 'success'

        }



        return (
            <div><span className="text-[#8c9097] dark:text-white/50 me-2">Status :</span><span className={`capitalize badge bg-${color}/10 text-${color}`}>{status}</span></div>
        )
    }

    if (isLoading) return <div>Loading...</div>;

    return (
        <Fragment>
            <Seo title={"Orders"} />
            <Pageheader currentpage="Orders" activepage="Ecommerce" mainpage="Orders" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-body flex items-center flex-wrap">
                            <div className="flex-grow">
                                <span className="mb-0 text-[0.875rem] text-[#8c9097] dark:text-white/50">Total number of orders placed upto now : <span className="font-semibold text-success">{String(orders?.total).padStart(2, '0')}</span></span>
                            </div>
                            <div className="hs-dropdown ti-dropdown">
                                {/* <Link href="#!" scroll={false}
                                    className="ti-btn ti-btn-light sm:!m-0 !mb-3 !gap-0 !font-medium dark:text-defaulttextcolor/70"
                                    aria-expanded="false">
                                    Sort By<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                                </Link> */}
                                <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        href="#!" scroll={false}>Date</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        href="#!" scroll={false}>Price</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                        href="#!" scroll={false}>Category</Link></li>
                                </ul>
                            </div>
                            <div className="flex items-center ms-2" role="search">
                                <input className="form-control !rounded-sm me-2 dark:text-defaulttextcolor/70" type="search" placeholder="Search" aria-label="Search" />
                                <button className="ti-btn ti-btn-light dark:text-defaulttextcolor/70 !mb-0" type="submit">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                {orders?.data.map((order: any) => (
                    <div className="xl:col-span-6 xxl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                        <div className="box">
                            <div className="box-header block !justify-start">
                                <div className="sm:flex block items-center w-full">
                                    {/* <div className="me-2">
                                        <span className="avatar bg-light avatar-md mb-1">
                                            <img src="../../../assets/images/ecommerce/png/1.png" alt="" />
                                        </span>
                                    </div> */}
                                    <div className="flex-grow">
                                        <Link href={`/orders/${order.id}`} scroll={false}>
                                            <span className="text-[0.875rem] font-semibold">{order.shipping_address.full_name}</span>
                                        </Link>
                                        <span className="block text-success">{formatPriceINR(order.grand_total)}</span>
                                    </div>
                                    <div className="sm:text-center">
                                        <span className="text-[0.875rem] font-semibold">Order Id :</span>
                                        <span className="sm:block">#{order.order_number}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="box-body">
                                <div className="flex items-center">
                                    <div className="orders-delivery-address">
                                        <p className="mb-1 font-semibold">Delivery Address</p>
                                        <p className="text-[#8c9097] dark:text-white/50 mb-0 ">
                                            {order.shipping_address.full_name}, {order.shipping_address.address}, {order.shipping_address.landmark}, {order.shipping_address.city}, {order.shipping_address.state}, {order.shipping_address.pin_code}
                                        </p>
                                    </div>
                                    <div className="delivery-date text-center ms-auto">
                                        <span className="text-[1.125rem] text-primary font-bold">{DateTime.fromISO(order.created_at).day}</span>
                                        <span className="font-semibold">{DateTime.fromISO(order.created_at).monthShort}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="box-footer sm:flex block items-center w-full justify-between">
                                {renderStatus(order?.status)}
                                <div className="sm:mt-0 mt-2">
                                    <button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-danger">Cancel Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <ul className="ti-pagination !px-3 !py-[0.375rem] !text-[1rem] !mb-4 flex justify-end">
                <li className="page-item disabled">
                    <Link href="#!" scroll={false} className="page-link !px-3 !py-[0.375rem]">Previous</Link>
                </li>
                <li className="page-item">
                    <Link className="page-link !px-3 !py-[0.375rem]" href="#!" scroll={false}>1</Link>
                </li>
                <li className="page-item">
                    <Link className="page-link !px-3 !py-[0.375rem]" href="#!" scroll={false}>2</Link>
                </li>
                <li className="page-item">
                    <Link className="page-link !px-3 !py-[0.375rem]" href="#!" scroll={false}>3</Link>
                </li>
                <li className="page-item">
                    <Link className="page-link !px-3 !py-[0.375rem]" href="#!" scroll={false}>Next</Link>
                </li>
            </ul>
        </Fragment>
    )
}

export default Orders