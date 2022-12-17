import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {TrainStop} from "../../types"
import Menu from "../../components/Menu"
import {useDeleteTrainStopMutation, useGetSingleTrainStopQuery, useUpdateTrainStopMutation} from "../../services/trainStopApi"

const EditTrainStop = () => {
    const [lineId, setLineId] = useState<string>("")
    const [lineIdInput, setLineIdInput] = useState<boolean>(true)

    const [stopName, setStopName] = useState<string>("")
    const [stopNameInput, setStopNameInput] = useState<boolean>(true)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleTrainStopData,
        isSuccess: isGetSingleTrainStopSuccess
    } = useGetSingleTrainStopQuery(id, {
        skip: id === undefined
    })

    const [deleteTrainStop] = useDeleteTrainStopMutation()
    const [updateTrainStop] = useUpdateTrainStopMutation()

    const deleteSingleTrainStop = async () => {
        await deleteTrainStop(id)
        navigate("/train-stops")
    }

    const updateSingleTrainStop = async () => {
        // updateTrainStop()
        // navigate("/train-stops")
    }

    useEffect(() => {
        if (isGetSingleTrainStopSuccess) {
            setLineId(getSingleTrainStopData[0].idlinii.toString())
            setStopName(getSingleTrainStopData[0].nazwastacji)
        }
    }, [getSingleTrainStopData, isGetSingleTrainStopSuccess])

    if (getSingleTrainStopData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj przystanek</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Id linii</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={lineId}
                                   onChange={(e) => {
                                       setLineId(e.target.value)
                                       setLineIdInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Nazwa stacji</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={stopName}
                                   onChange={(e) => {
                                       setStopName(e.target.value)
                                       setStopNameInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"flex"}>
                        <button onClick={() => navigate("/train-stops")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleTrainStop()}>
                                Usuń
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleTrainStop()}>
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

export default EditTrainStop
