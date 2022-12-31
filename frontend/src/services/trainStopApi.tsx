import {createApi} from "@reduxjs/toolkit/query/react"
import {TrainStop, Station, SearchTrainStop} from "../types"
import BaseQuery from "../utils/baseQuery"

export const trainStopApi = createApi({
    reducerPath: "trainStopApi",
    baseQuery: BaseQuery,
    tagTypes: ["TrainStop", "SingleTrainStop", "TrainStopInLine", "SearchTrainStop"],
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
                url: "/train-stop/update",
                method: "PATCH",
                params: {numerprzystanku: body.numerprzystanku, nazwastacji: body.nazwastacji, idlinii: body.idlinii}
            }),
            invalidatesTags: ["TrainStop"]
        }),
        createTrainStop: builder.mutation({
            query: (body) => ({
                url: "/train-stop/create",
                method: "POST",
                params: {numerprzystanku: body.numerprzystanku, nazwastacji: body.nazwastacji, idlinii: body.idlinii}
            }),
            invalidatesTags: ["TrainStop"]
        }),
        filterTrainStop: builder.query<TrainStop[], SearchTrainStop>({
            query: (body) => ({
                url: "/train-stop/search",
                method: "GET",
                params: body,
            }),
            providesTags: ["SearchTrainStop"]
        }),
    }),
})

export const {
    useGetTrainStopsQuery,
    useGetSingleTrainStopQuery,
    useDeleteTrainStopMutation,
    useUpdateTrainStopMutation,
    useCreateTrainStopMutation,
    useFilterTrainStopQuery
} = trainStopApi