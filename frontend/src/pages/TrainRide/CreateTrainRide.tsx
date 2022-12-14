import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {useNavigate} from "react-router-dom"
import {useCreateTrainRideMutation} from "../../services/trainRideApi"
import {TrainRideRequest, Worker} from "../../types"
import {v4 as uuidv4} from "uuid";
import {useGetConductorsQuery, useGetDriversQuery} from "../../services/workersApi";
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const CreateTrainRide = () => {
    const navigate = useNavigate()

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

    const [createTrainRide, {
        error: createTrainRideError,
        isError: isCreateTrainRideError,
        isSuccess: isCreateTrainRideSuccess
    }] = useCreateTrainRideMutation()

    const createSingleTrainRide = async () => {
        if (departureDate === "" || arrivalDate === "" || conductorId === "" || driverId === ""
            || railConnectionId === "" || trainId === "" || !isTrainIdInteger || !isLineIdInteger || !isArrivalDateLater
            || !isDepartureDateValid || !isArrivalDateValid) {
            setDepartureDateInput(false)
            setArrivalDateInput(false)
            setConductorIdInput(false)
            setDriverIdInput(false)
            setRailConnectionIdInput(false)
            setTrainIdInput(false)
        } else {
            const singleTrainRide: TrainRideRequest = {
                dataodjazdu: departureDate,
                dataprzyjazdu: arrivalDate,
                idkonduktora: parseInt(conductorId),
                idmaszynisty: parseInt(driverId),
                idliniiprzejazdu: parseInt(railConnectionId),
                idpociagu: parseInt(trainId),
            }
            await createTrainRide(singleTrainRide)
        }
    }

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

    useEffect(() => {
        if (isCreateTrainRideSuccess) {
            navigate("/train-rides")
        }
    }, [isCreateTrainRideSuccess, navigate])

    const {
        data: getConductorsData,
        isSuccess: isGetConductorsSuccess
    } = useGetConductorsQuery(null)

    const {
        data: getDriversData,
        isSuccess: isGetDriversSuccess
    } = useGetDriversQuery(null)


    if (getDriversData !== undefined && getConductorsData !== undefined) {

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
                    <p className={"text-4xl"}>Dodawanie przejazdu</p>
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
                                Data odjazdu musi przysz??a
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
                                Data przyjazdu musi by?? p????niejsza od daty odjazdu
                            </p>
                        </div>

                        <div
                            className={`flex items-center ${!isArrivalDateValid ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Data przyjazdu musi przysz??a
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
                                <option value="">
                                    Wybierz konduktora
                                </option>
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
                                <option value="">
                                    Wybierz maszynist??
                                </option>
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
                                Id linii musi by?? liczb??
                            </p>
                        </div>
                        <div className={`flex items-center ${isCreateTrainRideError &&
                        // @ts-ignore
                        (createTrainRideError!.data === "Dana linia przejazdu i poci??g nie istnieje" || createTrainRideError!.data === "Dana linia przejazdu nie istnieje") ?
                            "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Dana linia nie istnieje
                            </p>
                        </div>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Id poci??gu</label>
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
                                    Pole id poci??gu jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isTrainIdInteger ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Id poci??gu musi by?? liczb??
                            </p>
                        </div>
                        <div className={`flex items-center ${isCreateTrainRideError &&
                        // @ts-ignore
                        (createTrainRideError!.data === "Dana linia przejazdu i poci??g nie istnieje" || createTrainRideError!.data === "Dany poci??g nie istnieje") ?
                            "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Dany poci??g nie istnieje
                            </p>
                        </div>
                    </div>

                    <div className={"flex mt-8"}>
                        <button onClick={() => navigate('/train-rides')}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button
                                className={"cursor-pointer"}
                                onClick={() => createSingleTrainRide()}>
                                Dodaj
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

export default CreateTrainRide
