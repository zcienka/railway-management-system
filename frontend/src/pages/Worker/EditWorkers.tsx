import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom";
import {Worker} from "../../types";
import Menu from "../../components/Menu";
import {
    useDeleteWorkerMutation,
    useGetSingleWorkerQuery,
    useUpdateWorkerMutation
} from "../../services/workersApi";

const EditWorkers = () => {
    const [name, setName] = useState<string>("")
    const [nameInput, setNameInput] = useState<boolean>(true)

    const [lastName, setLastName] = useState<string>("")
    const [lastNameInput, setLastNameInput] = useState<boolean>(true)

    const [wage, setWage] = useState<string>("")
    const [wageInput, setWageInput] = useState<boolean>(true)

    const [occupation, setOccupation] = useState<string>("")
    const [occupationInput, setOccupationInput] = useState<boolean>(true)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleWorkerData,
        isSuccess: isGetSingleWorkerSuccess
    } = useGetSingleWorkerQuery(id, {
        skip: id === undefined
    })

    const [deleteWorker] = useDeleteWorkerMutation()
    const [updateWorker] = useUpdateWorkerMutation()

    const deleteSingleWorker = async () => {
        await deleteWorker(id)
        navigate("/workers")
    }

    const updateSingleWorker = async () => {
        // updateWorker()
        // navigate("/workers")
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

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
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
                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditWorkers
