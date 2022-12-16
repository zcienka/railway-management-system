import {createApi} from "@reduxjs/toolkit/query/react"
import {Train} from "../types"
import BaseQuery from "../utils/baseQuery"

export const trainsApi = createApi({
    reducerPath: "trainsApi",
    baseQuery: BaseQuery,
    tagTypes: ["Train", "SingleTrain"],
    endpoints: (builder) => ({
        getTrains: builder.query<Train[], null>({
            query: () => ({
                url: "/train",
                method: "GET",
            }),
            providesTags: ["Train"]
        }),
        getSingleTrain: builder.query<Train[], string | undefined>({
            query: (id) => ({
                url: `/train/${id}`,
                method: "GET",
            }),
            providesTags: ["SingleTrain"]
        }),
        deleteTrain: builder.mutation({
            query: (id) => ({
                url: `/train/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Train"]
        }),
        updateTrain: builder.mutation({
            query: (body) => ({
                url: "/train",
                method: "PATCH",
                body: body
            }),
            invalidatesTags: ["Train"]
        }),
        createTrain: builder.mutation({
            query: (body) => ({
                url: "/train",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Train"]
        }),


    }),
})

export const {
    useGetTrainsQuery,
    useGetSingleTrainQuery,
    useDeleteTrainMutation,
    useUpdateTrainMutation,
    useCreateTrainMutation
} = trainsApi