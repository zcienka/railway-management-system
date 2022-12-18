import {createApi} from "@reduxjs/toolkit/query/react"
import {RailroadCar, RailroadCarResponse} from "../types"
import BaseQuery from "../utils/baseQuery"

export const railroadCarsApi = createApi({
    reducerPath: "railroadCarsApi",
    baseQuery: BaseQuery,
    tagTypes: ["RailroadCar"],
    endpoints: (builder) => ({
        getRailroadCars: builder.query<RailroadCarResponse[], null>({
            query: () => ({
                url: "/railroad-car",
                method: "GET",
            }),
            providesTags: ["RailroadCar"]
        }),
        getSingleRailroadCar: builder.query<RailroadCarResponse[], { trainId: string | undefined, carId: string | undefined }>({
            query: (body) => ({
                url: `/railroad-car/${body.trainId}/${body.carId}`,
                method: "GET",
            }),
        }),
        deleteRailroadCar: builder.mutation({
            query: (id) => ({
                url: `/railroad-car/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["RailroadCar"]
        }),
        updateRailroadCar: builder.mutation({
            query: (body) => ({
                url: "/railroad-car",
                method: "PATCH",
                body: body
            }),
            invalidatesTags: ["RailroadCar"]
        }),
        createRailroadCar: builder.mutation({
            query: (body) => ({
                url: "/railroad-car",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["RailroadCar"]
        }),
    }),
})

export const {
    useGetRailroadCarsQuery,
    useGetSingleRailroadCarQuery,
    useDeleteRailroadCarMutation,
    useUpdateRailroadCarMutation,
    useCreateRailroadCarMutation
} = railroadCarsApi