import {createApi} from "@reduxjs/toolkit/query/react"
import {Locomotive, SearchLocomotive} from "../types"
import BaseQuery from "../utils/baseQuery"

export const locomotivesApi = createApi({
    reducerPath: "locomotivesApi",
    baseQuery: BaseQuery,
    tagTypes: ["Locomotive", "LocomotiveFilter", "SingleLocomotive"],
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
            providesTags: ["Locomotive"]
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
                url: "/locomotive/update",
                method: "PATCH",
                params: {id : body.id, databadania : body.databadaniatechnicznego.toISOString().substring(0,10), nazwa : body.nazwa}

            }),
            invalidatesTags: ["Locomotive"]
        }),
        createLocomotive: builder.mutation({
            query: (body) => ({
                url: "/locomotive/create",
                method: "POST",
                params: {databadania : body.databadaniatechnicznego.toISOString().substring(0,10), nazwa : body.nazwa}
            }),
            invalidatesTags: ["Locomotive"]
        }),
        filterLocomotive: builder.query<Locomotive[], SearchLocomotive>({
            query: (body) => ({
                url: "/locomotive/search",
                method: "GET",
                params: body,
            }),
            providesTags: ["LocomotiveFilter"]
        }),
    }),
})

export const {
    useGetLocomotivesQuery,
    useGetSingleLocomotiveQuery,
    useDeleteLocomotiveMutation,
    useUpdateLocomotiveMutation,
    useCreateLocomotiveMutation,
    useFilterLocomotiveQuery
} = locomotivesApi