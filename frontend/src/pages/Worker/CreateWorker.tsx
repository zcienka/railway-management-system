import React, {useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {useNavigate} from "react-router-dom";
import {useCreateWorkerMutation} from "../../services/workersApi";
import {Worker} from "../../types";

const CreateWorker = () => {
    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [nameInput, setNameInput] = useState<boolean>(true)

    const [lastName, setLastName] = useState<string>("")
    const [lastNameInput, setLastNameInput] = useState<boolean>(true)

    const [wage, setWage] = useState<string>("")
    const [wageInput, setWageInput] = useState<boolean>(true)

    const [occupation, setOccupation] = useState<string>("")
    const [occupationInput, setOccupationInput] = useState<boolean>(true)

    const [createWorker] = useCreateWorkerMutation()

    const createSingleWorker = async () => {
        const singleWorker: Worker = {
            imie: name,
            nazwisko: lastName,
            placa: parseInt(wage),
            zawod: occupation
        }
        await createWorker(singleWorker)
        navigate("/workers")
    }


    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Dodawanie pracownika</p>
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
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
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
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
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
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Zawód</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={occupation}
                               onChange={(e) => {
                                   setOccupation(e.target.value)
                                   setOccupationInput(false)
                               }}
                        />
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
