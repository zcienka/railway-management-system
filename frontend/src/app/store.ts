import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from "@reduxjs/toolkit/query"
import {reservationsApi} from "../services/reservationsApi"
import {discountsApi} from "../services/discountsApi"

const store = configureStore({
    reducer: {
        [reservationsApi.reducerPath]: reservationsApi.reducer,
        [discountsApi.reducerPath]: discountsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(reservationsApi.middleware, discountsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store