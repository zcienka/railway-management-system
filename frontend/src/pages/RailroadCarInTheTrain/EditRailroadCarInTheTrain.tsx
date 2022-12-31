import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {useGetSingleRailroadCarInTheTrainQuery} from "../../services/railroadCarsInTheTrainApi"
import {RailroadCar, Discount, RailroadCarInTheTrain, RailroadCarNumberless, Train} from "../../types"
import {
    useDeleteRailroadCarInTheTrainMutation,
    useUpdateRailroadCarInTheTrainMutation
} from "../../services/railroadCarsInTheTrainApi"
import Menu from "../../components/Menu"
import {useGetTrainsQuery} from "../../services/trainsApi"
import {v4 as uuidv4} from "uuid";
import {useGetRailroadCarsQuery} from "../../services/railroadCarsApi";

const EditRailroadCarInTheTrain = () => {
    const [carNumber, setCarNumber] = useState<string>("")
    const [carNumberInput, setCarNumberInput] = useState<boolean>(true)

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

    const [deleteCar] = useDeleteRailroadCarInTheTrainMutation()
    const [updateCar] = useUpdateRailroadCarInTheTrainMutation()

    const deleteSingleCar = async () => {
        const railroadcarNumberless: RailroadCarNumberless = {
            idwagonu: parseInt(carId),
            idpociagu: parseInt(trainId),
        }
        await deleteCar(railroadcarNumberless)
        navigate("/railroad-cars")
    }

    const updateSingleCar = async () => {
        const singleRailroadCar: RailroadCarInTheTrain = {
            numerwagonu: parseInt(carNumber),
            idwagonu: parseInt(carId),
            idpociagu: parseInt(trainId),
        }
        await updateCar(singleRailroadCar)
        navigate("/railroad-cars")
    }

    useEffect(() => {
        if (isGetSingleRailroadCarSuccess) {
            setCarNumber(getSingleRailroadCarData[0].numerwagonu.toString())
            setCarId(getSingleRailroadCarData[0].idwagonu.toString())
            setTrainId(getSingleRailroadCarData[0].idpociagu.toString())
            setTrainName(getSingleRailroadCarData[0].nazwapociagu.toString())
        }
    }, [getSingleRailroadCarData, isGetSingleRailroadCarSuccess])

    if (getSingleRailroadCarData !== undefined && getTrainsData !== undefined && getCarsData !== undefined) {
        const trainNames = getTrainsData.map((train: Train) => {
            return <option key={uuidv4()} value={train.nazwa}>
                {train.nazwa}
            </option>
        })

        const cars = getCarsData.map((car: RailroadCar) => {
            return <option key={uuidv4()} value={car.id}>
                {car.liczbamiejsc + " miejsc"}
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
                        <label className={"w-2/6"}>Numer wagonu</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={carNumber}
                                   onChange={(e) => {
                                       setCarNumber(e.target.value)
                                       setCarNumberInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <div className={"w-160 flex items-center"}>
                            <label className={"w-2/6"}>Pociąg</label>
                            <div className={"flex w-4/6"}>
                                <label className={"w-2/6"}>{trainName}</label>
                            </div>
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Wagon</label>
                        <div className={"flex w-4/6"}>
                            <label className={"w-2/6"}>{carId}</label>
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"flex"}>
                        <button onClick={() => navigate("/railroad-cars")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleCar()}>
                                Usuń
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleCar()}>
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

export default EditRailroadCarInTheTrain
