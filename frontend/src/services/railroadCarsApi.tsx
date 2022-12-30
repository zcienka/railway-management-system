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
            query: (body) => ({
                url: `/railroad-car/${body.idpociagu}/${body.idwagonu}`,
                method: "DELETE",
            }),
            invalidatesTags: ["RailroadCar"]
        }),
        updateRailroadCar: builder.mutation({
            query: (body) => ({
                url: "/railroad-car/update",
                method: "PATCH",
                params: {nrwagonu : body.numerwagonu, idwagonu : body.idwagonu, idpociagu : body.idpociagu}
            }),
            invalidatesTags: ["RailroadCar"]
        }),
        createRailroadCar: builder.mutation({
            query: (body) => ({
                url: "/railroad-car/create",
                method: "POST",
                params: {nrwagonu : body.numerwagonu, idwagonu : body.idwagonu, idpociagu : body.idpociagu}
            }),
            invalidatesTags: ["RailroadCar"]
        }),
        filterRailroadCar: builder.mutation({
            query: (body) => ({
                url: "/railroad-car/search",
                method: "GET",
                params: {idwagonumin : body.idwagonumin, idwagonumax : body.idwagonumax, idpociagumin : body.idpociagumin, idpociagumax : body.idpociagumax}
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