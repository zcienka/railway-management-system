import {Route, BrowserRouter, Routes} from "react-router-dom"
import Reservations from "./pages/Reservations/Reservations"
import EditReservations from "./pages/Reservations/EditReservations"
import CreateReservation from "./pages/Reservations/CreateReservation"
import Loading from "./components/Loading"

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path={"/reservations"} element={<Reservations/>}/>
                <Route path={"/reservations/:id"} element={<EditReservations/>}/>
                <Route path={"/create-reservation"} element={<CreateReservation/>}/>
                <Route path={"/"} element={<Loading/>}/>
                {/*<Route path={"/create-train-passage"} element={<Loading/>}/>*/}

            </Routes>
        </BrowserRouter>
    )
}

export default App
