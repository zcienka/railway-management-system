import {createApi} from "@reduxjs/toolkit/query/react"
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"

export const reservationsApi = createApi({
    reducerPath: "reservationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7249/api"
    }),
    endpoints: (builder) => ({
        getReservations: builder.query({
            query: () => ({
                url: "/rezerwacja",
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
    // useCreateReservationMutation
} = reservationsApi