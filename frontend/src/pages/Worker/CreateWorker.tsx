import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {useNavigate} from "react-router-dom";
import {useCreateWorkerMutation} from "../../services/workersApi";
import {Worker} from "../../types";
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const CreateWorker = () => {
    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [nameInput, setNameInput] = useState<boolean>(true)
    const [isNameValidLength, setIsNameValidLength] = useState<boolean>(true)

    const [lastName, setLastName] = useState<string>("")
    const [lastNameInput, setLastNameInput] = useState<boolean>(true)
    const [isLastNameValidLength, setIsLastNameValidLength] = useState<boolean>(true)

    const [wage, setWage] = useState<string>("")
    const [wageInput, setWageInput] = useState<boolean>(true)
    const [isWageInteger, setIsWageInteger] = useState<boolean>(true)
    const [isWagePositive, setIsWagePositive] = useState<boolean>(true)

    const [occupation, setOccupation] = useState<string>("")
    const [occupationInput, setOccupationInput] = useState<boolean>(true)

    const [createWorker, {
        error: createTrainStopError,
        isError: isCreateTrainStopError,
        isSuccess: isCreateTrainStopSuccess
    }] = useCreateWorkerMutation()

    const createSingleWorker = async () => {
        if (name === "" || lastName === "" || wage === "" || occupation === "" || !isNameValidLength || !isLastNameValidLength
        || !isWageInteger || !isWagePositive) {
            setNameInput(false)
            setLastNameInput(false)
            setWageInput(false)
            setOccupationInput(false)
        } else {
            const singleWorker: Worker = {
                imie: name,
                nazwisko: lastName,
                placa: parseInt(wage),
                zawod: occupation
            }
            await createWorker(singleWorker)
        }
    }

    const checkNameValidLength = (userInput: string) => {
        if (userInput.length > 32) {
            setIsNameValidLength(false)
        } else {
            setIsNameValidLength(true)
        }
    }

    const checkLastNameValidLength = (userInput: string) => {
        if (userInput.length > 32) {
            setIsLastNameValidLength(false)
        } else {
            setIsLastNameValidLength(true)
        }
    }

    const checkWageInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsWageInteger(() => false)
            setIsWagePositive(() => true)
        } else {
            setIsWageInteger(() => true)

            if (0 > parseInt(userInput)) {
                setIsWagePositive(() => false)
            } else {
                setIsWagePositive(() => true)
            }
        }
    }

    useEffect(() => {
        if (isCreateTrainStopSuccess) {
            navigate("/workers")
        }
    }, [isCreateTrainStopSuccess, navigate])


    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Dodawanie pracownika</p>
            </div>
            <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Imi??</label>
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
                        className={`${name === "" && !nameInput && isNameValidLength ? "visible w-full" : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole imi?? jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isNameValidLength ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Imi?? musi mie?? d??ugo???? do 32 znak??w
                        </p>
                    </div>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Nazwisko</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={lastName}
                               onChange={(e) => {
                                   setLastName(e.target.value)
                                   setLastNameInput(false)
                               }}
                               onBlur={(e) => checkLastNameValidLength(e.target.value)}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${lastName === "" && !lastNameInput && isLastNameValidLength ? "visible w-full" : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole nazwisko jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isLastNameValidLength ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Nazwisko musi mie?? d??ugo???? do 32 znak??w
                        </p>
                    </div>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>P??aca</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={wage}
                               onChange={(e) => {
                                   setWage(e.target.value)
                                   setWageInput(false)
                               }}
                               onBlur={(e) => checkWageInteger(e.target.value)}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${wage === "" && !wageInput && isWageInteger && isWagePositive ? "visible w-full" : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole p??aca jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isWageInteger ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            P??aca powinna by?? liczb??
                        </p>
                    </div>
                    <div
                        className={`flex items-center ${!isWagePositive ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            P??aca powinna by?? wi??ksza od zera
                        </p>
                    </div>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Zaw??d</label>
                    <div className={"flex w-4/6"}>

                        <select className={"w-1/2"} value={occupation}   onChange={(e) => {
                            setOccupation(e.target.value)
                            setOccupationInput(false)
                        }}>
                            <option value={""}>
                                Wybierz zaw??d
                            </option>
                            <option value={"Maszynista"}>
                                Maszynista
                            </option>
                            <option value={"Konduktor"}>
                                Konduktor
                            </option>
                        </select>
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${occupation === "" && !occupationInput ? "visible w-full" : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole zaw??d jest wymagane
                            </p>
                        </div>
                    </div>
                </div>

                <div className={"flex mt-8"}>
                    <button onClick={() => navigate('/workers')}>Anuluj</button>
                    <div className={"flex justify-end w-full"}>
                        <button
                            className={"cursor-pointer"}
                            onClick={() => createSingleWorker()}>
                            Dodaj
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CreateWorker
