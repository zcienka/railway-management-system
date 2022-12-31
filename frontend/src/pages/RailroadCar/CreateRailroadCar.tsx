import React, {useState} from "react"
import Menu from "../../components/Menu"
import {useNavigate} from "react-router-dom";
import {RailroadCar} from "../../types";
import moment from 'moment';
import {useCreateRailroadCarMutation} from "../../services/railroadCarsApi"

const CreateRailroadCar = () => {
    const navigate = useNavigate()

    const [seatsNumber, setSeatsNumber] = useState<string>("")
    const [seatsInput, setSeatsInput] = useState<boolean>(true)

    const [technicalResearch, setTechnicalResearch] = useState<string>("")
    const [technicalResearchInput, setTechnicalResearchInput] = useState<boolean>(true)
    const [createRailroadCar] = useCreateRailroadCarMutation()

    const createSingleRailroadCar = async () => {
        const singleRailroadCar: RailroadCar = {
            databadaniatechnicznego: new Date(technicalResearch),
            liczbamiejsc: parseInt(seatsNumber)
        }
        await createRailroadCar(singleRailroadCar)
        navigate("/carriages")
    }

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Dodawanie wagonu</p>
            </div>
            <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Liczba miejsc</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={seatsNumber}
                               onChange={(e) => {
                                   setSeatsNumber(e.target.value)
                                   setSeatsInput(false)
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

                <div className={"flex mt-8"}>
                    <button onClick={() => navigate('/carriages')}>Anuluj</button>
                    <div className={"flex justify-end w-full"}>
                        <button
                            className={"cursor-pointer"}
                            onClick={() => createSingleRailroadCar()}>
                            Dodaj
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CreateRailroadCar
