import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {Discount, TrainRide, Worker} from "../../types"
import Menu from "../../components/Menu"
import {
    useDeleteTrainRideMutation,
    useGetSingleTrainRideQuery, useGetTrainRidesQuery,
    useUpdateTrainRideMutation
} from "../../services/trainRideApi"
import {useGetConductorsQuery, useGetDriversQuery} from "../../services/workersApi";
import {v4 as uuidv4} from "uuid";
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";
import {useGetReservationsQuery} from "../../services/reservationsApi";

const EditTrainRide = () => {
    const [departureDate, setDepartureDate] = useState<string>("")
    const [departureDateInput, setDepartureDateInput] = useState<boolean>(true)
    const [isDepartureDateValid, setIsDepartureDateValid] = useState<boolean>(true)

    const [arrivalDate, setArrivalDate] = useState<string>("")
    const [arrivalDateInput, setArrivalDateInput] = useState<boolean>(true)
    const [isArrivalDateValid, setIsArrivalDateValid] = useState<boolean>(true)
    const [isArrivalDateLater, setIsArrivalDateLater] = useState<boolean>(true)

    const [conductorId, setConductorId] = useState<string>("")
    const [conductorIdInput, setConductorIdInput] = useState<boolean>(true)

    const [driverId, setDriverId] = useState<string>("")
    const [driverIdInput, setDriverIdInput] = useState<boolean>(true)

    const [railConnectionId, setRailConnectionId] = useState<string>("")
    const [railConnectionIdInput, setRailConnectionIdInput] = useState<boolean>(true)
    const [isLineIdInteger, setIsLineIdInteger] = useState<boolean>(true)

    const [trainId, setTrainId] = useState<string>("")
    const [trainIdInput, setTrainIdInput] = useState<boolean>(true)
    const [isTrainIdInteger, setIsTrainIdInteger] = useState<boolean>(true)
    const {refetch: refetchReservation} = useGetReservationsQuery(null)

    const navigate = useNavigate()
    const {idParam} = useParams()
    const {
        data: getSingleTrainRideData,
        isSuccess: isGetSingleTrainRideSuccess
    } = useGetSingleTrainRideQuery(idParam, {
        skip: idParam === undefined,
    })

    const {
        data: getConductorsData,
        isSuccess: isGetConductorsSuccess
    } = useGetConductorsQuery(null)

    const {
        data: getDriversData,
        isSuccess: isGetDriversSuccess
    } = useGetDriversQuery(null)

    const [deleteTrainRide,
        {
            error: deleteTrainRideError,
            isError: isDeleteTrainRideError,
            isSuccess: isDeleteTrainRideSuccess
        }] = useDeleteTrainRideMutation()

    const [updateTrainRide, {
        error: updateTrainRideError,
        isError: isUpdateTrainRideError,
        isSuccess: isUpdateTrainRideSuccess
    }] = useUpdateTrainRideMutation()

    const deleteSingleTrainRide = async () => {
        await deleteTrainRide(idParam)
    }

    const updateSingleTrainRide = async () => {
        const singleTrainRide: TrainRide = {
            id: parseInt(idParam?.toString() || "undefined"),
            dataodjazdu: departureDate,
            dataprzyjazdu: arrivalDate,
            idkonduktora: parseInt(conductorId),
            idmaszynisty: parseInt(driverId),
            idliniiprzejazdu: parseInt(railConnectionId),
            idpociagu: parseInt(trainId),
        }
        await updateTrainRide(singleTrainRide)
    }

    useEffect(() => {
        if (isUpdateTrainRideSuccess) {
            navigate("/train-rides")
        }
    }, [isUpdateTrainRideSuccess, navigate])

    useEffect(() => {
        if (isDeleteTrainRideSuccess) {
            refetchReservation()
            navigate("/train-rides")
        }
    }, [isDeleteTrainRideSuccess, navigate, refetchReservation])

    useEffect(() => {
        if (isGetSingleTrainRideSuccess) {
            setDepartureDate(getSingleTrainRideData[0].dataodjazdu.toString())
            setArrivalDate(getSingleTrainRideData[0].dataprzyjazdu.toString())
            setConductorId(getSingleTrainRideData[0].idkonduktora.toString())
            setDriverId(getSingleTrainRideData[0].idmaszynisty.toString())
            setRailConnectionId(getSingleTrainRideData[0].idliniiprzejazdu.toString())
            setTrainId(getSingleTrainRideData[0].idpociagu.toString())
        }
    }, [getSingleTrainRideData, isGetSingleTrainRideSuccess])

    const checkLineIdInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsLineIdInteger(() => false)
        } else {
            setIsLineIdInteger(() => true)
        }
    }

    const checkTrainIdInteger = (userInput: string) => {
        if (userInput !== "") {
            if (isNaN(Number(userInput))) {
                setIsTrainIdInteger(() => false)
            } else {
                setIsTrainIdInteger(() => true)
            }
        }
    }

    const checkDepartureDate = (userInput: string) => {
        const userDate = new Date(userInput)
        const todayDate = new Date()

        if (userInput !== "") {
            if (userDate > todayDate) {
                setIsDepartureDateValid(true)
            } else {
                setIsDepartureDateValid(false)
            }
        }
    }

    const checkIfArrivalDateIsLaterThanDepartureDate = () => {
        const departure = new Date(departureDate)
        const arrival = new Date(arrivalDate)

        if (arrivalDate !== "" && departureDate !== "") {
            if (arrival > departure) {
                setIsArrivalDateLater(true)
            } else {
                setIsArrivalDateLater(false)
            }
        }
    }

    const checkArrivalDate = (userInput: string) => {
        const userDate = new Date(userInput)
        const todayDate = new Date()

        if (userDate > todayDate) {
            setIsArrivalDateValid(true)
        } else {
            setIsArrivalDateValid(false)
        }
    }

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
                                   onBlur={(e) => {
                                       checkDepartureDate(e.target.value)
                                       checkIfArrivalDateIsLaterThanDepartureDate()
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${departureDate === "" && !departureDateInput && isDepartureDateValid ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole data odjazdu jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isDepartureDateValid ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Data odjazdu musi przyszła
                            </p>
                        </div>
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
                                   onBlur={(e) => {
                                       checkArrivalDate(e.target.value)
                                       checkIfArrivalDateIsLaterThanDepartureDate()
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${arrivalDate === "" && !arrivalDateInput && isArrivalDateValid && isArrivalDateLater
                                ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole data przyjazdu jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isArrivalDateLater ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Data przyjazdu musi być późniejsza od daty odjazdu
                            </p>
                        </div>

                        <div
                            className={`flex items-center ${!isArrivalDateValid ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Data przyjazdu musi przyszła
                            </p>
                        </div>
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
                        <div
                            className={`${conductorId === "" && !conductorIdInput ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole konduktor jest wymagane
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Maszynista</label>
                        <div className={"flex w-4/6"}>
                            <select className={"w-1/2"}
                                    value={driverId}
                                    onChange={(e) => {
                                        setDriverId(e.target.value)
                                        setDriverIdInput(false)
                                    }}>
                                {drivers}
                            </select>
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${driverId === "" && !driverIdInput ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole maszynista jest wymagane
                                </p>
                            </div>
                        </div>
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
                                   onBlur={(e) => checkLineIdInteger(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${railConnectionId === "" && !railConnectionIdInput && isLineIdInteger ? "visible w-full" : "invisible absolute"}`}>
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
                                Id linii musi być liczbą
                            </p>
                        </div>
                        <div className={`flex items-center ${isUpdateTrainRideError &&
                        // @ts-ignore
                        (updateTrainRideError!.data === "Dana linia przejazdu i pociąg nie istnieje" || updateTrainRideError!.data === "Dana linia przejazdu nie istnieje") ?
                            "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Dana linia nie istnieje
                            </p>
                        </div>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Id pociągu</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={trainId}
                                   onChange={(e) => {
                                       setTrainId(e.target.value)
                                       setTrainIdInput(false)
                                   }}
                                   onBlur={(e) => checkTrainIdInteger(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${trainId === "" && !trainIdInput && isTrainIdInteger ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole id pociągu jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isTrainIdInteger ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Id pociągu musi być liczbą
                            </p>
                        </div>
                        <div className={`flex items-center ${isUpdateTrainRideError &&
                        // @ts-ignore
                        (updateTrainRideError!.data === "Dana linia przejazdu i pociąg nie istnieje" || updateTrainRideError!.data === "Dany pociąg nie istnieje") ?
                            "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Dany pociąg nie istnieje
                            </p>
                        </div>
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
                <div className={"h-8 flex w-full text-red-900 text-xs justify-end"}>
                    <div
                        className={`flex items-center ${
                            // @ts-ignore
                            deleteTrainRideError !== undefined ?
                                "visible w-full justify-end flex" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2 flex"}/>
                        <p className={"flex justify-end"}>
                            {// @ts-ignore
                                deleteTrainRideError !== undefined && deleteTrainRideError.data ? deleteTrainRideError.data : ""}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditTrainRide
