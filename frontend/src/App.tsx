import {Route, BrowserRouter, Routes} from "react-router-dom"
import Reservations from "./pages/Reservations/Reservations"
import EditReservations from "./pages/Reservations/EditReservations"
import CreateReservation from "./pages/Reservations/CreateReservation"
import Loading from "./components/Loading"
import Discounts from "./pages/Discounts/Discounts"
import CreateDiscount from "./pages/Discounts/CreateDiscount"
import EditDiscounts from "./pages/Discounts/EditDiscounts"
import Stations from "./pages/Stations/Stations"
import EditStations from "./pages/Stations/EditStations"
import CreateStation from "./pages/Stations/CreateStation"
import TrainRides from "./pages/TrainRide/TrainRides"
import EditTrainRide from "./pages/TrainRide/EditTrainRide"
import CreateTrainRide from "./pages/TrainRide/CreateTrainRide"
import TrainStops from "./pages/TrainStop/TrainStops"
import EditTrainStop from "./pages/TrainStop/EditTrainStop"
import CreateTrainStop from "./pages/TrainStop/CreateTrainStop"
import EditCarriages from "./pages/Carriage/EditCarriages"
import CreateCarriage from "./pages/Carriage/CreateCarriage"
import Carriages from "./pages/Carriage/Carriages"
import Workers from "./pages/Worker/Workers"
import EditWorkers from "./pages/Worker/EditWorkers"
import CreateWorker from "./pages/Worker/CreateWorker"
import RailroadCar from "./pages/RailroadCar/RailroadCars"
import EditRailroadCar from "./pages/RailroadCar/EditRailroadCar"
import CreateRailroadCar from "./pages/RailroadCar/CreateRailroadCar"
import Locomotives from "./pages/Locomotive/Locomotives"
import EditLocomotive from "./pages/Locomotive/EditLocomotive"
import CreateLocomotive from "./pages/Locomotive/CreateLocomotive"
import Trains from "./pages/Train/Trains"
import EditTrains from "./pages/Train/EditTrains";
import CreateTrain from "./pages/Train/CreateTrain";
import RailConnections from "./pages/RailConnection/RailConnections";
import CreateRailConnection from "./pages/RailConnection/CreateRailConnection";

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path={"/reservations"} element={<Reservations/>}/>
                <Route path={"/reservations/:id"} element={<EditReservations/>}/>
                <Route path={"/create-reservation"} element={<CreateReservation/>}/>

                <Route path={"/discounts"} element={<Discounts/>}/>
                <Route path={"/discounts/:id"} element={<EditDiscounts/>}/>
                <Route path={"/add-discount"} element={<CreateDiscount/>}/>

                <Route path={"/stations"} element={<Stations/>}/>
                <Route path={"/stations/:id"} element={<EditStations/>}/>
                <Route path={"/add-station"} element={<CreateStation/>}/>

                <Route path={"/train-rides"} element={<TrainRides/>}/>
                <Route path={"/train-ride/:idParam"} element={<EditTrainRide/>}/>
                <Route path={"/add-train-ride"} element={<CreateTrainRide/>}/>

                <Route path={"/train-stops"} element={<TrainStops/>}/>
                <Route path={"/train-stops/:id"} element={<EditTrainStop/>}/>
                <Route path={"/add-train-stop"} element={<CreateTrainStop/>}/>

                <Route path={"/carriages"} element={<Carriages/>}/>
                <Route path={"/carriages/:id"} element={<EditCarriages/>}/>
                <Route path={"/add-carriage"} element={<CreateCarriage/>}/>

                <Route path={"/workers"} element={<Workers/>}/>
                <Route path={"/workers/:id"} element={<EditWorkers/>}/>
                <Route path={"/add-worker"} element={<CreateWorker/>}/>

                <Route path={"/railroad-cars"} element={<RailroadCar/>}/>
                <Route path={"/railroad-cars/:trainIdParam/:carIdParam"} element={<EditRailroadCar/>}/>
                <Route path={"/add-railroad-cars"} element={<CreateRailroadCar/>}/>

                <Route path={"/locomotive"} element={<Locomotives/>}/>
                <Route path={"/locomotive/:id"} element={<EditLocomotive/>}/>
                <Route path={"/add-locomotive"} element={<CreateLocomotive/>}/>

                <Route path={"/train"} element={<Trains/>}/>
                <Route path={"/train/:id"} element={<EditTrains/>}/>
                <Route path={"/add-train"} element={<CreateTrain/>}/>

                <Route path={"/worker"} element={<Workers/>}/>
                <Route path={"/worker/:id"} element={<EditWorkers/>}/>
                <Route path={"/add-worker"} element={<CreateWorker/>}/>

                <Route path={"/rail-connection"} element={<RailConnections/>}/>
                <Route path={"/add-rail-connection"} element={<CreateRailConnection/>}/>

                <Route path={"/"} element={<Loading/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
