import React, {useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {useNavigate} from "react-router-dom"
import {useCreateTrainStopMutation} from "../../services/trainStopApi"
import {TrainStop} from "../../types"

const CreateTrainStop = () => {
    const navigate = useNavigate()

    const [trainStopNumber, setTrainStopNumber] = useState<string>("")
    const [trainStopNumberInput, setTrainStopNumberInput] = useState<boolean>(true)

    const [stationName, setStationName] = useState<string>("")
    const [stationNameInput, setStationNameInput] = useState<boolean>(true)

    const [lineId, setLineId] = useState<string>("")
    const [lineIdInput, setLineIdInput] = useState<boolean>(true)

    const [createTrainStop] = useCreateTrainStopMutation()

    const createSingleTrainStop = async () => {
        const singleTrainStop: TrainStop = {
            numerprzystanku: parseInt(trainStopNumber),
            nazwastacji: stationName,
            idlinii: parseInt(lineId),
        }
        await createTrainStop(singleTrainStop)
        navigate("/train-stops")
    }

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Dodawanie przystanku</p>
            </div>
            <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Numer przystanku</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={trainStopNumber}
                               onChange={(e) => {
                                   setTrainStopNumber(e.target.value)
                                   setTrainStopNumberInput(false)
                               }}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Nazwa stacji</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={stationName}
                               onChange={(e) => {
                                   setStationName(e.target.value)
                                   setStationNameInput(false)
                               }}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Id linii przejazdu</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={lineId}
                               onChange={(e) => {
                                   setLineId(e.target.value)
                                   setLineIdInput(false)
                               }}
                        />
                    </div>
                </div>

                <div className={"flex mt-8"}>
                    <button onClick={() => navigate('/train-stops')}>Anuluj</button>
                    <div className={"flex justify-end w-full"}>
                        <button
                            className={"cursor-pointer"}
                            onClick={() => createSingleTrainStop()}>
                            Dodaj
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CreateTrainStop
