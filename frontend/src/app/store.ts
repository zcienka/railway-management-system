import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import {reservationsApi} from "../services/reservationsApi"
import {discountsApi} from "../services/discountsApi"
import {trainStopApi} from "../services/trainStopApi"
import {trainRideApi} from "../services/trainRideApi"
import {stationsApi} from "../services/stationsApi"
import {carriagesApi} from "../services/carriagesApi"
import {locomotivesApi} from "../services/locomotivesApi"
import {railroadCarriagesApi} from "../services/railroadCarriagesApi"
import {trainsApi} from "../services/trainsApi"
import {workersApi} from "../services/workersApi"
import {railConnectionsApi} from "../services/railConnectionsApi";

const store = configureStore({
    reducer: {
        [reservationsApi.reducerPath]: reservationsApi.reducer,
        [discountsApi.reducerPath]: discountsApi.reducer,
        [trainStopApi.reducerPath]: trainStopApi.reducer,
        [trainRideApi.reducerPath]: trainRideApi.reducer,
        [stationsApi.reducerPath]: stationsApi.reducer,
        [carriagesApi.reducerPath]: carriagesApi.reducer,
        [locomotivesApi.reducerPath]: locomotivesApi.reducer,
        [railroadCarriagesApi.reducerPath]: railroadCarriagesApi.reducer,
        [trainsApi.reducerPath]: trainsApi.reducer,
        [workersApi.reducerPath]: workersApi.reducer,
        [railConnectionsApi.reducerPath]: railConnectionsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(reservationsApi.middleware,
            discountsApi.middleware,
            trainStopApi.middleware,
            trainRideApi.middleware,
            stationsApi.middleware,
            carriagesApi.middleware,
            locomotivesApi.middleware,
            railroadCarriagesApi.middleware,
            trainsApi.middleware,
            workersApi.middleware,
            railConnectionsApi.middleware),
})

setupListeners(store.dispatch)

export default store