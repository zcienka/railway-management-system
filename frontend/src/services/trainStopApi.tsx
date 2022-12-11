import {createApi} from "@reduxjs/toolkit/query/react"
import {TrainStop} from "../types"
import BaseQuery from "../utils/baseQuery"

export const trainStopApi = createApi({
    reducerPath: "trainStopApi",
    baseQuery: BaseQuery,
    tagTypes: ["TrainStop", "SingleTrainStop"],
    endpoints: (builder) => ({
        getTrainStops: builder.query<TrainStop[], null>({
            query: () => ({
                url: "/train-stop",
                method: "GET",
            }),
            providesTags: ["TrainStop"]
        }),
        getSingleTrainStop: builder.query<TrainStop[], string | undefined>({
            query: (id) => ({
                url: `/train-stop/${id}`,
                method: "GET",
            }),
            providesTags: ["SingleTrainStop"]
        }),
        deleteTrainStop: builder.mutation({
            query: (id) => ({
                url: `/train-stop/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TrainStop"]
        }),
        updateTrainStop: builder.mutation({
            query: (body) => ({
                url: "/train-stop",
                method: "PATCH",
                body: body
            }),
            invalidatesTags: ["TrainStop"]
        }),
        createTrainStop: builder.mutation({
            query: (body) => ({
                url: "/train-stop",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["TrainStop"]
        }),
    }),
})

export const {
    useGetTrainStopsQuery,
    useGetSingleTrainStopQuery,
    useDeleteTrainStopMutation,
    useUpdateTrainStopMutation
} = trainStopApi