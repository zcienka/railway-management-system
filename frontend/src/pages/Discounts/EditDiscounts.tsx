import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom";
import {useGetSingleDiscountQuery} from "../../services/discountsApi";
import {Discount} from "../../types";
import {useDeleteDiscountMutation, useUpdateDiscountMutation} from "../../services/discountsApi";
import Menu from "../../components/Menu";

const EditDiscounts = () => {
    const [discount, setDiscount] = useState<Discount | undefined>(undefined)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleDiscountData,
        isSuccess: isGetSingleDiscountSuccess
    } = useGetSingleDiscountQuery(id, {
        skip: id === undefined
    })

    const deleteSingleDiscount = async () => {
        await deleteDiscount(id)
        navigate("/discounts")
    }

    const [deleteDiscount] = useDeleteDiscountMutation()
    const [updateDiscount] = useUpdateDiscountMutation()

    useEffect(() => {
        if (isGetSingleDiscountSuccess) {
            setDiscount(getSingleDiscountData[0])
        }
    }, [getSingleDiscountData, isGetSingleDiscountSuccess])

    if (getSingleDiscountData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj zniżkę</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>

                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditDiscounts
