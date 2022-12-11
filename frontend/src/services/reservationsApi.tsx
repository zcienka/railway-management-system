import {createApi} from "@reduxjs/toolkit/query/react"
import {Reservation} from "../types"
import BaseQuery from "../utils/baseQuery"

export const reservationsApi = createApi({
    reducerPath: "reservationsApi",
    baseQuery: BaseQuery,
    tagTypes: ["Reservation", "SingleReservation"],
    endpoints: (builder) => ({
        getReservations: builder.query<Reservation[], null>({
            query: () => ({
                url: "/reservation",
                method: "GET",
            }),
            providesTags: ["Reservation"]
        }),
        getSingleReservation: builder.query<Reservation[], string | undefined>({
            query: (id) => ({
                url: `/reservation/${id}`,
                method: "GET",
            }),
            providesTags: ["SingleReservation"]
        }),
        deleteReservation: builder.mutation({
            query: (id) => ({
                url: `/reservation/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Reservation", "SingleReservation"]
        }),
        updateReservation: builder.mutation({
            query: (body) => ({
                url: "/reservation",
                method: "PATCH",
                body: body
            }),
            invalidatesTags: ["Reservation", "SingleReservation"]
        }),
        createReservation: builder.mutation<Reservation, Reservation>({
            query: (body) => ({
                url: "/reservation",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Reservation"]
        }),
        searchReservations: builder.query<Reservation[], string | undefined>({
            query: (searchValue) => ({
                url: `/reservation/search/${searchValue}`,
                method: "GET",
            }),
            providesTags: ["SingleReservation"]
        }),
    }),
})

export const {
    useGetReservationsQuery,
    useGetSingleReservationQuery,
    useDeleteReservationMutation,
    useUpdateReservationMutation,
    useCreateReservationMutation,
} = reservationsApi