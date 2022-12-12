import {createApi} from "@reduxjs/toolkit/query/react"
import {Station, TrainPassage, TrainStop} from "../types"
import BaseQuery from "../utils/baseQuery"

export const trainPassageApi = createApi({
    reducerPath: "trainPassageApi",
    baseQuery: BaseQuery,
    tagTypes: ["TrainPassage", "SingleTrainPassage", "StationByLine"],
    endpoints: (builder) => ({
        getTrainPassages: builder.query<TrainPassage[], null>({
            query: () => ({
                url: "/train-passage",
                method: "GET",
            }),
            providesTags: ["TrainPassage"]
        }),
        getSingleTrainPassage: builder.query<TrainPassage[], string | undefined>({
            query: (id) => ({
                url: `/train-passage/${id}`,
                method: "GET",
            }),
            providesTags: ["SingleTrainPassage"]
        }),
        getTrainStopByLine: builder.query<TrainStop[], string | null>({
            query: (id) => ({
                url: `/train-passage/${id}/station-by-line`,
                method: "GET",
            }),
            providesTags: ["StationByLine"]
        }),
        deleteTrainPassage: builder.mutation({
            query: (id) => ({
                url: `/train-passage/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TrainPassage"]
        }),
        updateTrainPassage: builder.mutation({
            query: (body) => ({
                url: "/train-passage",
                method: "PATCH",
                body: body
            }),
            invalidatesTags: ["TrainPassage"]
        }),
        createTrainPassage: builder.mutation({
            query: (body) => ({
                url: "/train-passage",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["TrainPassage"]
        }),
    }),
})

export const {
    useGetTrainPassagesQuery,
    useGetSingleTrainPassageQuery,
    useDeleteTrainPassageMutation,
    useUpdateTrainPassageMutation,
    useGetTrainStopByLineQuery
} = trainPassageApi