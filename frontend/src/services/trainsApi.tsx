import {createApi} from "@reduxjs/toolkit/query/react"
import {SearchTrain, Train} from "../types"
import BaseQuery from "../utils/baseQuery"

export const trainsApi = createApi({
    reducerPath: "trainsApi",
    baseQuery: BaseQuery,
    tagTypes: ["Train", "SingleTrain", "TrainSearch"],
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
                url: "/train/update",
                method: "PATCH",
                params: {id : body.id, nazwa : body.nazwa, idlokomotywy : body.idlokomotywy}
            }),
            invalidatesTags: ["Train"]
        }),
        createTrain: builder.mutation({
            query: (body) => ({
                url: "/train/create",
                method: "POST",
                params: {nazwa : body.nazwa, idlokomotywy : body.idlokomotywy}
            }),
            invalidatesTags: ["Train"]
        }),
        filterTrain: builder.query<Train[], SearchTrain>({
            query: (body) => ({
                url: "/train/search",
                method: "GET",
                params: body
            }),
            providesTags: ["TrainSearch"]
        }),

    }),
})

export const {
    useGetTrainsQuery,
    useGetSingleTrainQuery,
    useDeleteTrainMutation,
    useUpdateTrainMutation,
    useCreateTrainMutation,
    useFilterTrainQuery
} = trainsApi