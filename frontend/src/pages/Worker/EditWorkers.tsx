import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom";
import {Worker} from "../../types";
import Menu from "../../components/Menu";
import {
    useDeleteWorkerMutation,
    useGetSingleWorkerQuery, useGetWorkersQuery,
    useUpdateWorkerMutation
} from "../../services/workersApi";
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";
import {useGetTrainRidesQuery} from "../../services/trainRideApi";

const EditWorkers = () => {
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
    const {refetch: refetchTrainRides} = useGetTrainRidesQuery(null)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleWorkerData,
        isSuccess: isGetSingleWorkerSuccess
    } = useGetSingleWorkerQuery(id, {
        skip: id === undefined
    })

    const [deleteWorker,
        {
            error: deleteWorkerError,
            isError: isDeleteWorkerError,
            isSuccess: isDeleteWorkerSuccess
        }] = useDeleteWorkerMutation()
    const [updateWorker,
        {
            error: updateWorkerError,
            isError: isUpdateWorkerError,
            isSuccess: isUpdateWorkerSuccess
        }] = useUpdateWorkerMutation()

    const deleteSingleWorker = async () => {
        await deleteWorker(id)
        refetchTrainRides()
    }

    const updateSingleWorker = async () => {
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
                zawod: occupation,
                id: parseInt(id?.toString() || "undefined")
            }
            await updateWorker(singleWorker)
        }
    }

    useEffect(() => {
        if (isUpdateWorkerSuccess) {
            navigate("/workers")
        }
    }, [isUpdateWorkerSuccess, navigate])

    useEffect(() => {
        if (isDeleteWorkerSuccess) {
            navigate("/workers")
        }
    }, [isDeleteWorkerSuccess, navigate])

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
        if (isGetSingleWorkerSuccess) {
            setName(getSingleWorkerData[0].imie)
            setLastName(getSingleWorkerData[0].nazwisko)
            setWage(getSingleWorkerData[0].placa.toString())
            setOccupation(getSingleWorkerData[0].zawod)
        }
    }, [getSingleWorkerData, isGetSingleWorkerSuccess])

    if (getSingleWorkerData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj pracownika</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Imię</label>
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
                                    Pole imię jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isNameValidLength ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Imię musi mieć długość do 32 znaków
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
                                Nazwisko musi mieć długość do 32 znaków
                            </p>
                        </div>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Płaca</label>
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
                                    Pole płaca jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isWageInteger ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Płaca powinna być liczbą
                            </p>
                        </div>
                        <div
                            className={`flex items-center ${!isWagePositive ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Płaca powinna być większa od zera
                            </p>
                        </div>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Zawód</label>
                        <div className={"flex w-4/6"}>

                            <select className={"w-1/2"} value={occupation} onChange={(e) => {
                                setOccupation(e.target.value)
                                setOccupationInput(false)
                            }}>
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
                                    Pole zawód jest wymagane
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={"flex"}>
                        <button onClick={() => navigate("/workers")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleWorker()}>
                                Usuń
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleWorker()}>
                                Zapisz zmiany
                            </button>
                        </div>
                    </div>
                    <div className={"h-8 flex w-full text-red-900 text-xs justify-end"}>
                        <div
                            className={`flex items-center ${
                                // @ts-ignore
                                deleteWorkerError !== undefined ?
                                    "visible w-full justify-end flex" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2 flex"}/>
                            <p className={"flex justify-end"}>
                                {// @ts-ignore
                                    deleteWorkerError !== undefined && deleteWorkerError.data ? deleteWorkerError.data : ""}
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

export default EditWorkers
