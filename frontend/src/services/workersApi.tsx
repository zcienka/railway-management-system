import {createApi} from "@reduxjs/toolkit/query/react"
import {SearchWorker, Worker} from "../types"
import BaseQuery from "../utils/baseQuery"

export const workersApi = createApi({
    reducerPath: "workersApi",
    baseQuery: BaseQuery,
    tagTypes: ["Worker", "SearchWorker"],
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
        getConductors: builder.query<Worker[], string | null>({
            query: () => ({
                url: `/worker/conductors`,
                method: "GET",
            }),
        }),
        getDrivers: builder.query<Worker[], string | null>({
            query: () => ({
                url: `/worker/drivers`,
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
                url: "/worker/update",
                method: "PATCH",
                params: {id: body.id, imie: body.imie, nazwisko: body.nazwisko, placa: body.placa, zawod: body.zawod}
            }),
            invalidatesTags: ["Worker"]
        }),
        createWorker: builder.mutation({
            query: (body) => ({
                url: "/worker/create",
                method: "POST",
                params: {imie: body.imie, nazwisko: body.nazwisko, placa: body.placa, zawod: body.zawod}
            }),
            invalidatesTags: ["Worker"]
        }),
        filterWorker: builder.query<Worker[], SearchWorker>({
            query: (body) => ({
                url: "/worker/search",
                method: "GET",
                params: body
            }),
            providesTags: ["SearchWorker"]
        }),
    }),
})

export const {
    useGetWorkersQuery,
    useGetSingleWorkerQuery,
    useDeleteWorkerMutation,
    useUpdateWorkerMutation,
    useCreateWorkerMutation,
    useGetConductorsQuery,
    useGetDriversQuery,
    useFilterWorkerQuery
} = workersApi