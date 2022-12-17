import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom";
import {Train} from "../../types";
import Menu from "../../components/Menu";
import {useDeleteTrainMutation, useGetSingleTrainQuery, useUpdateTrainMutation} from "../../services/trainsApi";

const EditTrains = () => {
    const [name, setName] = useState<string>("")
    const [nameInput, setNameInput] = useState<boolean>(true)

    const [locomotiveId, setLocomotiveId] = useState<string>("")
    const [locomotiveIdInput, setLocomotiveIdInput] = useState<boolean>(true)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleTrainData,
        isSuccess: isGetSingleTrainSuccess
    } = useGetSingleTrainQuery(id, {
        skip: id === undefined
    })

    const [deleteTrain] = useDeleteTrainMutation()
    const [updateTrain] = useUpdateTrainMutation()

    const deleteSingleTrain = async () => {
        await deleteTrain(id)
        navigate("/train")
    }

    const updateSingleTrain = async () => {
        // updateTrain()
        // navigate("/train")
    }

    useEffect(() => {
        if (isGetSingleTrainSuccess) {
            setLocomotiveId(getSingleTrainData[0].idlokomotywy.toString())
            setName(getSingleTrainData[0].nazwa)
        }
    }, [getSingleTrainData, isGetSingleTrainSuccess])

    if (getSingleTrainData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj pociąg</p>
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
                        <label className={"w-2/6"}>Id lokomotywy</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={locomotiveId}
                                   onChange={(e) => {
                                       setLocomotiveId(e.target.value)
                                       setLocomotiveIdInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"flex"}>
                        <button onClick={() => navigate("/train")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleTrain()}>
                                Usuń
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleTrain()}>
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

export default EditTrains
