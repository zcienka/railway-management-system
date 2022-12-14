import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom";
import {useGetSingleLocomotiveQuery} from "../../services/locomotivesApi";
import {Locomotive} from "../../types";
import {useDeleteLocomotiveMutation, useUpdateLocomotiveMutation} from "../../services/locomotivesApi";
import Menu from "../../components/Menu";

const EditLocomotive = () => {
    const [locomotive, setLocomotive] = useState<Locomotive | undefined>(undefined)

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
        navigate("/locomotives")
    }

    const [deleteLocomotive] = useDeleteLocomotiveMutation()
    const [updateLocomotive] = useUpdateLocomotiveMutation()
    console.log({getSingleLocomotiveData})
    useEffect(() => {
        if (isGetSingleLocomotiveSuccess) {
            setLocomotive(getSingleLocomotiveData[0])
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

                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditLocomotive
