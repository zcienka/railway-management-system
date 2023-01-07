import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom";
import {useGetLocomotivesQuery, useGetSingleLocomotiveQuery} from "../../services/locomotivesApi";
import {Locomotive} from "../../types";
import {useDeleteLocomotiveMutation, useUpdateLocomotiveMutation} from "../../services/locomotivesApi";
import Menu from "../../components/Menu";
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";
import {useGetTrainsQuery} from "../../services/trainsApi";
import {useGetReservationsQuery} from "../../services/reservationsApi";
import {useGetTrainRidesQuery} from "../../services/trainRideApi";
import {useGetWorkersQuery} from "../../services/workersApi";
import {useGetRailConnectionsQuery} from "../../services/railConnectionsApi";
import {useGetTrainStopsQuery} from "../../services/trainStopApi";
import {useGetStationsQuery} from "../../services/stationsApi";
import {useGetRailroadCarsInTheTrainQuery} from "../../services/railroadCarsInTheTrainApi";
import {useGetRailroadCarsQuery} from "../../services/railroadCarsApi";
import {useGetDiscountsQuery} from "../../services/discountsApi";

const EditLocomotive = () => {
    const [technicalResearch, setTechnicalResearch] = useState<string>("")
    const [technicalResearchInput, setTechnicalResearchInput] = useState<boolean>(true)

    const [locomotiveName, setLocomotiveName] = useState<string>("")
    const [locomotiveInput, setLocomotiveNameInput] = useState<boolean>(true)

    const [isNameValidLength, setIsNameValidLength] = useState<boolean>(true)
    const [isTechnicalResearchValid, setIsTechnicalResearchValid] = useState<boolean>(true)
        
    const {refetch: refetchReservations} = useGetReservationsQuery(null)
    const {refetch: refetchTrainRide} = useGetTrainRidesQuery(null)
    const {refetch: refetchWorkers} = useGetWorkersQuery(null)
    const {refetch: refetchRailConnection} = useGetRailConnectionsQuery(null)
    const {refetch: refetchTrainStop} = useGetTrainStopsQuery(null)
    const {refetch: refetchStations} = useGetStationsQuery(null)
    const {refetch: refetchTrains} = useGetTrainsQuery(null)
    const {refetch: refetchRailroadCarInTheTrains} = useGetRailroadCarsInTheTrainQuery(null)
    const {refetch: refetchRailroadCar} = useGetRailroadCarsQuery(null)
    const {refetch: refetchDiscounts} = useGetDiscountsQuery(null)


    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleLocomotiveData,
        isSuccess: isGetSingleLocomotiveSuccess,
    } = useGetSingleLocomotiveQuery(id, {
        skip: id === undefined
    })

    const [deleteLocomotive, {
        error: deleteLocomotiveError,
        isError: isDeleteLocomotiveError,
        isSuccess: isDeleteLocomotiveSuccess
    }] = useDeleteLocomotiveMutation()

    const [updateLocomotive, {
        error: updateLocomotiveError,
        isError: isUpdateLocomotiveError,
        isSuccess: isUpdateLocomotiveSuccess
    }] = useUpdateLocomotiveMutation()

    const deleteSingleLocomotive = async () => {
        await deleteLocomotive(id)
    }

    const updateSingleLocomotive = async () => {
        if (technicalResearch === "" || locomotiveName === "" || !isTechnicalResearchValid || !isNameValidLength) {
            setTechnicalResearchInput(false)
            setLocomotiveNameInput(false)
        } else {
            if (id !== undefined) {
                const singleLocomotive: Locomotive = {
                    id: parseInt(id),
                    databadaniatechnicznego: new Date(technicalResearch),
                    nazwa: locomotiveName,
                }
                await updateLocomotive(singleLocomotive)
            }
        }
    }

    useEffect(() => {
        if (isUpdateLocomotiveSuccess) {
            navigate("/locomotive")
        }
    }, [isUpdateLocomotiveSuccess, navigate])

    useEffect(() => {
        if (isDeleteLocomotiveSuccess) {
            refetchReservations()
            refetchTrainRide()
            refetchWorkers()
            refetchRailConnection()
            refetchTrainStop()
            refetchStations()
            refetchTrains()
            refetchRailroadCarInTheTrains()
            refetchRailroadCar()
            refetchDiscounts()
            navigate("/locomotive")
        }
    }, [isDeleteLocomotiveSuccess, navigate, refetchDiscounts, refetchRailConnection, refetchRailroadCar, refetchRailroadCarInTheTrains, refetchReservations, refetchStations, refetchTrainRide, refetchTrainStop, refetchTrains, refetchWorkers])

    useEffect(() => {
        if (isGetSingleLocomotiveSuccess) {
            setTechnicalResearch(getSingleLocomotiveData[0].databadaniatechnicznego.toString().split('T')[0])
            setLocomotiveName(getSingleLocomotiveData[0].nazwa)
        }
    }, [getSingleLocomotiveData, isGetSingleLocomotiveSuccess])

    const checkNameValidLength = (userInput: string) => {
        if (userInput.length > 32) {
            setIsNameValidLength(false)
        } else {
            setIsNameValidLength(true)
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

    if (getSingleLocomotiveData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj informacje o lokomotywie</p>
                </div>
                <div className={"bg-white w-full rounded-xl pt-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Data badania technicznego</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   type={"date"}
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

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Nazwa</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={locomotiveName}
                                   onChange={(e) => {
                                       setLocomotiveName(e.target.value)
                                       setLocomotiveNameInput(false)
                                   }}
                                   onBlur={(e) => checkNameValidLength(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${locomotiveName === "" && !locomotiveInput && isNameValidLength ? "visible w-full"
                                : "invisible absolute"}`}>
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
                                Nazwa lokomotywy musi mieć długość do 32 znaków
                            </p>
                        </div>
                    </div>

                    <div className={"flex"}>
                        <button onClick={() => navigate("/locomotive")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleLocomotive()}>
                                Usuń
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleLocomotive()}>
                                Zapisz zmiany
                            </button>
                        </div>
                    </div>
                    <div className={"h-8 flex w-full text-red-900 text-xs justify-end"}>
                        <div
                            className={`flex items-center ${
                                // @ts-ignore
                                deleteLocomotiveError !== undefined ?
                                    "visible w-full justify-end flex" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2 flex"}/>
                            <p className={"flex justify-end"}>
                                {// @ts-ignore
                                    deleteLocomotiveError !== undefined && deleteLocomotiveError.data ? deleteLocomotiveError.data : ""}
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

export default EditLocomotive
