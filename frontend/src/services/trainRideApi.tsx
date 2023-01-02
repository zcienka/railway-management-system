import {createApi} from "@reduxjs/toolkit/query/react"
import {SearchTrainRide, TrainRide, TrainRideResponse, TrainStop} from "../types"
import BaseQuery from "../utils/baseQuery"

export const trainRideApi = createApi({
    reducerPath: "trainRideApi",
    baseQuery: BaseQuery,
    tagTypes: ["TrainRide", "SingleTrainRide", "StationByLine", "SearchTrainRide"],
    endpoints: (builder) => ({
        getTrainRides: builder.query<TrainRideResponse[], null>({
            query: () => ({
                url: "/train-ride",
                method: "GET",
            }),
            providesTags: ["TrainRide"]
        }),
        getSingleTrainRide: builder.query<TrainRideResponse[], string | undefined>({
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
                url: "/train-ride/update",
                method: "PATCH",
                params: {id: body.id, dataodjazdu: body.dataodjazdu.toISOString(), dataprzyjazdu: body.dataprzyjazdu.toISOString(),
                    idkonduktora: body.idkonduktora, idmaszynisty: body.idmaszynisty, idliniiprzejazdu: body.idliniiprzejazdu, idpociagu: body.idpociagu}
            }),
            invalidatesTags: ["TrainRide"]
        }),
        createTrainRide: builder.mutation({
            query: (body) => ({
                url: "/train-ride/create",
                method: "POST",
                params: body
            }),
            invalidatesTags: ["TrainRide"]
        }),
        filterTrainRide: builder.query<TrainRideResponse[], SearchTrainRide>({
            query: (body) => ({
                url: "/train-ride/search",
                method: "GET",
                params: body
            }),
            providesTags: ["SearchTrainRide"]
        })
    }),
})

export const {
    useGetTrainRidesQuery,
    useGetSingleTrainRideQuery,
    useDeleteTrainRideMutation,
    useUpdateTrainRideMutation,
    useGetTrainStopByLineQuery,
    useCreateTrainRideMutation,
    useFilterTrainRideQuery
} = trainRideApi