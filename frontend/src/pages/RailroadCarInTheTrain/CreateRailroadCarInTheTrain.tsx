import React, {useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {RailroadCarInTheTrain} from "../../types"
import {useNavigate} from "react-router-dom"
import {useCreateRailroadCarInTheTrainMutation} from "../../services/railroadCarsInTheTrainApi"

const CreateRailroadCarInTheTrain = () => {
    const navigate = useNavigate()

    const [railroadCarInTheTrainNumber, setCarNumber] = useState<string>("")
    const [carriaInput, setCarNumberInput] = useState<boolean>(true)

    const [railroadCarInTheTrainId, setCarId] = useState<string>("")
    const [railroadCarInTheTrainIdInput, setRailroadCarInTheTrainId] = useState<boolean>(true)

    const [trainId, setTrainId] = useState<string>("")
    const [trainIdInput, setTrainIdInput] = useState<boolean>(true)

    const [createRailroadCar] = useCreateRailroadCarInTheTrainMutation()

    const createSingleRailroadCar = async () => {
        const singleRailroadCar: RailroadCarInTheTrain = {
            numerwagonu: parseInt(railroadCarInTheTrainNumber),
            idwagonu: parseInt(railroadCarInTheTrainId),
            idpociagu: parseInt(trainId),
        }
        await createRailroadCar(singleRailroadCar)
        navigate("/railroad-cars")
    }

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Dodawanie wagonu w pociągu</p>
            </div>
            <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Numer wagonu</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={railroadCarInTheTrainNumber}
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
                               value={railroadCarInTheTrainId}
                               onChange={(e) => {
                                   setCarId(e.target.value)
                                   setRailroadCarInTheTrainId(false)
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

                <div className={"flex mt-8"}>
                    <button onClick={() => navigate('/railroad-cars')}>Anuluj</button>
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

export default CreateRailroadCarInTheTrain
