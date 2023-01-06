import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {RailroadCar, RailroadCarInTheTrain} from "../../types"
import {useNavigate} from "react-router-dom"
import {useCreateRailroadCarInTheTrainMutation} from "../../services/railroadCarsInTheTrainApi"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";
import {v4 as uuidv4} from "uuid";
import {useGetRailroadCarsQuery} from "../../services/railroadCarsApi";

const CreateRailroadCarInTheTrain = () => {
    const navigate = useNavigate()

    const [carNumber, setCarNumber] = useState<string>("")
    const [railroadCarInput, setCarNumberInput] = useState<boolean>(true)
    const [isRailroadCarNumberInteger, setIsRailroadCarNumberInteger] = useState<boolean>(true)
    const [isRailroadCarNumberPositive, setIsRailroadCarNumberPositive] = useState<boolean>(true)

    const [railroadCarInTheTrainId, setCarId] = useState<string>("")
    const [railroadCarInTheTrainIdInput, setRailroadCarInTheTrainInput] = useState<boolean>(true)
    const [isRailroadCarIdInteger, setIsRailroadCarIdInteger] = useState<boolean>(true)

    const [trainId, setTrainId] = useState<string>("")
    const [trainIdInput, setTrainIdInput] = useState<boolean>(true)
    const [isTrainIdInteger, setIsTrainIdInteger] = useState<boolean>(true)
    const [isTrainIdPositive, setIsTrainIdPositive] = useState<boolean>(true)

    const [createRailroadCar, {
        error: createRailroadCarError,
        isError: isCreateRailroadCarError,
        isSuccess: isCreateRailroadCarSuccess
    }] = useCreateRailroadCarInTheTrainMutation()

    const {
        data: getCarsData,
        isFetching: isGetCarsFetching,
        isSuccess: isGetCarsSuccess,
        isError: isGetCarsError,
    } = useGetRailroadCarsQuery(null)

    const createSingleRailroadCar = async () => {
        if (carNumber === "" || railroadCarInTheTrainId === "" || trainId === "" ||
            !isRailroadCarNumberPositive || !isRailroadCarNumberInteger || !isRailroadCarIdInteger || !isTrainIdInteger || !isTrainIdPositive) {
            setCarNumberInput(() => false)
            setRailroadCarInTheTrainInput(() => false)
            setTrainIdInput(() => false)
        } else {
            const singleRailroadCar: RailroadCarInTheTrain = {
                numerwagonu: parseInt(carNumber),
                idwagonu: parseInt(railroadCarInTheTrainId),
                idpociagu: parseInt(trainId),
            }
            await createRailroadCar(singleRailroadCar)
        }
    }

    const checkRailroadCarNumberInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsRailroadCarNumberInteger(() => false)
            setIsRailroadCarNumberPositive(() => true)
        } else {
            setIsRailroadCarNumberPositive(() => true)

            if (0 > parseInt(userInput)) {
                setIsRailroadCarNumberPositive(() => false)
            } else {
                setIsRailroadCarNumberPositive(() => true)
            }
        }
    }

    const checkTrainIdInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsTrainIdInteger(() => false)
            setIsTrainIdPositive(() => true)
        } else {
            setIsTrainIdInteger(() => true)

            if (0 > parseInt(userInput)) {
                setIsTrainIdPositive(() => false)
            } else {
                setIsTrainIdPositive(() => true)
            }
        }
    }

    useEffect(() => {
        if (isCreateRailroadCarSuccess) {
            navigate("/railroad-cars-in-the-train")
        }
    }, [isCreateRailroadCarSuccess, navigate])

    if (getCarsData !== undefined) {
        const cars = getCarsData.map((car: RailroadCar) => {
            return <option key={uuidv4()} value={car.id}>
                {car.liczbamiejsc + " miejsc, data badania technicznego " + car.databadaniatechnicznego.toString().split("T")[0]}
            </option>
        })


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
                            <input className={"w-full"}
                                   value={carNumber}
                                   onChange={(e) => {
                                       setCarNumber(e.target.value)
                                       setCarNumberInput(false)
                                   }}
                                   onBlur={(e) => checkRailroadCarNumberInteger(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${carNumber === "" && !railroadCarInput && isRailroadCarNumberPositive && isRailroadCarIdInteger ? "visible w-full"
                                : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole numer wagonu jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isRailroadCarNumberPositive ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Numer wagonu powinien być liczbą większą od zera
                            </p>
                        </div>
                        <div
                            className={`flex items-center ${!isRailroadCarIdInteger ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Numer wagonu powinien być liczbą
                            </p>
                        </div>

                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Wagon</label>
                        <div className={"flex w-4/6"}>
                            <select className={"w-full"} value={railroadCarInTheTrainId}
                                    onChange={(e) => {
                                        setCarId(e.target.value)
                                        setRailroadCarInTheTrainInput(false)
                                    }}>
                                <option value={""}>
                                    Wybierz wagon
                                </option>
                                {cars}
                            </select>
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${!railroadCarInTheTrainIdInput && railroadCarInTheTrainId === "" ? "visible w-full"
                                : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole wagon jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${
                                // @ts-ignore
                                createRailroadCarError !== undefined && createRailroadCarError.data === "Nie znaleziono wagonu o danym id" ?
                                        "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Nie znaleziono wagonu o danym id
                            </p>
                        </div>
                        <div
                            className={`flex items-center ${
                                // @ts-ignore
                                createRailroadCarError !== undefined && createRailroadCarError.data === "Dany wagon znajduje się już w tym pociągu" ?
                                    "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Dany wagon znajduje się już w tym pociągu
                            </p>
                        </div>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Id pociągu</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-full"}
                                   value={trainId}
                                   onChange={(e) => {
                                       setTrainId(e.target.value)
                                       setTrainIdInput(false)
                                   }}
                                   onBlur={(e) => checkTrainIdInteger(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${!trainIdInput && isTrainIdPositive && trainId === "" && isTrainIdInteger ? "visible w-full"
                                : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole id pociągu jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isTrainIdPositive ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Id pociągu powinno być liczbą większą od zera
                            </p>
                        </div>
                        <div
                            className={`flex items-center ${!isTrainIdInteger ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Id pociągu powinno być liczbą
                            </p>
                        </div>
                        <div
                            className={`flex items-center ${
                                // @ts-ignore
                                createRailroadCarError !== undefined && createRailroadCarError.data === "Nie znaleziono pociągu o danym id" ?
                                    "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Nie znaleziono pociągu o danym id
                            </p>
                        </div>

                        <div
                            className={`flex items-center ${
                                // @ts-ignore
                                createRailroadCarError !== undefined && createRailroadCarError.data === "Pociąg ma już przydzielony wagon z danym numerem" ?
                                    "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pociąg ma już przydzielony wagon z danym numerem
                            </p>
                        </div>
                    </div>

                    <div className={"flex mt-8"}>
                        <button onClick={() => navigate('/railroad-cars-in-the-train')}>Anuluj</button>
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
    } else {
        return <Loading/>
    }
}

export default CreateRailroadCarInTheTrain
