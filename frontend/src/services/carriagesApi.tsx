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
                url: "/carriage/update",
                method: "PATCH",
                params: {id : body.id, databadania : body.databadaniatechnicznego.toISOString().substring(0,10), liczbamiejsc : body.liczbamiejsc}
            }),
            invalidatesTags: ["Carriage"]
        }),
        createCarriage: builder.mutation({
            query: (body) => ({
                url: `/carriage/create`,
                method: "POST",
                params: {databadania : body.databadaniatechnicznego.toISOString().substring(0,10), liczbamiejsc : body.liczbamiejsc}
            }),
            invalidatesTags: ["Carriage"]
        }),
        filterCarriage: builder.mutation({
            query: (body) => ({
                url: `/carriage/search`,
                method: "GET",
                params: {databadaniamin : body.databadaniatechnicznegomin.toISOString().substring(0,10), 
                    databadaniamax : body.databadaniatechnicznegomax.toISOString().substring(0,10), 
                    liczbamiejscmin : body.liczbamiejscmin, 
                    liczbamiejscmax : body.liczbamiejscmax}
            }),
            invalidatesTags: ["Carriage"]
        }),
    }),
})

export const {
    useGetCarriagesQuery,
    useGetSingleCarriageQuery,
    useDeleteCarriageMutation,
    useCreateCarriageMutation,
    useUpdateCarriageMutation
} = carriagesApi