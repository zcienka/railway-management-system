import {createApi} from "@reduxjs/toolkit/query/react"
import {Locomotive} from "../types"
import BaseQuery from "../utils/baseQuery"

export const locomotivesApi = createApi({
    reducerPath: "locomotivesApi",
    baseQuery: BaseQuery,
    tagTypes: ["Locomotive"],
    endpoints: (builder) => ({
        getLocomotives: builder.query<Locomotive[], null>({
            query: () => ({
                url: "/locomotive",
                method: "GET",
            }),
            providesTags: ["Locomotive"]
        }),
        getSingleLocomotive: builder.query<Locomotive[], string | undefined>({
            query: (id) => ({
                url: `/locomotive/${id}`,
                method: "GET",
            }),
        }),
        deleteLocomotive: builder.mutation({
            query: (id) => ({
                url: `/locomotive/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Locomotive"]
        }),
        updateLocomotive: builder.mutation({
            query: (body) => ({
                url: "/locomotive",
                method: "PATCH",
                body: body
            }),
            invalidatesTags: ["Locomotive"]
        }),
        createLocomotive: builder.mutation({
            query: (body) => ({
                url: "/locomotive",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Locomotive"]
        }),
    }),
})

export const {
    useGetLocomotivesQuery,
    useGetSingleLocomotiveQuery,
    useDeleteLocomotiveMutation,
    useUpdateLocomotiveMutation
} = locomotivesApi