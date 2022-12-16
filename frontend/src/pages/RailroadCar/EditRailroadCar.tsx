import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {useGetSingleRailroadCarQuery} from "../../services/railroadCarsApi"
import {RailroadCar} from "../../types"
import {useDeleteRailroadCarMutation, useUpdateRailroadCarMutation} from "../../services/railroadCarsApi"
import Menu from "../../components/Menu"

const EditRailroadCar = () => {
    const [carNumber, setCarNumber] = useState<string>("")
    const [carNumberInput, setCarNumberInput] = useState<boolean>(true)

    const [carId, setCarId] = useState<string>("")
    const [carIdInput, setCarIdInput] = useState<boolean>(true)

    const [trainId, setTrainId] = useState<string>("")
    const [trainIdInput, setTrainIdInput] = useState<boolean>(true)

    const navigate = useNavigate()
    const {trainIdParam, carIdParam} = useParams()

    const {
        data: getSingleRailroadCarData,
        isSuccess: isGetSingleRailroadCarSuccess
    } = useGetSingleRailroadCarQuery({
        "trainId": trainIdParam,
        "carId": carIdParam
    }, {
        skip: trainIdParam === undefined || carIdParam === undefined
    })

    const [deleteCar] = useDeleteRailroadCarMutation()
    const [updateCar] = useUpdateRailroadCarMutation()

    const deleteSingleCar = async () => {
        await deleteCar(trainIdParam)
        navigate("/railroad-cars")
    }

    const updateSingleCar = async () => {
        // updateCar()
        // navigate("/railroad-cars")
    }
console.log({getSingleRailroadCarData})
    useEffect(() => {
        if (isGetSingleRailroadCarSuccess) {
            setCarNumber(getSingleRailroadCarData[0].numerwagonu.toString())
            setCarId(getSingleRailroadCarData[0].idwagonu.toString())
            setTrainId(getSingleRailroadCarData[0].idpociagu.toString())
        }
    }, [getSingleRailroadCarData, isGetSingleRailroadCarSuccess])

    if (getSingleRailroadCarData !== undefined) {
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
                        <label className={"w-2/6"}>Id wagonu</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={carId}
                                   onChange={(e) => {
                                       setCarId(e.target.value)
                                       setCarIdInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
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
                            />
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

export default EditRailroadCar
