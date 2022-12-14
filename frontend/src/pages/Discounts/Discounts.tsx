import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {Discount} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetDiscountsQuery} from "../../services/discountsApi"
import DiscountsTable from "./DiscountsTable"
import {useNavigate} from "react-router-dom";

const Discounts = () => {
    const [discounts, setDiscounts] = useState<Discount[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getDiscounts,
        isFetching: isGetDiscountsFetching,
        isSuccess: isGetDiscountsSuccess,
        isError: isGetDiscountsError,
    } = useGetDiscountsQuery(null)
    console.log({getDiscounts})

    useEffect(() => {
        if (isGetDiscountsSuccess) {
            setDiscounts(getDiscounts)
        }
    }, [getDiscounts, isGetDiscountsFetching, isGetDiscountsSuccess])

    if (discounts === undefined) {
        return <Loading/>
    } else {
        const allDiscounts = Object.values(discounts).map((discount: Discount) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{discount.nazwaznizki}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{discount.procentznizki}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{discount.dokumentpotwierdzajacy}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/discounts/${discount.nazwaznizki}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <DiscountsTable {...allDiscounts}/>
    }
}

export default Discounts
