import {createApi} from "@reduxjs/toolkit/query/react"
import {RailroadCarInTheTrainResponse} from "../types"
import BaseQuery from "../utils/baseQuery"

export const railroadCarsInTheTrainApi = createApi({
    reducerPath: "railroadCarsInTheTrainApi",
    baseQuery: BaseQuery,
    tagTypes: ["RailroadCarInTheTrain", "SearchRailroadCarInTheTrain"],
    endpoints: (builder) => ({
        getRailroadCarsInTheTrain: builder.query<RailroadCarInTheTrainResponse[], null>({
            query: () => ({
                url: "/railroad-car",
                method: "GET",
            }),
            providesTags: ["RailroadCarInTheTrain"]
        }),
        getSingleRailroadCarInTheTrain: builder.query<RailroadCarInTheTrainResponse[], { trainId: string | undefined, carId: string | undefined }>({
            query: (body) => ({
                url: `/railroad-car/${body.trainId}/${body.carId}`,
                method: "GET",
            }),
            providesTags: ["RailroadCarInTheTrain"]
        }),
        deleteRailroadCarInTheTrain: builder.mutation({
            query: (body) => ({
                url: `/railroad-car/${body.idpociagu}/${body.idwagonu}`,
                method: "DELETE",
            }),
            invalidatesTags: ["RailroadCarInTheTrain"]
        }),
        updateRailroadCarInTheTrain: builder.mutation({
            query: (body) => ({
                url: "/railroad-car/update",
                method: "PATCH",
                params: {nrwagonu : body.numerwagonu, idwagonu : body.idwagonu, idpociagu : body.idpociagu}
            }),
            invalidatesTags: ["RailroadCarInTheTrain"]
        }),
        createRailroadCarInTheTrain: builder.mutation({
            query: (body) => ({
                url: "/railroad-car/create",
                method: "POST",
                params: {nrwagonu : body.numerwagonu, idwagonu : body.idwagonu, idpociagu : body.idpociagu}
            }),
            invalidatesTags: ["RailroadCarInTheTrain"]
        }),
        filterRailroadCarInTheTrain: builder.query({
            query: (body) => ({
                url: "/railroad-car/search",
                method: "GET",
                params: body
            }),
            providesTags: ["SearchRailroadCarInTheTrain"]
        }),
    }),
})

export const {
    useGetRailroadCarsInTheTrainQuery,
    useGetSingleRailroadCarInTheTrainQuery,
    useDeleteRailroadCarInTheTrainMutation,
    useUpdateRailroadCarInTheTrainMutation,
    useCreateRailroadCarInTheTrainMutation,
    useFilterRailroadCarInTheTrainQuery
} = railroadCarsInTheTrainApi