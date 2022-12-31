import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {useGetSingleRailroadCarQuery} from "../../services/railroadCarsApi"
import {RailroadCar} from "../../types"
import {useDeleteRailroadCarMutation, useUpdateRailroadCarMutation} from "../../services/railroadCarsApi"
import Menu from "../../components/Menu"

const EditRailroadCars = () => {
    const [seatsNumber, setSeatsNumber] = useState<string>("")
    const [seatsNumberInput, setSeatsNumberInput] = useState<boolean>(true)

    const [technicalResearch, setTechnicalResearch] = useState<string>("")
    const [technicalResearchInput, setTechnicalResearchInput] = useState<boolean>(true)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleRailroadCarData,
        isSuccess: isGetSingleRailroadCarSuccess
    } = useGetSingleRailroadCarQuery(id, {
        skip: id === undefined
    })

    const deleteSingleRailroadCar = async () => {
        await deleteRailroadCar(id)
        navigate("/railroad-cars")
    }

    const updateSingleRailroadCar = async () => {
        const singleRailroadCar: RailroadCar = {
            databadaniatechnicznego: new Date(technicalResearch),
            liczbamiejsc: parseInt(seatsNumber),
            id: parseInt(id?.toString() || "undefined")
        }
        await updateRailroadCar(singleRailroadCar)
        navigate("/railroad-cars")
    }
    const [deleteRailroadCar] = useDeleteRailroadCarMutation()
    const [updateRailroadCar] = useUpdateRailroadCarMutation()

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
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Nazwa wagonu</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={seatsNumber}
                                   onChange={(e) => {
                                       setSeatsNumber(e.target.value)
                                       setSeatsNumberInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
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
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
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
                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditRailroadCars
