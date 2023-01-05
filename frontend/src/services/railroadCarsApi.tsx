import {createApi} from "@reduxjs/toolkit/query/react"
import {Discount, RailroadCar, RailroadCarSearch, SearchDiscount, SearchRailroadCar} from "../types"
import BaseQuery from "../utils/baseQuery"

export const railroadCarsApi = createApi({
    reducerPath: "railroadCarsApi",
    baseQuery: BaseQuery,
    tagTypes: ["RailroadCar", "SearchRailroadCar"],
    endpoints: (builder) => ({
        getRailroadCars: builder.query<RailroadCar[], null>({
            query: () => ({
                url: "/carriage",
                method: "GET",
            }),
            providesTags: ["RailroadCar"]
        }),
        getSingleRailroadCar: builder.query<RailroadCar[], string | undefined>({
            query: (id) => ({
                url: `/carriage/${id}`,
                method: "GET",
            }),
            providesTags: ["RailroadCar"]
        }),
        deleteRailroadCar: builder.mutation({
            query: (id) => ({
                url: `/carriage/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["RailroadCar"]
        }),
        updateRailroadCar: builder.mutation({
            query: (body) => ({
                url: "/carriage/update",
                method: "PATCH",
                params: {
                    id: body.id,
                    databadania: body.databadaniatechnicznego.toISOString().substring(0, 10),
                    liczbamiejsc: body.liczbamiejsc
                }
            }),
            invalidatesTags: ["RailroadCar"]
        }),
        createRailroadCar: builder.mutation({
            query: (body) => ({
                url: `/carriage/create`,
                method: "POST",
                params: {
                    databadania: body.databadaniatechnicznego.toISOString().substring(0, 10),
                    liczbamiejsc: body.liczbamiejsc
                }
            }),
            invalidatesTags: ["RailroadCar"]
        }),

        filterRailroadCar: builder.query<RailroadCar[], SearchRailroadCar>({
            query: (body) => ({
                url: "/carriage/search",
                method: "GET",
                params: body
            }),
            providesTags: ["SearchRailroadCar"]
        }),
    }),
})

export const {
    useGetRailroadCarsQuery,
    useGetSingleRailroadCarQuery,
    useDeleteRailroadCarMutation,
    useCreateRailroadCarMutation,
    useUpdateRailroadCarMutation,
    useFilterRailroadCarQuery
} = railroadCarsApi