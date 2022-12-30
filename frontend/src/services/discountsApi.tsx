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
                url: "/discount/update",
                method: "PATCH",
                params: {nazwa : body.nazwaznizki, procent : body.procentznizki, dokument : body.dokumentpotwierdzajacy}
            }),
            invalidatesTags: ["Discount"]
        }),
        createDiscount: builder.mutation({
            query: (body) => ({
                url: `/discount/create`,
                method: "POST",
                params: {nazwa : body.nazwaznizki, procent : body.procentznizki, dokument : body.dokumentpotwierdzajacy}
            }),
            invalidatesTags: ["Discount"]
        }),
        filterDiscount: builder.mutation({
            query: (body) => ({
                url: `/discount/search`,
                method: "GET",
                params: {nazwa : body.nazwaznizki, procentmin : body.procentznizkimin, procentmax : body.procentznizkimax, dokument : body.dokumentpotwierdzajacy}
            }),
            invalidatesTags: ["Discount"]
        }),
    }),
})

export const {
    useGetDiscountsQuery,
    useGetSingleDiscountQuery,
    useDeleteDiscountMutation,
    useCreateDiscountMutation,
    useUpdateDiscountMutation
} = discountsApi