import React, {useEffect, useState} from "react"
import Menu from "../../components/Menu"
import {RailConnection} from "../../types"
import {useNavigate} from "react-router-dom"
import {useCreateRailConnectionMutation} from "../../services/railConnectionsApi"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const CreateRailConnection = () => {
    const navigate = useNavigate()

    const [id, setId] = useState<string>("")
    const [idInput, setIdInput] = useState<boolean>(true)

    const [isIdInteger, setIsIdInteger] = useState<boolean>(true)
    const [isIdValidLength, setIsIdValidLength] = useState<boolean>(true)

    const [createRailConnection, {
        error: createRailConnectionError,
        isError: isCreateRailConnectionError,
        isSuccess: isCreateRailConnectionSuccess
    }] = useCreateRailConnectionMutation()

    const checkIdInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsIdInteger(() => false)
            setIsIdValidLength(() => true)
        } else {
            setIsIdInteger(() => true)

            if (0 > parseInt(userInput)) {
                setIsIdValidLength(() => false)
            } else {
                setIsIdValidLength(() => true)
            }
        }
    }

    const createSingleRailConnection = async () => {
        if (id === "" || !isIdInteger || !isIdValidLength) {
            setIdInput(false)
        } else {
            const singleRailConnection: RailConnection = {
                id: parseInt(id),
            }
            await createRailConnection(singleRailConnection)
        }
    }
    useEffect(() => {
        if (isCreateRailConnectionSuccess) {
            navigate("/rail-connection")
        }
    }, [isCreateRailConnectionSuccess, navigate])

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Dodawanie linii przejazdu</p>
            </div>
            <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Id</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={id}
                               onChange={(e) => {
                                   setId(e.target.value)
                                   setIdInput(false)
                               }}
                               onBlur={(e) => checkIdInteger(e.target.value)}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${id === "" && !idInput && isIdInteger && isIdValidLength ? "visible w-full" : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole id jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isIdInteger ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Pole id musi być liczbą
                        </p>
                    </div>
                    <div
                        className={`flex items-center ${
                            // @ts-ignore
                            createRailConnectionError !== undefined && createRailConnectionError.data === "Linia przejazdu o danym id już istnieje" ? 
                            "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Linia przejazdu o danym id już istnieje
                        </p>
                    </div>
                    <div
                        className={`flex items-center ${!isIdValidLength ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Pole id musi być liczbą większą od zera
                        </p>
                    </div>
                </div>

                <div className={"flex mt-8"}>
                    <button onClick={() => navigate('/rail-connection')}>Anuluj</button>
                    <div className={"flex justify-end w-full"}>
                        <button
                            className={"cursor-pointer"}
                            onClick={() => createSingleRailConnection()}>
                            Dodaj
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CreateRailConnection
