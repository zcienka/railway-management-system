import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {Train} from "../../types"
import Menu from "../../components/Menu"
import {
    useDeleteTrainMutation,
    useGetSingleTrainQuery, useGetTrainsQuery,
    useUpdateTrainMutation
} from "../../services/trainsApi"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg"
import {useGetTrainRidesQuery} from "../../services/trainRideApi"
import {useGetRailroadCarsInTheTrainQuery} from "../../services/railroadCarsInTheTrainApi"
import {useGetReservationsQuery} from "../../services/reservationsApi";
import {useGetWorkersQuery} from "../../services/workersApi";
import {useGetTrainStopsQuery} from "../../services/trainStopApi";
import {useGetRailroadCarsQuery} from "../../services/railroadCarsApi";
import {useGetDiscountsQuery} from "../../services/discountsApi";
import {useGetRailConnectionsQuery} from "../../services/railConnectionsApi";
import {useGetStationsQuery} from "../../services/stationsApi";

const EditTrains = () => {
    const [name, setName] = useState<string>("")
    const [nameInput, setNameInput] = useState<boolean>(true)
    const [isNameValidLength, setIsNameValidLength] = useState<boolean>(true)

    const [locomotiveName, setLocomotiveName] = useState<string>("")
    const [locomotiveNameInput, setLocomotiveNameInput] = useState<boolean>(true)
    const [isLocomotiveIdInteger, setIsLocomotiveIdInteger] = useState<boolean>(true)

    const {refetch: refetchReservations} = useGetReservationsQuery(null)
    const {refetch: refetchTrainRides} = useGetTrainRidesQuery(null)
    const {refetch: refetchWorkers} = useGetWorkersQuery(null)
    const {refetch: refetchRailroadCarsInTheTrain} = useGetRailroadCarsInTheTrainQuery(null)
    const {refetch: refetchTrainStop} = useGetTrainStopsQuery(null)
    const {refetch: refetchStations} = useGetStationsQuery(null)
    const {refetch: refetchRailroadCar} = useGetRailroadCarsQuery(null)
    const {refetch: refetchDiscounts} = useGetDiscountsQuery(null)
    const {refetch: refetchRailConnections} = useGetRailConnectionsQuery(null)

    const navigate = useNavigate()
    const {id} = useParams()

    const {
        data: getSingleTrainData,
        isSuccess: isGetSingleTrainSuccess
    } = useGetSingleTrainQuery(id, {
        skip: id === undefined
    })

    const [deleteTrain,
        {
            error: deleteTrainError,
            isError: isDeleteTrainError,
            isSuccess: isDeleteTrainSuccess
        }] = useDeleteTrainMutation()

    const [updateTrain, {
        error: updateTrainError,
        isError: isUpdateTrainError,
        isSuccess: isUpdateTrainSuccess
    }] = useUpdateTrainMutation()

    const deleteSingleTrain = async () => {
        await deleteTrain(id)
    }

    useEffect(() => {
        if (isDeleteTrainSuccess) {
            refetchReservations()
            refetchTrainRides()
            refetchWorkers()
            refetchTrainStop()
            refetchStations()
            refetchRailroadCar()
            refetchRailConnections()
            refetchDiscounts()
            refetchRailroadCarsInTheTrain()
            navigate("/train")
        }
    }, [isDeleteTrainSuccess, navigate, refetchDiscounts, refetchRailConnections, refetchRailroadCar, refetchRailroadCarsInTheTrain, refetchReservations, refetchTrainRides, refetchTrainStop, refetchStations, refetchWorkers])

    const checkIdInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsLocomotiveIdInteger(() => false)
        } else {
            setIsLocomotiveIdInteger(() => true)
        }
    }

    const checkNameValidLength = (userInput: string) => {
        if (userInput.length > 32) {
            setIsNameValidLength(false)
        } else {
            setIsNameValidLength(true)
        }
    }

    const updateSingleTrain = async () => {
        if (name === "" || locomotiveName === "" || !isLocomotiveIdInteger || !isNameValidLength) {
            setLocomotiveNameInput(false)
            setNameInput(false)
        } else {
            const singleTrain: Train = {
                nazwa: name,
                idlokomotywy: parseInt(locomotiveName),
                id: parseInt(id?.toString() || "undefined")
            }
            await updateTrain(singleTrain)
        }
    }

    useEffect(() => {
        if (isUpdateTrainSuccess) {
            navigate("/train")
        }
    }, [isUpdateTrainSuccess, navigate])

    useEffect(() => {
        if (isGetSingleTrainSuccess) {
            setLocomotiveName(String(getSingleTrainData[0].idlokomotywy))
            setName(getSingleTrainData[0].nazwa)
        }
    }, [getSingleTrainData, isGetSingleTrainSuccess])

    if (getSingleTrainData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj pociąg</p>
                </div>
                <div className={"bg-white w-full rounded-xl pt-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Nazwa</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={name}
                                   onChange={(e) => {
                                       setName(e.target.value)
                                       setNameInput(false)
                                   }}
                                   onBlur={(e) => checkNameValidLength(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${name === "" && !nameInput && isNameValidLength  ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole nazwa jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isNameValidLength ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Nazwa musi mieć długość do 32 znaków
                            </p>
                        </div>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Id lokomotywy</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={locomotiveName}
                                   onChange={(e) => {
                                       setLocomotiveName(e.target.value)
                                       setLocomotiveNameInput(false)
                                   }}
                                   onBlur={(e) => checkIdInteger(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${locomotiveName === "" && !locomotiveNameInput && isLocomotiveIdInteger ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole id lokomotywy jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isLocomotiveIdInteger ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Id lokomotywy powinno być liczbą
                            </p>
                        </div>
                        <div className={`flex items-center ${isUpdateTrainError ?
                            "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                {// @ts-ignore
                                    updateTrainError !== undefined ? updateTrainError!.data : ""}
                            </p>
                        </div>
                    </div>

                    <div className={"flex"}>
                        <button onClick={() => navigate("/train")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleTrain()}>
                                Usuń
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleTrain()}>
                                Zapisz zmiany
                            </button>
                        </div>
                    </div>

                    <div className={"h-8 flex w-full text-red-900 text-xs justify-end"}>
                        <div
                            className={`flex items-center ${
                                // @ts-ignore
                                deleteTrainError !== undefined ?
                                    "visible w-full justify-end flex" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2 flex"}/>
                            <p className={"flex justify-end"}>
                                {// @ts-ignore
                                    deleteTrainError !== undefined && deleteTrainError.data ? deleteTrainError.data : ""}
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

export default EditTrains
