import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {
    useGetRailroadCarsInTheTrainQuery,
    useGetSingleRailroadCarInTheTrainQuery
} from "../../services/railroadCarsInTheTrainApi"
import {RailroadCar, Discount, RailroadCarInTheTrain, RailroadCarNumberless, Train} from "../../types"
import {
    useDeleteRailroadCarInTheTrainMutation,
    useUpdateRailroadCarInTheTrainMutation
} from "../../services/railroadCarsInTheTrainApi"
import Menu from "../../components/Menu"
import {useGetTrainsQuery} from "../../services/trainsApi"
import {v4 as uuidv4} from "uuid";
import {useGetRailroadCarsQuery} from "../../services/railroadCarsApi";
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";
import {useGetReservationsQuery} from "../../services/reservationsApi";
import {useGetTrainRidesQuery} from "../../services/trainRideApi";
import {useGetWorkersQuery} from "../../services/workersApi";
import {useGetLocomotivesQuery} from "../../services/locomotivesApi";
import {useGetTrainStopsQuery} from "../../services/trainStopApi";
import {useGetStationsQuery} from "../../services/stationsApi";
import {useGetDiscountsQuery} from "../../services/discountsApi";
import {useGetRailConnectionsQuery} from "../../services/railConnectionsApi";

const EditRailroadCarInTheTrain = () => {
    const [carNumber, setCarNumber] = useState<string>("")
    const [carNumberInput, setCarNumberInput] = useState<boolean>(true)
    const [isRailroadCarNumberInteger, setIsRailroadCarNumberInteger] = useState<boolean>(true)
    const [isRailroadCarNumberPositive, setIsRailroadCarNumberPositive] = useState<boolean>(true)

    const [carId, setCarId] = useState<string>("")
    const [carIdInput, setCarIdInput] = useState<boolean>(true)

    const [trainName, setTrainName] = useState<string>("")
    const [trainNameInput, setTrainNameInput] = useState<boolean>(true)

    const [trainId, setTrainId] = useState<string>("")
    const [trainIdInput, setTrainIdInput] = useState<boolean>(true)

    const navigate = useNavigate()
    const {trainIdParam, carIdParam} = useParams()

    const {
        data: getTrainsData,
        isFetching: isGetTrainsFetching,
        isSuccess: isGetTrainsSuccess,
        isError: isGetTrainsError,
    } = useGetTrainsQuery(null)

    const {
        data: getCarsData,
        isFetching: isGetCarsFetching,
        isSuccess: isGetCarsSuccess,
        isError: isGetCarsError,
    } = useGetRailroadCarsQuery(null)

    const {
        data: getSingleRailroadCarData,
        isSuccess: isGetSingleRailroadCarSuccess
    } = useGetSingleRailroadCarInTheTrainQuery({
        "trainId": trainIdParam,
        "carId": carIdParam
    }, {
        skip: trainIdParam === undefined || carIdParam === undefined
    })

    const [deleteCar, {
        error: deleteRailroadCarError,
        isError: isDeleteRailroadCarError,
        isSuccess: isDeleteRailroadCarSuccess
    }] = useDeleteRailroadCarInTheTrainMutation()

    const [updateCar, {
        error: updateRailroadCarError,
        isError: isUpdateRailroadCarError,
        isSuccess: isUpdateRailroadCarSuccess
    }] = useUpdateRailroadCarInTheTrainMutation()

    const deleteSingleCar = async () => {
        const railroadcarNumberless: RailroadCarNumberless = {
            idwagonu: parseInt(carId),
            idpociagu: parseInt(trainId),
        }
        await deleteCar(railroadcarNumberless)
    }

    const updateSingleCar = async () => {
        if (carNumber === ""  || trainId === "" ||
            !isRailroadCarNumberPositive || !isRailroadCarNumberInteger ) {
            setCarNumberInput(() => false)
            setTrainIdInput(() => false)
        } else {
            const singleRailroadCar: RailroadCarInTheTrain = {
                numerwagonu: parseInt(carNumber),
                idwagonu: parseInt(carId),
                idpociagu: parseInt(trainId),
            }
            await updateCar(singleRailroadCar)
        }
    }
    const {refetch: refetchReservations} = useGetReservationsQuery(null)
    const {refetch: refetchTrainRides} = useGetTrainRidesQuery(null)
    const {refetch: refetchWorkers} = useGetWorkersQuery(null)
    const {refetch: refetchLocomotives} = useGetLocomotivesQuery(null)
    const {refetch: refetchTrainStop} = useGetTrainStopsQuery(null)
    const {refetch: refetchStations} = useGetStationsQuery(null)
    const {refetch: refetchTrains} = useGetTrainsQuery(null)
    const {refetch: refetchRailroadCar} = useGetRailroadCarsQuery(null)
    const {refetch: refetchDiscounts} = useGetDiscountsQuery(null)
    const {refetch: refetchRailConnections} = useGetRailConnectionsQuery(null)

    useEffect(() => {
        if (isUpdateRailroadCarSuccess) {
            navigate("/railroad-cars-in-the-train")
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
            refetchRailroadCar()
            refetchRailConnections()
            refetchDiscounts()
            refetchLocomotives()
            navigate("/railroad-cars-in-the-train")
        }
    }, [isDeleteRailroadCarSuccess, navigate, refetchDiscounts, refetchLocomotives, refetchRailConnections, refetchRailroadCar, refetchReservations, refetchStations, refetchTrainRides, refetchTrainStop, refetchTrains, refetchWorkers])

    useEffect(() => {
        if (isGetSingleRailroadCarSuccess) {
            setCarNumber(getSingleRailroadCarData[0].numerwagonu.toString())
            setCarId(getSingleRailroadCarData[0].idwagonu.toString())
            setTrainId(getSingleRailroadCarData[0].idpociagu.toString())
            setTrainName(getSingleRailroadCarData[0].nazwapociagu.toString())
        }
    }, [getSingleRailroadCarData, isGetSingleRailroadCarSuccess])

    const checkRailroadCarNumberInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsRailroadCarNumberInteger(() => false)
            setIsRailroadCarNumberPositive(() => true)
        } else {
            setIsRailroadCarNumberPositive(() => true)

            if (0 > parseInt(userInput)) {
                setIsRailroadCarNumberPositive(() => false)
            } else {
                setIsRailroadCarNumberPositive(() => true)
            }
        }
    }

    if (getSingleRailroadCarData !== undefined && getTrainsData !== undefined && getCarsData !== undefined) {
        const cars = getCarsData.map((car: RailroadCar) => {
            return <option key={uuidv4()} value={car.id}>
                {car.liczbamiejsc + " miejsc, data badania technicznego " + car.databadaniatechnicznego.toString().split("T")[0]}
            </option>
        })

        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj wagon w pociagu</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Wagon</label>
                        <div className={"flex w-4/6"}>
                            <select className={"w-full"} value={carId}
                                    onChange={(e) => {
                                        setCarId(e.target.value)
                                        setCarNumberInput(false)
                                    }}>
                                {cars}
                            </select>
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>

                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Poci??g</label>
                        <div className={"flex w-4/6"}>
                            <label className={"w-2/6"}>{trainName}</label>
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Numer wagonu</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-full"}
                                   value={carNumber}
                                   onChange={(e) => {
                                       setCarNumber(e.target.value)
                                       setCarNumberInput(false)
                                   }}
                                   onBlur={(e) => checkRailroadCarNumberInteger(e.target.value)}
                            />
                        </div>
                    </div>


                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${carNumber === "" && !carNumberInput && isRailroadCarNumberPositive && isRailroadCarNumberInteger ? "visible w-full"
                                : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole numer wagonu jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isRailroadCarNumberPositive ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Numer wagonu powinien by?? liczb?? wi??ksz?? od zera
                            </p>
                        </div>
                        <div
                            className={`flex items-center ${!isRailroadCarNumberInteger ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Numer wagonu powinien by?? liczb??
                            </p>
                        </div>
                        <div
                            className={`flex items-center ${
                                // @ts-ignore
                                updateRailroadCarError !== undefined && updateRailroadCarError.data === "Poci??g ma ju?? przydzielony wagon z danym numerem" ?
                                    "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Poci??g ma ju?? przydzielony wagon z danym numerem
                            </p>
                        </div>
                    </div>

                    <div className={"flex"}>
                        <button onClick={() => navigate("/railroad-cars-in-the-train")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleCar()}>
                                Usu??
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleCar()}>
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

export default EditRailroadCarInTheTrain
