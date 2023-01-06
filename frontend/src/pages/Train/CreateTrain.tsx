import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {useNavigate} from "react-router-dom";
import {useCreateTrainMutation} from "../../services/trainsApi";
import {Train} from "../../types";
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";
import {useGetTrainStopsQuery} from "../../services/trainStopApi";
import {useGetTrainRidesQuery} from "../../services/trainRideApi";

const CreateTrain = () => {
    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [nameInput, setNameInput] = useState<boolean>(true)
    const [isNameValidLength, setIsNameValidLength] = useState<boolean>(true)

    const [locomotiveName, setLocomotiveId] = useState<string>("")
    const [locomotiveNameInput, setLocomotiveIdInput] = useState<boolean>(true)
    const [isLocomotiveIdInteger, setIsLocomotiveIdInteger] = useState<boolean>(true)

    const [createTrain, {
        error: createTrainError,
        isError: isCreateTrainError,
        isSuccess: isCreateTrainSuccess
    }] = useCreateTrainMutation()

    const createSingleTrain = async () => {
        if (name === "" || locomotiveName === "" || !isLocomotiveIdInteger || !isNameValidLength) {
            setLocomotiveIdInput(false)
            setNameInput(false)
        } else {
            const singleTrain: Train = {
                nazwa: name,
                idlokomotywy: parseInt(locomotiveName)
            }
            await createTrain(singleTrain)
        }
    }

    const checkNameValidLength = (userInput: string) => {
        if (userInput.length > 32) {
            setIsNameValidLength(false)
        } else {
            setIsNameValidLength(true)
        }
    }

    const checkIdInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsLocomotiveIdInteger(() => false)
        } else {
            setIsLocomotiveIdInteger(() => true)
        }
    }

    useEffect(() => {
        if (isCreateTrainSuccess) {
            navigate("/train")
        }
    }, [isCreateTrainSuccess, navigate])

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Dodawanie pociągu</p>
            </div>
            <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Nazwa</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={name}
                               onChange={(e) => {
                                   setName(e.target.value)
                                   setNameInput(false)
                               }}
                               onBlur={(e) => checkNameValidLength(e.target.value)}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${name === "" && !nameInput  ? "visible w-full" : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole nazwa jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isNameValidLength ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Nazwa musi mieć długość do 32 znaków
                        </p>
                    </div>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Id lokomotywy</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={locomotiveName}
                               onChange={(e) => {
                                   setLocomotiveId(e.target.value)
                                   setLocomotiveIdInput(false)
                               }}
                               onBlur={(e) => checkIdInteger(e.target.value)}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${locomotiveName === "" && !locomotiveNameInput && isLocomotiveIdInteger  ? "visible w-full" : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole id lokomotywy jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isLocomotiveIdInteger ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Id lokomotywy powinno być liczbą
                        </p>
                    </div>
                    <div className={`flex items-center ${isCreateTrainError ?
                        "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            {// @ts-ignore
                                createTrainError !== undefined ? createTrainError!.data : ""}
                        </p>
                    </div>
                </div>

                <div className={"flex mt-8"}>
                    <button onClick={() => navigate('/train')}>Anuluj</button>
                    <div className={"flex justify-end w-full"}>
                        <button
                            className={"cursor-pointer"}
                            onClick={() => createSingleTrain()}>
                            Dodaj
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CreateTrain
