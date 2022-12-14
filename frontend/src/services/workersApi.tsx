import {createApi} from "@reduxjs/toolkit/query/react"
import {Worker} from "../types"
import BaseQuery from "../utils/baseQuery"

export const workersApi = createApi({
    reducerPath: "workersApi",
    baseQuery: BaseQuery,
    tagTypes: ["Worker"],
    endpoints: (builder) => ({
        getWorkers: builder.query<Worker[], null>({
            query: () => ({
                url: "/worker",
                method: "GET",
            }),
            providesTags: ["Worker"]
        }),
        getSingleWorker: builder.query<Worker[], string | undefined>({
            query: (id) => ({
                url: `/worker/${id}`,
                method: "GET",
            }),
        }),
        deleteWorker: builder.mutation({
            query: (id) => ({
                url: `/worker/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Worker"]
        }),
        updateWorker: builder.mutation({
            query: (body) => ({
                url: "/worker",
                method: "PATCH",
                body: body.reservation
            }),
            invalidatesTags: ["Worker"]
        }),
        createWorker: builder.mutation({
            query: (body) => ({
                url: "/worker",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Worker"]
        }),
    }),
})

export const {
    useGetWorkersQuery,
    useGetSingleWorkerQuery,
    useDeleteWorkerMutation,
    useUpdateWorkerMutation
} = workersApi