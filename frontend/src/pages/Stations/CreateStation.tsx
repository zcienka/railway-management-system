import React, {useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {Station} from "../../types"
import {useCreateStationMutation} from "../../services/stationsApi"
import {useNavigate} from "react-router-dom"

const CreateStation = () => {
    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [nameInput, setNameInput] = useState<boolean>(true)

    const [address, setAddress] = useState<string>("")
    const [addressInput, setAddressInput] = useState<boolean>(true)

    const [createStation] = useCreateStationMutation()

    const createSingleStation = async () => {
        const singleStation: Station = {
            nazwa: name,
            adres: address
        }
        await createStation(singleStation)
        navigate("/stations")
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
                        />
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
