import {createApi} from "@reduxjs/toolkit/query/react"
import {Carriage} from "../types"
import BaseQuery from "../utils/baseQuery"

export const carriagesApi = createApi({
    reducerPath: "carriagesApi",
    baseQuery: BaseQuery,
    tagTypes: ["Carriage"],
    endpoints: (builder) => ({
        getCarriages: builder.query<Carriage[], null>({
            query: () => ({
                url: "/carriage",
                method: "GET",
            }),
            providesTags: ["Carriage"]
        }),
        getSingleCarriage: builder.query<Carriage[], string | undefined>({
            query: (id) => ({
                url: `/carriage/${id}`,
                method: "GET",
            }),
        }),
        deleteCarriage: builder.mutation({
            query: (id) => ({
                url: `/carriage/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Carriage"]
        }),
        updateCarriage: builder.mutation({
            query: (body) => ({
                url: "/carriage",
                method: "PATCH",
                body: body
            }),
            invalidatesTags: ["Carriage"]
        }),
        createCarriage: builder.mutation({
            query: (body) => ({
                url: "/carriage",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Carriage"]
        }),
    }),
})

export const {
    useGetCarriagesQuery,
    useGetSingleCarriageQuery,
    useDeleteCarriageMutation,
    useUpdateCarriageMutation
} = carriagesApi