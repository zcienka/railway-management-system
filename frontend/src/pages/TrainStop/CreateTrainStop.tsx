import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {useNavigate} from "react-router-dom"
import {useCreateTrainStopMutation} from "../../services/trainStopApi"
import {TrainStop} from "../../types"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const CreateTrainStop = () => {
    const navigate = useNavigate()

    const [trainStopNumber, setTrainStopNumber] = useState<string>("")
    const [trainStopNumberInput, setTrainStopNumberInput] = useState<boolean>(true)
    const [isTrainStopNumberInteger, setIsTrainStopNumberInteger] = useState<boolean>(true)
    const [isTrainStopNumberPositive, setIsTrainStopNumberPositive] = useState<boolean>(true)

    const [stationName, setStationName] = useState<string>("")
    const [stationNameInput, setStationNameInput] = useState<boolean>(true)

    const [lineId, setLineId] = useState<string>("")
    const [lineIdInput, setLineIdInput] = useState<boolean>(true)
    const [isLineIdInteger, setIsLineIdInteger] = useState<boolean>(true)
    const [isLineIdPositive, setIsLineIdPositive] = useState<boolean>(true)

    const [createTrainStop, {
        error: createTrainStopError,
        isError: isCreateTrainStopError,
        isSuccess: isCreateTrainStopSuccess
    }] = useCreateTrainStopMutation()

    const createSingleTrainStop = async () => {
        if (trainStopNumber === "" || stationName === "" || lineId === "" || !isTrainStopNumberInteger || !isLineIdInteger) {
            setTrainStopNumberInput(false)
            setStationNameInput(false)
            setLineIdInput(false)
        } else {
            const singleTrainStop: TrainStop = {
                numerprzystanku: parseInt(trainStopNumber),
                nazwastacji: stationName,
                idlinii: parseInt(lineId),
            }
            await createTrainStop(singleTrainStop)
        }
    }

    useEffect(() => {
        if (isCreateTrainStopSuccess) {
            navigate("/train-stops")
        }
    }, [isCreateTrainStopSuccess, navigate])

    const checkTrainStopNumberInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsTrainStopNumberInteger(() => false)
        } else {
            if (parseInt(userInput) < 0) {
                setIsTrainStopNumberPositive(false)
            } else {
                setIsTrainStopNumberPositive(() => true)
            }
            setIsTrainStopNumberInteger(() => true)
        }
    }

    const checkLineIdInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsLineIdInteger(() => false)
        } else {
            if (parseInt(userInput) < 0) {
                setIsLineIdPositive(false)
            } else {
                setIsLineIdPositive(() => true)
            }

            setIsLineIdInteger(() => true)
        }
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
                               onBlur={(e) => checkTrainStopNumberInteger(e.target.value)}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${trainStopNumber === "" && !trainStopNumberInput && isTrainStopNumberInteger ? "visible w-full" : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole numer przystanku jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isTrainStopNumberInteger ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Numer przystanku musi być liczbą
                        </p>
                    </div>
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
                    <div
                        className={`${stationName === "" && !stationNameInput ? "visible w-full" : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole stacja jest wymagane
                            </p>
                        </div>
                    </div>

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
                               onBlur={(e) => checkLineIdInteger(e.target.value)}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${lineId === "" && !lineIdInput && isLineIdInteger ? "visible w-full" : "invisible absolute"}`}>
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
                            Id linii przejazdu musi być liczbą
                        </p>
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
