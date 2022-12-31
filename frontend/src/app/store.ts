import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import {reservationsApi} from "../services/reservationsApi"
import {discountsApi} from "../services/discountsApi"
import {trainStopApi} from "../services/trainStopApi"
import {trainRideApi} from "../services/trainRideApi"
import {stationsApi} from "../services/stationsApi"
import {railroadCarsApi} from "../services/railroadCarsApi"
import {locomotivesApi} from "../services/locomotivesApi"
import {railroadCarsInTheTrainApi} from "../services/railroadCarsInTheTrainApi"
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
        [railroadCarsApi.reducerPath]: railroadCarsApi.reducer,
        [locomotivesApi.reducerPath]: locomotivesApi.reducer,
        [railroadCarsInTheTrainApi.reducerPath]: railroadCarsInTheTrainApi.reducer,
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
            railroadCarsApi.middleware,
            locomotivesApi.middleware,
            railroadCarsInTheTrainApi.middleware,
            trainsApi.middleware,
            workersApi.middleware,
            railConnectionsApi.middleware),
})

setupListeners(store.dispatch)

export default store