import {createApi} from "@reduxjs/toolkit/query/react"
import {TrainRide, TrainStop} from "../types"
import BaseQuery from "../utils/baseQuery"

export const trainRideApi = createApi({
    reducerPath: "trainRideApi",
    baseQuery: BaseQuery,
    tagTypes: ["TrainRide", "SingleTrainRide", "StationByLine"],
    endpoints: (builder) => ({
        getTrainRides: builder.query<TrainRide[], null>({
            query: () => ({
                url: "/train-ride",
                method: "GET",
            }),
            providesTags: ["TrainRide"]
        }),
        getSingleTrainRide: builder.query<TrainRide[], string | undefined>({
            query: (id) => ({
                url: `/train-ride/${id}`,
                method: "GET",
            }),
            providesTags: ["SingleTrainRide"]
        }),
        getTrainStopByLine: builder.query<TrainStop[], string | null>({
            query: (id) => ({
                url: `/train-ride/${id}/station-by-line`,
                method: "GET",
            }),
            providesTags: ["StationByLine"]
        }),
        deleteTrainRide: builder.mutation({
            query: (id) => ({
                url: `/train-ride/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TrainRide"]
        }),
        updateTrainRide: builder.mutation({
            query: (body) => ({
                url: "/train-ride",
                method: "PATCH",
                body: body
            }),
            invalidatesTags: ["TrainRide"]
        }),
        createTrainRide: builder.mutation({
            query: (body) => ({
                url: "/train-ride",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["TrainRide"]
        }),
    }),
})

export const {
    useGetTrainRidesQuery,
    useGetSingleTrainRideQuery,
    useDeleteTrainRideMutation,
    useUpdateTrainRideMutation,
    useGetTrainStopByLineQuery
} = trainRideApi