import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {TrainStop, TrainStopNumberless} from "../../types"
import Menu from "../../components/Menu"
import {
    useDeleteTrainStopMutation,
    useGetSingleTrainStopQuery, useGetTrainStopsQuery,
    useUpdateTrainStopMutation
} from "../../services/trainStopApi"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";
import {useGetStationsQuery} from "../../services/stationsApi";
import {useGetRailConnectionsQuery} from "../../services/railConnectionsApi";
import {useGetTrainRidesQuery} from "../../services/trainRideApi";
import {useGetDiscountsQuery} from "../../services/discountsApi";
import {useGetReservationsQuery} from "../../services/reservationsApi";
import {useGetTrainsQuery} from "../../services/trainsApi";
import {useGetWorkersQuery} from "../../services/workersApi";
import {useGetRailroadCarsInTheTrainQuery} from "../../services/railroadCarsInTheTrainApi";
import {useGetRailroadCarsQuery} from "../../services/railroadCarsApi";

const EditTrainStop = () => {
    const [lineNumber, setLineNumber] = useState<string>("")
    const [lineNumberInput, setLineNumberInput] = useState<boolean>(true)
    const [isLineNumberInteger, setIsLineNumberInteger] = useState<boolean>(true)
    const [isLineNumberPositive, setIsLineNumberPositive] = useState<boolean>(true)

    const [stopName, setStopName] = useState<string>("")
    const [stopNameInput, setStopNameInput] = useState<boolean>(true)

    const [lineId, setLineId] = useState<string>("")
    const [lineIdInput, setLineIdInput] = useState<boolean>(true)
    const [isLineIdInteger, setIsLineIdInteger] = useState<boolean>(true)
    const [isLineIdPositive, setIsLineIdPositive] = useState<boolean>(true)
    
    const {refetch: refetchReservations} = useGetReservationsQuery(null)
    const {refetch: refetchTrains} = useGetTrainsQuery(null)
    const {refetch: refetchWorkers} = useGetWorkersQuery(null)
    const {refetch: refetchRailroadCarsInTheTrain} = useGetRailroadCarsInTheTrainQuery(null)
    const {refetch: refetchTrainRides} = useGetTrainRidesQuery(null)
    const {refetch: refetchStations} = useGetStationsQuery(null)
    const {refetch: refetchRailroadCar} = useGetRailroadCarsQuery(null)
    const {refetch: refetchDiscounts} = useGetDiscountsQuery(null)
    const {refetch: refetchRailConnections} = useGetRailConnectionsQuery(null)

    const navigate = useNavigate()
    const {numerprzystanku, nazwastacji, idlinii} = useParams()
    const {
        data: getSingleTrainStopData,
        isSuccess: isGetSingleTrainStopSuccess
    } = useGetSingleTrainStopQuery({numerprzystanku, nazwastacji, idlinii}, {
        skip: numerprzystanku === undefined
    })

    const [deleteTrainStop, {
        error: deleteTrainStopError,
        isError: isDeleteTrainStopError,
        isSuccess: isDeleteTrainStopSuccess
    }] = useDeleteTrainStopMutation()

    const [updateTrainStop, {
        error: updateTrainStopError,
        isError: isUpdateTrainStopError,
        isSuccess: isUpdateTrainStopSuccess
    }] = useUpdateTrainStopMutation()

    const deleteSingleTrainStop = async () => {
        const singleTrainStop: TrainStopNumberless = {
            nazwastacji: stopName,
            idlinii: parseInt(lineId)
        }
        await deleteTrainStop(singleTrainStop)
    }

    useEffect(() => {
        if (isDeleteTrainStopSuccess) {
            refetchReservations()
            refetchTrains()
            refetchWorkers()
            refetchTrainRides()
            refetchStations()
            refetchRailroadCar()
            refetchRailConnections()
            refetchDiscounts()
            refetchRailroadCarsInTheTrain()
            navigate("/train-stops")
        }
    }, [isDeleteTrainStopSuccess, navigate, refetchDiscounts, refetchRailConnections, refetchRailroadCar, refetchRailroadCarsInTheTrain, refetchReservations, refetchStations, refetchTrainRides, refetchTrains, refetchWorkers])

    useEffect(() => {
        if (isUpdateTrainStopSuccess) {
            navigate("/train-stops")
        }
    }, [isUpdateTrainStopSuccess, navigate])

    const updateSingleTrainStop = async () => {
        if (lineNumber === "" || stopName === "" || lineId === "" || !isLineNumberInteger ||
            !isLineIdInteger || !isLineIdPositive || !isLineNumberPositive) {
            setLineNumberInput(false)
            setStopNameInput(false)
            setLineIdInput(false)
        } else {
            const singleTrainStop: TrainStop = {
                numerprzystanku: parseInt(lineNumber),
                nazwastacji: stopName,
                idlinii: parseInt(lineId),
            }
            await updateTrainStop(singleTrainStop)
        }
    }

    const checkLineNumberInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsLineNumberInteger(() => false)
        } else {
            if (parseInt(userInput) < 0) {
                setIsLineNumberPositive(false)
            } else {
                setIsLineNumberPositive(() => true)
            }
            setIsLineNumberInteger(() => true)
        }
    }

    const checkLineIdInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsLineIdInteger(() => false)
        } else {
            if (parseInt(userInput) < 0) {
                setIsLineIdPositive(false)
            } else {
                setIsLineIdPositive(() => true)
            }

            setIsLineIdInteger(() => true)
        }
    }


    useEffect(() => {
        if (isGetSingleTrainStopSuccess) {
            setLineNumber(getSingleTrainStopData[0].numerprzystanku.toString())
            setStopName(getSingleTrainStopData[0].nazwastacji)
            setLineId(getSingleTrainStopData[0].idlinii.toString())
        }
    }, [getSingleTrainStopData, isGetSingleTrainStopSuccess])

    if (getSingleTrainStopData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj przystanek</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Numer przystanku</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={lineNumber}
                                   onChange={(e) => {
                                       setLineNumber(e.target.value)
                                       setLineNumberInput(false)
                                   }}
                                   onBlur={(e) => checkLineNumberInteger(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${lineNumber === "" && !lineNumberInput && isLineNumberInteger ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole numer przystanku jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isLineNumberInteger ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Numer przystanku musi by?? liczb??
                            </p>
                        </div>
                        <div
                            className={`flex items-center ${!isLineNumberPositive ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Numer przystanku musi wi??kszy od zera
                            </p>
                        </div>
                        <div
                            className={`${
                                // @ts-ignore
                                updateTrainStopError !== undefined && updateTrainStopError.data === "Na tej linii podany numer przystanku jest ju?? zaj??ty"
                                    ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Na tej linii podany numer przystanku jest ju?? zaj??ty
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Nazwa stacji</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={stopName}
                                   onChange={(e) => {
                                       setStopName(e.target.value)
                                       setStopNameInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${stopName === "" && !stopNameInput ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole nazwa stacji przejazdu jest wymagane
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Id linii</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={lineId}
                                   onChange={(e) => {
                                       setLineId(e.target.value)
                                       setLineIdInput(false)
                                   }}
                                   onBlur={(e) => checkLineIdInteger(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${lineId === "" && !lineIdInput && isLineIdInteger && isLineIdPositive ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole id linii przejazdu jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isLineIdInteger ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Id linii przejazdu musi by?? liczb??
                            </p>
                        </div>
                        <div
                            className={`flex items-center ${!isLineIdPositive ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Id linii przejazdu musi wi??ksze od zera
                            </p>
                        </div>
                        <div
                            className={`${
                                // @ts-ignore
                                updateTrainStopError !== undefined && updateTrainStopError.data === "Na tej linii nie ma takiego przystanku"
                                    ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Na tej linii nie ma takiego przystanku
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={"flex"}>
                        <button onClick={() => navigate("/train-stops")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleTrainStop()}>
                                Usu??
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleTrainStop()}>
                                Zapisz zmiany
                            </button>
                        </div>
                    </div>
                    <div className={"h-8 flex w-full text-red-900 text-xs justify-end"}>
                        <div
                            className={`flex items-center ${
                                // @ts-ignore
                                deleteTrainStopError !== undefined ?
                                    "visible w-full justify-end flex" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2 flex"}/>
                            <p className={"flex justify-end"}>
                                {// @ts-ignore
                                    deleteTrainStopError !== undefined && deleteTrainStopError.data ? deleteTrainStopError.data : ""}
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

export default EditTrainStop
