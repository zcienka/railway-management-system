import {createApi} from "@reduxjs/toolkit/query/react"
import {Reservation, ReservationResponse, SearchReservation} from "../types"
import BaseQuery from "../utils/baseQuery"

export const reservationsApi = createApi({
    reducerPath: "reservationsApi",
    baseQuery: BaseQuery,
    tagTypes: ["Reservation", "SingleReservation", "SearchReservations"],
    endpoints: (builder) => ({
        getReservations: builder.query<ReservationResponse[], null>({
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
                url: "/reservation/update",
                method: "PATCH",
                params: {id: body.id, imie: body.imie, nazwisko: body.nazwisko, znizka: body.znizka, idprzejazdu: body.idprzejazdu}
            }),
            invalidatesTags: ["Reservation", "SingleReservation"]
        }),
        createReservation: builder.mutation({
            query: (body) => ({
                url: "/reservation/create",
                method: "POST",
                params: {imie: body.imie, nazwisko: body.nazwisko, znizka: body.znizka, idprzejazdu: body.idprzejazdu}
            }),
            invalidatesTags: ["Reservation"]
        }),
        filterReservation: builder.query<ReservationResponse[], SearchReservation>({
            query: (body) => ({
                url: "/reservation/search",
                method: "GET",
                params: body
            }),
            providesTags: ["SearchReservations"]
        }),
    }),
})

export const {
    useGetReservationsQuery,
    useGetSingleReservationQuery,
    useDeleteReservationMutation,
    useUpdateReservationMutation,
    useCreateReservationMutation,
    useFilterReservationQuery
} = reservationsApi