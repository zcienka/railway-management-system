import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {Station} from "../../types"
import {useNavigate, useParams} from "react-router-dom"
import {
    useDeleteStationMutation,
    useGetSingleStationQuery,
    useUpdateStationMutation
} from "../../services/stationsApi"
import Menu from "../../components/Menu"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const EditStations = () => {
    const [name, setName] = useState<string>("")
    const [nameInput, setNameInput] = useState<boolean>(true)

    const [address, setAddress] = useState<string>("")
    const [addressInput, setAddressInput] = useState<boolean>(true)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleStationData,
        isSuccess: isGetSingleStationSuccess
    } = useGetSingleStationQuery(id, {
        skip: id === undefined
    })

    const [deleteStation] = useDeleteStationMutation()
    const [updateStation, {
        error: updateStationError,
        isError: isUpdateStationError,
        isSuccess: isUpdateStationSuccess
    }] = useUpdateStationMutation()

    const deleteSingleStation = async () => {
        await deleteStation(id)
        navigate("/stations")
    }

    const updateSingleStation = async () => {
        const singleStation: Station = {
            nazwa: name,
            adres: address
        }
        await updateStation(singleStation)
    }
    useEffect(() => {
        if (isUpdateStationSuccess) {
            navigate("/stations")
        }
    }, [isUpdateStationSuccess, navigate])

    useEffect(() => {
        if (isGetSingleStationSuccess) {
            setAddress(getSingleStationData[0].adres)
            setName(getSingleStationData[0].nazwa)
        }
    }, [getSingleStationData, isGetSingleStationSuccess])

    if (getSingleStationData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj stację</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Nazwa</label>
                        <div className={"flex w-4/6"}>
                            <label className={"w-2/6"}>{name}</label>
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Adres</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={address}
                                   onChange={(e) => {
                                       setAddress(e.target.value)
                                       setAddressInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div className={`flex items-center ${isUpdateStationError ?
                            "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                {// @ts-ignore
                                    updateStationError !== undefined ? updateStationError!.data === "Adres stacji musi mieć długość między 1 a 61 znaków" : ""}
                                Adres stacji musi mieć długość między 1 a 61 znaków
                            </p>
                        </div>
                    </div>


                    <div className={"flex"}>
                        <button onClick={() => navigate("/stations")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleStation()}>
                                Usuń
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleStation()}>
                                Zapisz zmiany
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

export default EditStations
