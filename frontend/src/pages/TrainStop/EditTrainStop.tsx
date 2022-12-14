import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom";
import {useGetSingleTrainStopQuery} from "../../services/trainStopApi";
import {TrainStop} from "../../types";
import {useDeleteTrainStopMutation, useUpdateTrainStopMutation} from "../../services/trainStopApi";
import Menu from "../../components/Menu";

const EditTrainStop = () => {
    const [trainStop, setTrainStop] = useState<TrainStop | undefined>(undefined)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleTrainStopData,
        isSuccess: isGetSingleTrainStopSuccess
    } = useGetSingleTrainStopQuery(id, {
        skip: id === undefined
    })

    const deleteSingleTrainStop = async () => {
        await deleteTrainStop(id)
        navigate("/train-stops")
    }

    const [deleteTrainStop] = useDeleteTrainStopMutation()
    const [updateTrainStop] = useUpdateTrainStopMutation()

    useEffect(() => {
        if (isGetSingleTrainStopSuccess) {
            setTrainStop(getSingleTrainStopData[0])
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

                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditTrainStop
