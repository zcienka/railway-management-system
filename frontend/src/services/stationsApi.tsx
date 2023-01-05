import {createApi} from "@reduxjs/toolkit/query/react"
import {SearchStation, Station} from "../types"
import BaseQuery from "../utils/baseQuery"

export const stationsApi = createApi({
    reducerPath: "stationsApi",
    baseQuery: BaseQuery,
    tagTypes: ["Station", "SearchStation"],
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
            providesTags: ["Station"]
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
                url: "/station/update",
                method: "PATCH",
                params: {nazwa: body.nazwa, adres: body.adres}
            }),
            invalidatesTags: ["Station"]
        }),
        createStation: builder.mutation({
            query: (body) => ({
                url: "/station/create",
                method: "POST",
                params: {nazwa: body.nazwa, adres: body.adres}
            }),
            invalidatesTags: ["Station"]
        }),
        filterStation: builder.query<Station[], SearchStation>({
            query: (body) => ({
                url: "/station/search",
                method: "GET",
                params: body
            }),
            providesTags: ["SearchStation"]
        }),
    }),
})

export const {
    useGetStationsQuery,
    useGetSingleStationQuery,
    useDeleteStationMutation,
    useUpdateStationMutation,
    useCreateStationMutation,
    useFilterStationQuery
} = stationsApi