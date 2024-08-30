"use client"

import { useQuery } from "react-query"
import ProductForm from "../../ProductForm"
import api from "@/app/lib/axios";
import { useMemo } from "react";

const EditProduct = ({ params }: { params: { id: string } }) => {

    const { id } = params;

    const fetchProduct = async () => {
        try {
            const response = await api.get(`/products/${id}`)

            return response.data;
        } catch (error) {
            throw new Error('Fetch Error')
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['products-single', id],
        queryFn: fetchProduct
    });

    if (isLoading) {
        return <p>Loading....</p>
    }

    return <ProductForm editForm={true} initialData={data} />
}

export default EditProduct