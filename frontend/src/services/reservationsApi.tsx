import {createApi} from "@reduxjs/toolkit/query/react"
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import {Reservation} from "../types"

export const reservationsApi = createApi({
    reducerPath: "reservationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7249/api"
    }),
    endpoints: (builder) => ({
        getReservations: builder.query<Reservation[], null>({
            query: () => ({
                url: "/reservation",
                method: "GET",
            }),
        }),
        getSingleReservation: builder.query<Reservation[], string | undefined>({
            query: (id) => ({
                url: `/reservation/${id}`,
                method: "GET",
            }),
        }),
        // createReservation: builder.mutation({
        //     query: (body) => ({
        //         url: "/reservation",
        //         method: "POST",
        //         body: body.users,
        //     }),
        // }),
    }),
})

export const {
    useGetReservationsQuery,
    useGetSingleReservationQuery,
    // useCreateReservationMutation
} = reservationsApi