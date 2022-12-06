import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"

const baseQuery = fetchBaseQuery({
        baseUrl: "https://localhost:7249/api"
    }
)

export default baseQuery