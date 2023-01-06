import React, {useEffect, useState} from "react"
import Menu from "../../components/Menu"
import {RailConnection} from "../../types"
import {useNavigate, useParams} from "react-router-dom"
import {useEditRailConnectionMutation, useGetSingleRailConnectionQuery, useDeleteRailConnectionMutation} from "../../services/railConnectionsApi"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg"

const EditRailConnection = () => {
    const navigate = useNavigate()

    const [id, setId] = useState<string>("")
    const [idInput, setIdInput] = useState<boolean>(true)

    const [isIdInteger, setIsIdInteger] = useState<boolean>(true)
    const [isIdValidLength, setIsIdValidLength] = useState<boolean>(true)
    const {railConnectionId} = useParams()

    const {
        data: getSingleRailConnectionData,
        isSuccess: isGetSingleRailConnectionSuccess,
    } = useGetSingleRailConnectionQuery(railConnectionId, {
        skip: railConnectionId === undefined
    })
    const [deleteRailConnection] = useDeleteRailConnectionMutation()

    const [editRailConnection, {
        error: editRailConnectionError,
        isError: isEditRailConnectionError,
        isSuccess: isEditRailConnectionSuccess
    }] = useEditRailConnectionMutation()

    const deleteSingleRailConnection = async () => {
        await deleteRailConnection(id)
        navigate("/rail-connection")
    }

    useEffect(() => {
        if (isGetSingleRailConnectionSuccess) {
            setId(getSingleRailConnectionData[0].id.toString())
        }
    }, [getSingleRailConnectionData, isGetSingleRailConnectionSuccess])

    const checkIdInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsIdInteger(() => false)
            setIsIdValidLength(() => true)
        } else {
            setIsIdInteger(() => true)

            if (100 < parseInt(userInput) || 0 > parseInt(userInput)) {
                setIsIdValidLength(() => false)
            } else {
                setIsIdValidLength(() => true)
            }
        }
    }

    useEffect(() => {
        if (isEditRailConnectionSuccess) {
            navigate("/rail-connection")
        }
    }, [isEditRailConnectionSuccess, navigate])

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Edycja linii przejazdu</p>
            </div>
            <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Id</label>
                    <div className={"flex w-4/6"}>
                        {id}
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${id === "" && !idInput && isIdInteger ? "visible w-full" : "invisible absolute"}`}>
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
                            editRailConnectionError !== undefined && editRailConnectionError.data === "Linia przejazdu o danym id już istnieje" ?
                                "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Linia przejazdu o danym id już istnieje
                        </p>
                    </div>
                </div>

                <div className={"flex"}>
                    <button onClick={() => navigate("/rail-connection")}>Anuluj</button>
                    <div className={"flex justify-end w-full"}>
                        <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                onClick={() => deleteSingleRailConnection()}>
                            Usuń
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default EditRailConnection
