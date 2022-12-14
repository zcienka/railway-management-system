import {createApi} from "@reduxjs/toolkit/query/react"
import {Station} from "../types"
import BaseQuery from "../utils/baseQuery"

export const stationsApi = createApi({
    reducerPath: "stationsApi",
    baseQuery: BaseQuery,
    tagTypes: ["Station", "SingleStation"],
    endpoints: (builder) => ({
        getStations: builder.query<Station[], null>({
            query: () => ({
                url: "/station",
                method: "GET",
            }),
            providesTags: ["Station"]
        }),
        getSingleStation: builder.query<Station[], string | undefined>({
            query: (id) => ({
                url: `/station/${id}`,
                method: "GET",
            }),
            providesTags: ["SingleStation"]
        }),
        deleteStation: builder.mutation({
            query: (id) => ({
                url: `/station/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Station"]
        }),
        updateStation: builder.mutation({
            query: (body) => ({
                url: "/station",
                method: "PATCH",
                body: body
            }),
            invalidatesTags: ["Station"]
        }),
        createStation: builder.mutation({
            query: (body) => ({
                url: "/station",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Station"]
        }),


    }),
})

export const {
    useGetStationsQuery,
    useGetSingleStationQuery,
    useDeleteStationMutation,
    useUpdateStationMutation
} = stationsApi