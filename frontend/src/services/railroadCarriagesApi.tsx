import {createApi} from "@reduxjs/toolkit/query/react"
import {RailroadCarriage} from "../types"
import BaseQuery from "../utils/baseQuery"

export const railroadCarriagesApi = createApi({
    reducerPath: "railroadCarriagesApi",
    baseQuery: BaseQuery,
    tagTypes: ["RailroadCarriage"],
    endpoints: (builder) => ({
        getRailroadCarriages: builder.query<RailroadCarriage[], null>({
            query: () => ({
                url: "/railroad-carriage",
                method: "GET",
            }),
            providesTags: ["RailroadCarriage"]
        }),
        getSingleRailroadCarriage: builder.query<RailroadCarriage[], {trainId: string|undefined, carriageId: string|undefined}>({
            query: (body) => ({
                url: `/railroad-carriage/${body.trainId}/${body.carriageId}`,
                method: "GET",
            }),
        }),
        deleteRailroadCarriage: builder.mutation({
            query: (id) => ({
                url: `/railroad-carriage/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["RailroadCarriage"]
        }),
        updateRailroadCarriage: builder.mutation({
            query: (body) => ({
                url: "/railroad-carriage",
                method: "PATCH",
                body: body
            }),
            invalidatesTags: ["RailroadCarriage"]
        }),
        createRailroadCarriage: builder.mutation({
            query: (body) => ({
                url: "/railroad-carriage",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["RailroadCarriage"]
        }),
    }),
})

export const {
    useGetRailroadCarriagesQuery,
    useGetSingleRailroadCarriageQuery,
    useDeleteRailroadCarriageMutation,
    useUpdateRailroadCarriageMutation
} = railroadCarriagesApi