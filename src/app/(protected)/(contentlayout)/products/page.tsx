"use client"
import api from '@/app/lib/axios'
import { Productlistdata } from '@/shared/data/pages/ecommerces/productlistdata'
import Pageheader from '@/shared/layout-components/page-header/pageheader'
import Seo from '@/shared/layout-components/seo/seo'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { DateTime } from 'luxon';
import { formatDate, formatPriceINR } from '@/app/lib/helpers'
import Modal from '@/components/ui/modal/modal'
import Button from '@/components/ui/button/button'
import { toast } from 'react-toastify'

const Products = () => {

  const queryClient = useQueryClient();
  const [ListData, setListData] = useState([...Productlistdata]);

  const [isOpenDeleteDialogue, setIsOpenDeleteDialogue] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | number>(null);

  const getProducts = async (page = 1) => {
    try {
      const res = await api.get(`/products?page=${page}`);
      return res.data
    } catch (error) {
      throw new Error('Product fetch failed')
    }
  }
  const [page, setPage] = useState(1);

  const { data: products, error, isError, isLoading } = useQuery(['products-list', page],
    () => getProducts(page),
    {
      keepPreviousData: true,
    }
  )

  const handleConfirmDelete = async () => {
    try {
      const res = await api.delete(`/products/${selectedItem}`);
      return res.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      toast(errorMessage, {
        type: "error"
      })
    }
    setIsOpenDeleteDialogue(false)

  };

  const deleteMutation = useMutation(handleConfirmDelete, {
    onSuccess: (res) => {
      setSelectedItem(null);
      setIsOpenDeleteDialogue(false)
      toast(res.message, {
        type: "success"
      })
      // Invalidate and refetch the 'items' query after successful deletion
      queryClient.invalidateQueries(['products-list', page]);
    },
  });



  const handleDeleteDialog = (idToRemove: number) => {
    setSelectedItem(idToRemove);
    setIsOpenDeleteDialogue(true)

  };

  const [selectAllChecked, setSelectAllChecked] = useState(false);

  // Create a state variable to track selected items
  const [selectedItems, setSelectedItems] = useState<any>([]);

  // Function to handle the "Select All" checkbox click event
  const handleSelectAllClick = () => {
    setSelectAllChecked(!selectAllChecked);

    // Update the state of individual checkboxes in the tbody
    if (selectAllChecked) {
      setSelectedItems([]);
    } else {
      const allIds = ListData.map((item) => item.id);
      setSelectedItems(allIds);
    }
  };

  // Function to handle individual checkbox clicks
  const handleCheckboxClick = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item: number) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }

    // Check if all individual checkboxes are selected and update the "Select All" checkbox accordingly
    const allSelected = selectedItems.length === ListData.length;
    setSelectAllChecked(allSelected);
  };

  const renderPaginationItems = () => {
    const totalPages = products?.last_page || 1;
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

  if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error: {error.message}</div>;
  return (
    <Fragment>
      <Seo title={"Products List"} />
      <Pageheader currentpage="Products List" activepage="Ecommerce" mainpage="Products List" />
      <div className="grid grid-cols-12 gap-6">
        <div className="xl:col-span-12 col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="box-title">
                Products List
              </div>
            </div>
            <div className="box-body">
              <div className="table-responsive mb-4">
                <table className="table whitespace-nowrap table-bordered min-w-full">
                  <thead>
                    <tr>
                      <th scope="col" className="!text-start">
                        <input className="form-check-input check-all" onChange={handleSelectAllClick}
                          checked={selectAllChecked} type="checkbox" id="all-products" defaultValue="" aria-label="..." />
                      </th>
                      <th scope="col" className="text-start">Product</th>
                      <th scope="col" className="text-start">Category</th>
                      <th scope="col" className="text-start">Price</th>
                      <th scope="col" className="text-start">Stock</th>
                      <th scope="col" className="text-start">Author</th>
                      <th scope="col" className="text-start">Published</th>
                      <th scope="col" className="text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading &&
                      (products?.data?.map((product: any) => (
                        <tr className="product-list" key={product.id}>
                          <td className="product-checkbox"><input className="form-check-input" type="checkbox" id={product.id.toString()}
                            defaultValue=""
                            aria-label="..."
                            onChange={() => handleCheckboxClick(product.id)}
                            checked={selectedItems.includes(product.id)} /></td>
                          <td>
                            <div className="flex items-center">
                              <div className="me-2">
                                <span className="avatar avatar-md avatar-rounded">
                                  <img src={product.image?.thumb} alt="" />
                                </span>
                              </div>
                              <div className="font-semibold">
                                {product.name}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className='flex gap-1'>
                              {product.categories?.map((category: any) => (
                                <span key={`category-${category.id}`} className="badge bg-light text-default">{category.name}</span>
                              ))}
                            </div>
                          </td>
                          <td>{formatPriceINR(product.price)}</td>
                          <td>{product.status}</td>
                          <td>{product.author.name}</td>
                          <td>{formatDate(product.created_at)}</td>
                          <td>
                            <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
                              <Link aria-label="anchor" href={`/products/edit/${product.id}`}
                                className="ti-btn ti-btn-wave  !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-info/10 text-info hover:bg-info hover:text-white hover:border-info"><i
                                  className="ri-pencil-line"></i></Link>
                              <Link aria-label="anchor" href="#!" scroll={false} onClick={() => handleDeleteDialog(product.id)}
                                className="ti-btn ti-btn-wave product-btn !gap-0 !m-0 !h-[1.75rem] !w-[1.75rem] text-[0.8rem] bg-danger/10 text-danger hover:bg-danger hover:text-white hover:border-danger"><i
                                  className="ri-delete-bin-line"></i></Link>
                            </div>
                          </td>
                        </tr>
                      )))}
                  </tbody>
                </table>
              </div>
              {/* <div className="sm:flex items-center justify-between flex-wrap">
                <nav aria-label="Page navigation" className="">
                  <ul className="ti-pagination mb-0 flex flex-row rounded-sm text-[1rem] !ps-0">
                    <li className="page-item disabled">
                      <Link className="page-link !py-[0.375rem] !px-[0.75rem]" href="#!" scroll={false} onClick={}>
                        Previous
                      </Link>
                    </li>
                    <li className="page-item active"><Link className="page-link !py-[0.375rem] !px-[0.75rem]" href="#!" scroll={false}>1</Link></li>
                    <li className="page-item"><Link className="page-link !py-[0.375rem] !px-[0.75rem]" href="#!" scroll={false}>2</Link></li>
                    <li className="page-item sm:block hidden "><Link className="page-link !py-[0.375rem] !px-[0.75rem]" href="#!" scroll={false}>3</Link></li>
                    <li className="page-item">
                      <Link className="page-link !text-primary !py-[0.375rem] !px-[0.75rem]" href="#!" scroll={false}>
                        next
                      </Link>
                    </li>
                  </ul>
                </nav>

              </div> */}
              <div className="sm:flex items-center justify-between flex-wrap">
                <nav aria-label="Page navigation">
                  <ul className="ti-pagination mb-0 flex flex-row rounded-sm text-[1rem] !ps-0">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                      <button className="page-link !py-[0.375rem] !px-[0.75rem]" onClick={() => setPage(prev => Math.max(prev - 1, 1))}>
                        Previous
                      </button>
                    </li>
                    {renderPaginationItems()}
                    <li className={`page-item ${page === products?.last_page ? 'disabled' : ''}`}>
                      <button className="page-link !text-primary !py-[0.375rem] !px-[0.75rem]" onClick={() => setPage(prev => prev < products?.last_page ? prev + 1 : prev)}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpenDeleteDialogue} onClose={() => setIsOpenDeleteDialogue(false)} title='Confirmation'>
        <div className='flex flex-col justify-center items-center'>
          <i className="ri-information-line text-3xl"></i>
          <p>Are you sure you want to delete this item?</p>
        </div>
        <div className='flex justify-end gap-2 mt-4 w-full'>
          <Button onClick={() => setIsOpenDeleteDialogue(false)}>Cancel</Button>
          <Button color='danger' disabled={deleteMutation.isLoading} loading={deleteMutation.isLoading} onClick={deleteMutation.mutate}>Delete</Button>
        </div>
      </Modal>
    </Fragment>
  )
}

export default Products
