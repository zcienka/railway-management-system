import {createApi} from "@reduxjs/toolkit/query/react"
import {TrainStop, Station} from "../types"
import BaseQuery from "../utils/baseQuery"

export const trainStopApi = createApi({
    reducerPath: "trainStopApi",
    baseQuery: BaseQuery,
    tagTypes: ["TrainStop", "SingleTrainStop", "TrainStopInLine"],
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
        filterTrainStop: builder.mutation({
            query: (body) => ({
                url: "/train-stop/filter",
                method: "GET",
                params: {numerprzystankumin: body.numerprzystankumin, numerprzystankumax: body.numerprzystankumax, 
                        nazwastacji: body.nazwastacji, idliniimin: body.idliniimin, idliniimax: body.idliniimax}
            }),
            invalidatesTags: ["TrainStop"]
        }),
    }),
})

export const {
    useGetTrainStopsQuery,
    useGetSingleTrainStopQuery,
    useDeleteTrainStopMutation,
    useUpdateTrainStopMutation,
    useCreateTrainStopMutation
} = trainStopApi