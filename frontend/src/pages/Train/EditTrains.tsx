import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom";
import {useGetSingleTrainQuery} from "../../services/trainsApi";
import {Train} from "../../types";
import {useDeleteTrainMutation, useUpdateTrainMutation} from "../../services/trainsApi";
import Menu from "../../components/Menu";

const EditTrains = () => {
    const [train, setTrain] = useState<Train | undefined>(undefined)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleTrainData,
        isSuccess: isGetSingleTrainSuccess
    } = useGetSingleTrainQuery(id, {
        skip: id === undefined
    })

    const deleteSingleTrain = async () => {
        await deleteTrain(id)
        navigate("/train")
    }

    const [deleteTrain] = useDeleteTrainMutation()
    const [updateTrain] = useUpdateTrainMutation()

    useEffect(() => {
        if (isGetSingleTrainSuccess) {
            setTrain(getSingleTrainData[0])
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

                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditTrains
