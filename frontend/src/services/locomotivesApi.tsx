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
        filterLocomotive: builder.mutation({
            query: (body) => ({
                url: "/locomotive/search",
                method: "GET",
                params: {databadaniamin : body.databadaniatechnicznegomin.toISOString().substring(0,10),
                        databadaniamax : body.databadaniatechnicznegomax.toISOString().substring(0,10), 
                        nazwa : body.nazwa}
            }),
            invalidatesTags: ["Locomotive"]
        }),
    }),
})

export const {
    useGetLocomotivesQuery,
    useGetSingleLocomotiveQuery,
    useDeleteLocomotiveMutation,
    useUpdateLocomotiveMutation,
    useCreateLocomotiveMutation
} = locomotivesApi