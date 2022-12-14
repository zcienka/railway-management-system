import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {Station} from "../../types"
import {useNavigate, useParams} from "react-router-dom"
import {
    useDeleteStationMutation,
    useGetSingleStationQuery,
    useUpdateStationMutation
} from "../../services/stationsApi"
import Menu from "../../components/Menu"

const EditStations = () => {
    const [station, setStation] = useState<Station | undefined>(undefined)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleStationData,
        isSuccess: isGetSingleStationSuccess
    } = useGetSingleStationQuery(id, {
        skip: id === undefined
    })

    const deleteSingleStation = async () => {
        await deleteStation(id)
        navigate("/stations")
    }

    const [deleteStation] = useDeleteStationMutation()
    const [updateStation] = useUpdateStationMutation()

    useEffect(() => {
        if (isGetSingleStationSuccess) {
            setStation(getSingleStationData[0])
        }
    }, [getSingleStationData, isGetSingleStationSuccess])

    if (getSingleStationData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj stację</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>

                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditStations
