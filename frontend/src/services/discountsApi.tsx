import {createApi} from "@reduxjs/toolkit/query/react"
import {Discount} from "../types"
import BaseQuery from "../utils/baseQuery"

export const discountsApi = createApi({
    reducerPath: "discountsApi",
    baseQuery: BaseQuery,
    tagTypes: ["Discount"],
    endpoints: (builder) => ({
        getDiscounts: builder.query<Discount[], null>({
            query: () => ({
                url: "/discount",
                method: "GET",
            }),
            providesTags: ["Discount"]
        }),
        getSingleDiscount: builder.query<Discount[], string | undefined>({
            query: (id) => ({
                url: `/discount/${id}`,
                method: "GET",
            }),
        }),
        deleteDiscount: builder.mutation({
            query: (id) => ({
                url: `/discount/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Discount"]
        }),
        updateDiscount: builder.mutation({
            query: (body) => ({
                url: "/discount",
                method: "PATCH",
                body: body.reservation
            }),
            invalidatesTags: ["Discount"]
        }),
        createDiscount: builder.mutation({
            query: (body) => ({
                url: "/discount",
                method: "POST",
                body: body.reservation
            }),
            invalidatesTags: ["Discount"]
        }),
    }),
})

export const {
    useGetDiscountsQuery,
    useGetSingleDiscountQuery,
    useDeleteDiscountMutation,
    useUpdateDiscountMutation
} = discountsApi