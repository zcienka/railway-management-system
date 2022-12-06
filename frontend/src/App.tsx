import {Route, BrowserRouter, Routes} from "react-router-dom"
import Reservations from "./pages/Reservations"
import EditReservations from "./pages/EditReservations";

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path={"/reservations"} element={<Reservations/>}/>
                <Route path={"/reservations/:id"} element={<EditReservations/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
