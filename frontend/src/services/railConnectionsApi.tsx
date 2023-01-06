import {createApi} from "@reduxjs/toolkit/query/react"
import {RailConnection, Train} from "../types"
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
                url: "/rail-connection/create",
                method: "POST",
                params: {id: body.id}
            }),
            invalidatesTags: ["RailConnection"]
        }),
        editRailConnection: builder.mutation({
            query: (body) => ({
                url: "/rail-connection/update",
                method: "PATCH",
                params: body,
            }),
            invalidatesTags: ["RailConnection"]
        }),
        getSingleRailConnection: builder.query({
            query: (railConnectionId) => ({
                url: `/rail-connection/${railConnectionId}`,
                method: "GET",
            }),
            providesTags: ["RailConnection"]
        }),
    }),
})

export const {
    useGetRailConnectionsQuery,
    useCreateRailConnectionMutation,
    useEditRailConnectionMutation,
    useDeleteRailConnectionMutation,
    useGetSingleRailConnectionQuery
} = railConnectionsApi