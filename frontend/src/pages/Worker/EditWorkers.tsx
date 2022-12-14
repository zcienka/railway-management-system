import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom";
import {useGetSingleWorkerQuery} from "../../services/workersApi";
import {Worker} from "../../types";
import {useDeleteWorkerMutation, useUpdateWorkerMutation} from "../../services/workersApi";
import Menu from "../../components/Menu";

const EditWorkers = () => {
    const [worker, setWorker] = useState<Worker | undefined>(undefined)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleWorkerData,
        isSuccess: isGetSingleWorkerSuccess
    } = useGetSingleWorkerQuery(id, {
        skip: id === undefined
    })

    const deleteSingleWorker = async () => {
        await deleteWorker(id)
        navigate("/workers")
    }

    const [deleteWorker] = useDeleteWorkerMutation()
    const [updateWorker] = useUpdateWorkerMutation()

    useEffect(() => {
        if (isGetSingleWorkerSuccess) {
            setWorker(getSingleWorkerData[0])
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

                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditWorkers
