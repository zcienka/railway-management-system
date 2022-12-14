import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {useGetSingleRailroadCarriageQuery} from "../../services/railroadCarriagesApi"
import {RailroadCarriage} from "../../types"
import {useDeleteRailroadCarriageMutation, useUpdateRailroadCarriageMutation} from "../../services/railroadCarriagesApi"
import Menu from "../../components/Menu"

const EditRailroadCarriages = () => {
    const [railroadCarriage, setRailroadCarriage] = useState<RailroadCarriage | undefined>(undefined)

    const navigate = useNavigate()
    const {trainId, carriageId} = useParams()
    const {
        data: getSingleRailroadCarriageData,
        isSuccess: isGetSingleRailroadCarriageSuccess
    } = useGetSingleRailroadCarriageQuery({
        "trainId": trainId,
        "carriageId": carriageId
    }, {
        skip: trainId === undefined || carriageId === undefined
    })

    const deleteSingleRailroadCarriage = async () => {
        await deleteRailroadCarriage(trainId)
        navigate("/railroad-carriages")
    }

    const [deleteRailroadCarriage] = useDeleteRailroadCarriageMutation()
    const [updateRailroadCarriage] = useUpdateRailroadCarriageMutation()

    useEffect(() => {
        if (isGetSingleRailroadCarriageSuccess) {
            setRailroadCarriage(getSingleRailroadCarriageData[0])
        }
    }, [getSingleRailroadCarriageData, isGetSingleRailroadCarriageSuccess])

    if (getSingleRailroadCarriageData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj wagon w pociagu</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>

                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditRailroadCarriages
