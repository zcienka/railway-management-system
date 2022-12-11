import {createApi} from "@reduxjs/toolkit/query/react"
import {TrainRoute} from "../types"
import BaseQuery from "../utils/baseQuery"

export const trainRouteApi = createApi({
    reducerPath: "trainRouteApi",
    baseQuery: BaseQuery,
    tagTypes: ["TrainRoute", "SingleTrainRoute"],
    endpoints: (builder) => ({
        getTrainRoutes: builder.query<TrainRoute[], null>({
            query: () => ({
                url: "/train-route",
                method: "GET",
            }),
            providesTags: ["TrainRoute"]
        }),
        getSingleTrainRoute: builder.query<TrainRoute[], string | undefined>({
            query: (id) => ({
                url: `/train-route/${id}`,
                method: "GET",
            }),
            providesTags: ["SingleTrainRoute"]
        }),
        deleteTrainRoute: builder.mutation({
            query: (id) => ({
                url: `/train-route/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TrainRoute"]
        }),
        updateTrainRoute: builder.mutation({
            query: (body) => ({
                url: "/train-route",
                method: "PATCH",
                body: body
            }),
            invalidatesTags: ["TrainRoute"]
        }),
        createTrainRoute: builder.mutation({
            query: (body) => ({
                url: "/train-route",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["TrainRoute"]
        }),
    }),
})

export const {
    useGetTrainRoutesQuery,
    useGetSingleTrainRouteQuery,
    useDeleteTrainRouteMutation,
    useUpdateTrainRouteMutation
} = trainRouteApi