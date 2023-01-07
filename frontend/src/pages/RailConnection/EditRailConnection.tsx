import React, {useEffect, useState} from "react"
import Menu from "../../components/Menu"
import {RailConnection} from "../../types"
import {useNavigate, useParams} from "react-router-dom"
import {
    useEditRailConnectionMutation,
    useGetSingleRailConnectionQuery,
    useDeleteRailConnectionMutation
} from "../../services/railConnectionsApi"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg"
import {useGetRailroadCarsInTheTrainQuery} from "../../services/railroadCarsInTheTrainApi";
import {useGetTrainStopsQuery} from "../../services/trainStopApi";
import {useGetTrainRidesQuery} from "../../services/trainRideApi";
import {useGetReservationsQuery} from "../../services/reservationsApi";
import {useGetWorkersQuery} from "../../services/workersApi";
import {useGetStationsQuery} from "../../services/stationsApi";
import {useGetTrainsQuery} from "../../services/trainsApi";
import {useGetRailroadCarsQuery} from "../../services/railroadCarsApi";
import {useGetDiscountsQuery} from "../../services/discountsApi";
import {useGetLocomotivesQuery} from "../../services/locomotivesApi";

const EditRailConnection = () => {
    const navigate = useNavigate()

    const [id, setId] = useState<string>("")
    const [idInput, setIdInput] = useState<boolean>(true)

    const [isIdInteger, setIsIdInteger] = useState<boolean>(true)
    const [isIdValidLength, setIsIdValidLength] = useState<boolean>(true)
    const {railConnectionId} = useParams()



    const {
        data: getSingleRailConnectionData,
        isSuccess: isGetSingleRailConnectionSuccess,
    } = useGetSingleRailConnectionQuery(railConnectionId, {
        skip: railConnectionId === undefined
    })
    const [deleteRailConnection, {
        error: deleteRailConnectionError,
        isError: isDeleteRailConnectionError,
        isSuccess: isDeleteRailConnectionSuccess
    }] = useDeleteRailConnectionMutation()

    const [editRailConnection, {
        error: editRailConnectionError,
        isError: isEditRailConnectionError,
        isSuccess: isEditRailConnectionSuccess
    }] = useEditRailConnectionMutation()

    const deleteSingleRailConnection = async () => {
        await deleteRailConnection(id)
        refetchTrainStop()
        refetchTrainRides()
    }

    useEffect(() => {
        if (isGetSingleRailConnectionSuccess) {
            setId(getSingleRailConnectionData[0].id.toString())
        }
    }, [getSingleRailConnectionData, isGetSingleRailConnectionSuccess])

    const {refetch: refetchReservations} = useGetReservationsQuery(null)
    const {refetch: refetchTrainRides} = useGetTrainRidesQuery(null)
    const {refetch: refetchWorkers} = useGetWorkersQuery(null)
    const {refetch: refetchLocomotives} = useGetLocomotivesQuery(null)
    const {refetch: refetchTrainStop} = useGetTrainStopsQuery(null)
    const {refetch: refetchStations} = useGetStationsQuery(null)
    const {refetch: refetchTrains} = useGetTrainsQuery(null)
    const {refetch: refetchRailroadCarInTheTrains} = useGetRailroadCarsInTheTrainQuery(null)
    const {refetch: refetchRailroadCar} = useGetRailroadCarsQuery(null)
    const {refetch: refetchDiscounts} = useGetDiscountsQuery(null)

    useEffect(() => {
        if (isDeleteRailConnectionSuccess) {
            refetchReservations()
            refetchTrainRides()
            refetchWorkers()
            refetchTrainStop()
            refetchStations()
            refetchTrains()
            refetchRailroadCarInTheTrains()
            refetchRailroadCar()
            refetchDiscounts()
            refetchLocomotives()
            navigate("/rail-connection")
        }
    }, [navigate, isDeleteRailConnectionSuccess, refetchTrainStop, refetchTrainRides, refetchReservations, refetchWorkers, refetchStations, refetchTrains, refetchRailroadCarInTheTrains, refetchRailroadCar, refetchDiscounts, refetchLocomotives])

    const checkIdInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsIdInteger(() => false)
            setIsIdValidLength(() => true)
        } else {
            setIsIdInteger(() => true)

            if (100 < parseInt(userInput) || 0 > parseInt(userInput)) {
                setIsIdValidLength(() => false)
            } else {
                setIsIdValidLength(() => true)
            }
        }
    }

    useEffect(() => {
        if (isEditRailConnectionSuccess) {
            navigate("/rail-connection")
        }
    }, [isEditRailConnectionSuccess, navigate])

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Edycja linii przejazdu</p>
            </div>
            <div className={"bg-white w-full rounded-xl pt-8 px-16 border border-stone-200"}>
                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Id</label>
                    <div className={"flex w-4/6"}>
                        {id}
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${id === "" && !idInput && isIdInteger ? "visible w-full" : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole id jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isIdInteger ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Pole id musi być liczbą
                        </p>
                    </div>
                    <div
                        className={`flex items-center ${
                            // @ts-ignore
                            editRailConnectionError !== undefined && editRailConnectionError.data === "Linia przejazdu o danym id już istnieje" ?
                                "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Linia przejazdu o danym id już istnieje
                        </p>
                    </div>
                </div>

                <div className={"flex"}>
                    <button onClick={() => navigate("/rail-connection")}>Anuluj</button>
                    <div className={"flex justify-end w-full"}>
                        <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                onClick={() => deleteSingleRailConnection()}>
                            Usuń
                        </button>
                    </div>
                </div>
                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`flex items-center ${
                            // @ts-ignore
                            deleteRailConnectionError !== undefined  ?
                                "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            {// @ts-ignore
                                deleteRailConnectionError !== undefined && deleteRailConnectionError.data ? deleteRailConnectionError.data : ""}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
}

export default EditRailConnection
