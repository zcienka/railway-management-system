import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {Discount, TrainRide, Worker} from "../../types"
import Menu from "../../components/Menu"
import {
    useDeleteTrainRideMutation,
    useGetSingleTrainRideQuery,
    useUpdateTrainRideMutation
} from "../../services/trainRideApi"
import {useGetConductorsQuery, useGetDriversQuery, useGetSingleWorkerQuery} from "../../services/workersApi";
import {v4 as uuidv4} from "uuid";

const EditTrainRide = () => {
    const [departureDate, setDepartureDate] = useState<string>("")
    const [departureDateInput, setDepartureDateInput] = useState<boolean>(true)

    const [arrivalDate, setArrivalDate] = useState<string>("")
    const [arrivalDateInput, setArrivalDateInput] = useState<boolean>(true)

    const [conductorId, setConductorId] = useState<string>("")
    const [conductorIdInput, setConductorIdInput] = useState<boolean>(true)

    const [driverId, setDriverId] = useState<string>("")
    const [driverIdInput, setDriverIdInput] = useState<boolean>(true)

    const [railConnectionId, setRailConnectionId] = useState<string>("")
    const [railConnectionIdInput, setRailConnectionIdInput] = useState<boolean>(true)

    const [trainId, setTrainId] = useState<string>("")
    const [trainIdInput, setTrainIdInput] = useState<boolean>(true)

    const navigate = useNavigate()
    const {idParam} = useParams()
    const {
        data: getSingleTrainRideData,
        isSuccess: isGetSingleTrainRideSuccess
    } = useGetSingleTrainRideQuery(idParam, {
        skip: idParam === undefined
    })

    const {
        data: getConductorsData,
        isSuccess: isGetConductorsSuccess
    } = useGetConductorsQuery(null)

    const {
        data: getDriversData,
        isSuccess: isGetDriversSuccess
    } = useGetDriversQuery(null)

    const [deleteTrainRide] = useDeleteTrainRideMutation()
    const [updateTrainRide] = useUpdateTrainRideMutation()

    const deleteSingleTrainRide = async () => {
        await deleteTrainRide(idParam)
        navigate("/train-rides")
    }

    const updateSingleTrainRide = async () => {
        const singleTrainRide: TrainRide = {
            id: parseInt(idParam?.toString() || "undefined"),
            dataodjazdu: new Date(departureDate),
            dataprzyjazdu: new Date(arrivalDate),
            idkonduktora: parseInt(conductorId),
            idmaszynisty: parseInt(driverId),
            idliniiprzejazdu: parseInt(railConnectionId),
            idpociagu: parseInt(trainId),
        }
        await updateTrainRide(singleTrainRide)
        navigate("/train-rides")
    }
    useEffect(() => {
        if (isGetSingleTrainRideSuccess) {
            setDepartureDate(getSingleTrainRideData[0].dataodjazdu.toString())
            setArrivalDate(getSingleTrainRideData[0].dataprzyjazdu.toString())
            setConductorId(getSingleTrainRideData[0].imiekonduktora)
            setDriverId(getSingleTrainRideData[0].imiemaszynisty)
            setRailConnectionId(getSingleTrainRideData[0].idliniiprzejazdu.toString())
            setTrainId(getSingleTrainRideData[0].nazwapociagu)
        }
    }, [getSingleTrainRideData, isGetSingleTrainRideSuccess])

    if (getSingleTrainRideData !== undefined && getDriversData !== undefined && getConductorsData !== undefined) {
        const drivers = getDriversData.map((worker: Worker) => {
            return <option key={uuidv4()} value={worker.id}>
                {worker.imie} {worker.nazwisko}
            </option>
        })

        const conductors = getConductorsData.map((worker: Worker) => {
            return <option key={uuidv4()} value={worker.id}>
                {worker.imie} {worker.nazwisko}
            </option>
        })

        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj przejazd</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Data odjazdu</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   type={"datetime-local"}
                                   value={departureDate}
                                   onChange={(e) => {
                                       setDepartureDate(e.target.value)
                                       setDepartureDateInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Data przyjazdu</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   type={"datetime-local"}
                                   value={arrivalDate}
                                   onChange={(e) => {
                                       setArrivalDate(e.target.value)
                                       setArrivalDateInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Konduktor</label>
                        <div className={"flex w-4/6"}>
                            <select className={"w-1/2"}
                                   value={conductorId}
                                   onChange={(e) => {
                                       setConductorId(e.target.value)
                                       setConductorIdInput(false)
                                   }}
                            >
                                {conductors}
                            </select>
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Maszynista</label>
                        <div className={"flex w-4/6"}>
                            <select className={"w-1/2"}
                                   value={driverId}
                                   onChange={(e) => {
                                       setDriverId(e.target.value)
                                       setDriverIdInput(false)
                                   }}
                            >
                                {drivers}
                            </select>
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Id linii przejazdu</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={railConnectionId}
                                   onChange={(e) => {
                                       setRailConnectionId(e.target.value)
                                       setRailConnectionIdInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Pociąg</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={trainId}
                                   onChange={(e) => {
                                       setTrainId(e.target.value)
                                       setTrainIdInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"flex"}>
                        <button onClick={() => navigate("/train-rides")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleTrainRide()}>
                                Usuń
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleTrainRide()}>
                                Zapisz zmiany
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditTrainRide
