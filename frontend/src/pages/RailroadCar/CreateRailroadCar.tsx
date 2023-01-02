import React, {useEffect, useState} from "react"
import Menu from "../../components/Menu"
import {useNavigate} from "react-router-dom";
import {RailroadCar} from "../../types";
import {useCreateRailroadCarMutation} from "../../services/railroadCarsApi"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const CreateRailroadCar = () => {
    const navigate = useNavigate()

    const [seatsNumber, setSeatsNumber] = useState<string>("")
    const [seatsInput, setSeatsInput] = useState<boolean>(true)
    const [isSeatsNumberInteger, setIsSeatsNumberInteger] = useState<boolean>(true)
    const [isSeatsNumberValidLength, setIsSeatsNumberValidLength] = useState<boolean>(true)

    const [technicalResearch, setTechnicalResearch] = useState<string>("")
    const [technicalResearchInput, setTechnicalResearchInput] = useState<boolean>(true)
    const [isTechnicalResearchValid, setIsTechnicalResearchValid] = useState<boolean>(true)

    const [createRailroadCar, {
        error: createRailroadCarError,
        isError: isCreateRailroadCarError,
        isSuccess: isCreateRailroadCarSuccess
    }] = useCreateRailroadCarMutation()

    const createSingleRailroadCar = async () => {
        if (seatsNumber === "" || technicalResearch === "" || !isSeatsNumberValidLength || !isTechnicalResearchValid
            || !isSeatsNumberInteger) {
            setSeatsInput(false)
            setTechnicalResearchInput(false)
        } else {
            const singleRailroadCar: RailroadCar = {
                databadaniatechnicznego: new Date(technicalResearch),
                liczbamiejsc: parseInt(seatsNumber)
            }
            await createRailroadCar(singleRailroadCar)
        }
    }

    const checkDate = (userInput: string) => {
        const userDate = new Date(userInput)
        const todayDate = new Date()

        if (userDate > todayDate) {
            setIsTechnicalResearchValid(true)
        } else {
            setIsTechnicalResearchValid(false)
        }
    }

    useEffect(() => {
        if (isCreateRailroadCarSuccess) {
            navigate("/railroad-cars")
        }
    }, [isCreateRailroadCarSuccess, navigate])

    const checkSeatsNumberInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsSeatsNumberInteger(() => false)
            setIsSeatsNumberValidLength(() => true)
        } else {
            setIsSeatsNumberInteger(() => true)

            if (0 > parseInt(userInput)) {
                setIsSeatsNumberValidLength(() => false)
            } else {
                setIsSeatsNumberValidLength(() => true)
            }
        }
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
                               onBlur={(e) => checkSeatsNumberInteger(e.target.value)}

                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${seatsNumber === "" && !seatsInput && isSeatsNumberInteger && isSeatsNumberValidLength ? "visible w-full"
                            : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole liczba miejsc jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isSeatsNumberInteger ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Pole liczby miejsc musi być liczbą
                        </p>
                    </div>

                    <div
                        className={`flex items-center ${!isSeatsNumberValidLength ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Liczba miejsc musi mieć wartość większą od 0
                        </p>
                    </div>
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
                               onBlur={(e) => checkDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${technicalResearch === "" && !technicalResearchInput && isTechnicalResearchValid ? "visible w-full"
                            : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole data badania technicznego jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isTechnicalResearchValid ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Data nie może być przeszła
                        </p>
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

export default CreateRailroadCar
