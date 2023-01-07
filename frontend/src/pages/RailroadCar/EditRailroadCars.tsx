import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {useGetRailroadCarsQuery, useGetSingleRailroadCarQuery} from "../../services/railroadCarsApi"
import {RailroadCar} from "../../types"
import {useDeleteRailroadCarMutation, useUpdateRailroadCarMutation} from "../../services/railroadCarsApi"
import Menu from "../../components/Menu"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";
import {useGetRailroadCarsInTheTrainQuery} from "../../services/railroadCarsInTheTrainApi";
import {useGetReservationsQuery} from "../../services/reservationsApi";
import {useGetTrainRidesQuery} from "../../services/trainRideApi";
import {useGetWorkersQuery} from "../../services/workersApi";
import {useGetLocomotivesQuery} from "../../services/locomotivesApi";
import {useGetTrainStopsQuery} from "../../services/trainStopApi";
import {useGetStationsQuery} from "../../services/stationsApi";
import {useGetTrainsQuery} from "../../services/trainsApi";
import {useGetDiscountsQuery} from "../../services/discountsApi";
import {useGetRailConnectionsQuery} from "../../services/railConnectionsApi";

const EditRailroadCars = () => {
    const [seatsNumber, setSeatsNumber] = useState<string>("")
    const [seatsInput, setSeatsInput] = useState<boolean>(true)
    const [isSeatsNumberInteger, setIsSeatsNumberInteger] = useState<boolean>(true)
    const [isSeatsNumberValidLength, setIsSeatsNumberValidLength] = useState<boolean>(true)

    const [technicalResearch, setTechnicalResearch] = useState<string>("")
    const [technicalResearchInput, setTechnicalResearchInput] = useState<boolean>(true)
    const [isTechnicalResearchValid, setIsTechnicalResearchValid] = useState<boolean>(true)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleRailroadCarData,
        isSuccess: isGetSingleRailroadCarSuccess
    } = useGetSingleRailroadCarQuery(id, {
        skip: id === undefined
    })

    const [deleteRailroadCar,{
        error: deleteRailroadCarError,
        isError: isDeleteRailroadCarError,
        isSuccess: isDeleteRailroadCarSuccess
    }] = useDeleteRailroadCarMutation()

    const [updateRailroadCar, {
        error: updateRailroadCarError,
        isError: isUpdateRailroadCarError,
        isSuccess: isUpdateRailroadCarSuccess
    }] = useUpdateRailroadCarMutation()

    const deleteSingleRailroadCar = async () => {
        await deleteRailroadCar(id)
    }

    const updateSingleRailroadCar = async () => {
        if (seatsNumber === "" || technicalResearch === "" || !isSeatsNumberValidLength || !isTechnicalResearchValid
            || !isSeatsNumberInteger) {
            setSeatsInput(false)
            setTechnicalResearchInput(false)
        } else {
            if (id !== undefined) {
                const singleRailroadCar: RailroadCar = {
                    id: parseInt(id),
                    databadaniatechnicznego: new Date(technicalResearch),
                    liczbamiejsc: parseInt(seatsNumber)
                }
                await updateRailroadCar(singleRailroadCar)
            }
        }
    }

    const checkDate = (userInput: string) => {
        const userDate = new Date(userInput)
        const todayDate = new Date()

        if (userDate > todayDate) {
            setIsTechnicalResearchValid(true)
        } else {
            setIsTechnicalResearchValid(false)
        }
    }
    const {refetch: refetchReservations} = useGetReservationsQuery(null)
    const {refetch: refetchTrainRides} = useGetTrainRidesQuery(null)
    const {refetch: refetchWorkers} = useGetWorkersQuery(null)
    const {refetch: refetchLocomotives} = useGetLocomotivesQuery(null)
    const {refetch: refetchTrainStop} = useGetTrainStopsQuery(null)
    const {refetch: refetchStations} = useGetStationsQuery(null)
    const {refetch: refetchTrains} = useGetTrainsQuery(null)
    const {refetch: refetchRailroadCarInTheTrains} = useGetRailroadCarsInTheTrainQuery(null)
    const {refetch: refetchDiscounts} = useGetDiscountsQuery(null)
    const {refetch: refetchRailConnections} = useGetRailConnectionsQuery(null)

    const checkSeatsNumberInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsSeatsNumberInteger(() => false)
            setIsSeatsNumberValidLength(() => true)
        } else {
            setIsSeatsNumberInteger(() => true)

            if (0 > parseInt(userInput)) {
                setIsSeatsNumberValidLength(() => false)
            } else {
                setIsSeatsNumberValidLength(() => true)
            }
        }
    }

    useEffect(() => {
        if (isUpdateRailroadCarSuccess) {
            navigate("/railroad-cars")
        }
    }, [isUpdateRailroadCarSuccess, navigate])

    useEffect(() => {
        if (isDeleteRailroadCarSuccess) {
            refetchReservations()
            refetchTrainRides()
            refetchWorkers()
            refetchTrainStop()
            refetchStations()
            refetchTrains()
            refetchRailroadCarInTheTrains()
            refetchRailConnections()
            refetchDiscounts()
            refetchLocomotives()
            navigate("/railroad-cars")
        }
    }, [isDeleteRailroadCarSuccess, navigate, refetchDiscounts, refetchLocomotives, refetchRailConnections, refetchRailroadCarInTheTrains, refetchReservations, refetchStations, refetchTrainRides, refetchTrainStop, refetchTrains, refetchWorkers])

    useEffect(() => {
        if (isGetSingleRailroadCarSuccess) {
            setSeatsNumber(getSingleRailroadCarData[0].liczbamiejsc.toString())
            setTechnicalResearch(getSingleRailroadCarData[0].databadaniatechnicznego.toString().split('T')[0])
        }
    }, [getSingleRailroadCarData, isGetSingleRailroadCarSuccess])

    if (getSingleRailroadCarData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj wagon</p>
                </div>
                <div className={"bg-white w-full rounded-xl pt-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Liczba miejsc</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={seatsNumber}
                                   onChange={(e) => {
                                       setSeatsNumber(e.target.value)
                                       setSeatsInput(false)
                                   }}
                                   onBlur={(e) => checkSeatsNumberInteger(e.target.value)}

                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${seatsNumber === "" && !seatsInput && isSeatsNumberInteger && isSeatsNumberValidLength ? "visible w-full"
                                : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole liczba miejsc jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isSeatsNumberInteger ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole liczby miejsc musi być liczbą
                            </p>
                        </div>

                        <div
                            className={`flex items-center ${!isSeatsNumberValidLength ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Liczba miejsc musi mieć wartość większą od 0
                            </p>
                        </div>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Data badania technicznego</label>
                        <div className={"flex w-4/6"}>
                            <input type="date" className={"w-1/2"}
                                   value={technicalResearch}
                                   onChange={(e) => {
                                       setTechnicalResearch(e.target.value)
                                       setTechnicalResearchInput(false)
                                   }}
                                   onBlur={(e) => checkDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${technicalResearch === "" && !technicalResearchInput && isTechnicalResearchValid ? "visible w-full"
                                : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole data badania technicznego jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isTechnicalResearchValid ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Data nie może być przeszła
                            </p>
                        </div>
                    </div>

                    <div className={"flex"}>
                        <button onClick={() => navigate("/railroad-cars")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleRailroadCar()}>
                                Usuń
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleRailroadCar()}>
                                Zapisz zmiany
                            </button>
                        </div>
                    </div>

                    <div className={"h-8 flex w-full text-red-900 text-xs justify-end"}>
                        <div
                            className={`flex items-center ${
                                // @ts-ignore
                                deleteRailroadCarError !== undefined ?
                                    "visible w-full justify-end flex" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2 flex"}/>
                            <p className={"flex justify-end"}>
                                {// @ts-ignore
                                    deleteRailroadCarError !== undefined && deleteRailroadCarError.data ? deleteRailroadCarError.data : ""}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditRailroadCars
