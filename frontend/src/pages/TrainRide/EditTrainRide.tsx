import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {useGetSingleTrainRideQuery} from "../../services/trainRideApi"
import {TrainRide} from "../../types"
import {useDeleteTrainRideMutation, useUpdateTrainRideMutation} from "../../services/trainRideApi"
import Menu from "../../components/Menu"

const EditTrainRide = () => {
    const [trainRide, setTrainRide] = useState<TrainRide | undefined>(undefined)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleTrainRideData,
        isSuccess: isGetSingleTrainRideSuccess
    } = useGetSingleTrainRideQuery(id, {
        skip: id === undefined
    })

    const deleteSingleTrainRide = async () => {
        await deleteTrainRide(id)
        navigate("/train-rides")
    }

    const [deleteTrainRide] = useDeleteTrainRideMutation()
    const [updateTrainRide] = useUpdateTrainRideMutation()

    useEffect(() => {
        if (isGetSingleTrainRideSuccess) {
            setTrainRide(getSingleTrainRideData[0])
        }
    }, [getSingleTrainRideData, isGetSingleTrainRideSuccess])

    if (getSingleTrainRideData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj przejazd</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>

                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditTrainRide
