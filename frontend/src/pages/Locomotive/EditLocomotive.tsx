import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom";
import {useGetSingleLocomotiveQuery} from "../../services/locomotivesApi";
import {Locomotive} from "../../types";
import {useDeleteLocomotiveMutation, useUpdateLocomotiveMutation} from "../../services/locomotivesApi";
import Menu from "../../components/Menu";

const EditLocomotive = () => {
    const [technicalResearch, setTechnicalResearch] = useState<string>("")
    const [technicalResearchInput, setTechnicalResearchInput] = useState<boolean>(true)

    const [locomotiveName, setLocomotiveName] = useState<string>("")
    const [locomotiveInput, setLocomotiveNameInput] = useState<boolean>(true)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleLocomotiveData,
        isSuccess: isGetSingleLocomotiveSuccess
    } = useGetSingleLocomotiveQuery(id, {
        skip: id === undefined
    })

    const deleteSingleLocomotive = async () => {
        await deleteLocomotive(id)
        navigate("/locomotive")
    }

    const updateSingleLocomotive = async () => {
        // updateLocomotive()
        // navigate("/locomotive")
    }

    const [deleteLocomotive] = useDeleteLocomotiveMutation()
    const [updateLocomotive] = useUpdateLocomotiveMutation()

    useEffect(() => {
        if (isGetSingleLocomotiveSuccess) {
            setTechnicalResearch(getSingleLocomotiveData[0].databadaniatechnicznego.toString().split('T')[0])
            setLocomotiveName(getSingleLocomotiveData[0].nazwa)
        }
    }, [getSingleLocomotiveData, isGetSingleLocomotiveSuccess])

    if (getSingleLocomotiveData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj informacje o lokomotywie</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Data badania technicznego</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   type={"date"}
                                   value={technicalResearch}
                                   onChange={(e) => {
                                       setTechnicalResearch(e.target.value)
                                       setTechnicalResearchInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Nazwa</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={locomotiveName}
                                   onChange={(e) => {
                                       setLocomotiveName(e.target.value)
                                       setLocomotiveNameInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"flex"}>
                        <button onClick={() => navigate("/locomotive")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleLocomotive()}>
                                Usuń
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleLocomotive()}>
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

export default EditLocomotive
