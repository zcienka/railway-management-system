import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {Station} from "../../types"
import {useCreateStationMutation} from "../../services/stationsApi"
import {useNavigate} from "react-router-dom"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const CreateStation = () => {
    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [nameInput, setNameInput] = useState<boolean>(true)
    const [isNameValidLength, setIsNameValidLength] = useState<boolean>(true)

    const [address, setAddress] = useState<string>("")
    const [addressInput, setAddressInput] = useState<boolean>(true)
    const [isAddressValidLength, setIsAddressValidLength] = useState<boolean>(true)

    const [createStation, {
        error: createStationError,
        isError: isCreateStationError,
        isSuccess: isCreateStationSuccess
    }] = useCreateStationMutation()

    const createSingleStation = async () => {
        if (name === "" || address === "" || !isNameValidLength || !isAddressValidLength) {
            setNameInput(false)
            setAddressInput(false)
        } else {
            const singleStation: Station = {
                nazwa: name,
                adres: address
            }
            await createStation(singleStation)
        }
    }

    useEffect(() => {
        if (isCreateStationSuccess) {
            navigate("/stations")
        }
    }, [isCreateStationSuccess, navigate])

    const checkNameValidLength = (userInput: string) => {
        if (userInput.length > 61) {
            setIsNameValidLength(false)
        } else {
            setIsNameValidLength(true)
        }
    }

    const checkAddressValidLength = (userInput: string) => {
        if (userInput.length > 61) {
            setIsAddressValidLength(false)
        } else {
            setIsAddressValidLength(true)
        }
    }

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Dodawanie stacji</p>
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
                        className={`${name === "" && !nameInput && isNameValidLength
                            ? "visible w-full" : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole nazwa stacji jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isNameValidLength ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Nazwa musi mieć długość do 61 znaków
                        </p>
                    </div>
                    <div className={`flex items-center ${isCreateStationError ?
                        "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            {// @ts-ignore
                                createStationError !== undefined ? createStationError!.data : ""}
                        </p>
                    </div>
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
                               onBlur={(e) => checkAddressValidLength(e.target.value)}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${address === "" && !addressInput && isAddressValidLength
                            ? "visible w-full" : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole adres jest wymagane
                            </p>
                        </div>
                        <div
                            className={`flex items-center ${!isAddressValidLength ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Adres musi mieć długość do 61 znaków
                            </p>
                        </div>
                    </div>
                </div>

                <div className={"flex mt-8"}>
                    <button onClick={() => navigate('/stations')}>Anuluj</button>
                    <div className={"flex justify-end w-full"}>
                        <button
                            className={"cursor-pointer"}
                            onClick={() => createSingleStation()}>
                            Dodaj
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CreateStation
