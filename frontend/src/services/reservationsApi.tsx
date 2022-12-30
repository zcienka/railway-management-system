import {createApi} from "@reduxjs/toolkit/query/react"
import {Reservation, ReservationResponse} from "../types"
import BaseQuery from "../utils/baseQuery"

export const reservationsApi = createApi({
    reducerPath: "reservationsApi",
    baseQuery: BaseQuery,
    tagTypes: ["Reservation", "SingleReservation"],
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
        filterReservations: builder.mutation({
            query: (body) => ({
                url: `/reservation/search`,
                method: "GET",
                params: {imie: body.imie, nazwisko: body.nazwisko, znizka: body.znizka, idprzejazdumin: body.idprzejazdumin, idprzejazdumax: body.idprzejazdumax}
            }),
            invalidatesTags: ["SingleReservation"]
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