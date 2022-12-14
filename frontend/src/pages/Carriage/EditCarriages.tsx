import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {useGetSingleCarriageQuery} from "../../services/carriagesApi"
import {Carriage} from "../../types"
import {useDeleteCarriageMutation, useUpdateCarriageMutation} from "../../services/carriagesApi"
import Menu from "../../components/Menu"

const EditCarriages = () => {
    const [carriage, setCarriage] = useState<Carriage | undefined>(undefined)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleCarriageData,
        isSuccess: isGetSingleCarriageSuccess
    } = useGetSingleCarriageQuery(id, {
        skip: id === undefined
    })

    const deleteSingleCarriage = async () => {
        await deleteCarriage(id)
        navigate("/carriages")
    }

    const [deleteCarriage] = useDeleteCarriageMutation()
    const [updateCarriage] = useUpdateCarriageMutation()

    useEffect(() => {
        if (isGetSingleCarriageSuccess) {
            setCarriage(getSingleCarriageData[0])
        }
    }, [getSingleCarriageData, isGetSingleCarriageSuccess])

    if (getSingleCarriageData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj wagon</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>

                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditCarriages
