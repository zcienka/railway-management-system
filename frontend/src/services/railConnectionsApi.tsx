import {createApi} from "@reduxjs/toolkit/query/react"
import {RailConnection} from "../types"
import BaseQuery from "../utils/baseQuery"

export const railConnectionsApi = createApi({
    reducerPath: "rail-connectionsApi",
    baseQuery: BaseQuery,
    tagTypes: ["RailConnection"],
    endpoints: (builder) => ({
        getRailConnections: builder.query<RailConnection[], null>({
            query: () => ({
                url: "/rail-connection",
                method: "GET",
            }),
            providesTags: ["RailConnection"]
        }),
        deleteRailConnection: builder.mutation({
            query: (id) => ({
                url: `/rail-connection/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["RailConnection"]
        }),
        createRailConnection: builder.mutation({
            query: (body) => ({
                url: "/rail-connection",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["RailConnection"]
        }),
    }),
})

export const {
    useGetRailConnectionsQuery,
    useDeleteRailConnectionMutation,
} = railConnectionsApi