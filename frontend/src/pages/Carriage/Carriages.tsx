import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {Carriage} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetCarriagesQuery} from "../../services/carriagesApi"
import CarriagesTable from "./CarriagesTable"
import {useNavigate} from "react-router-dom";

const Carriages = () => {
    const [carriages, setCarriages] = useState<Carriage[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getCarriages,
        isFetching: isGetCarriagesFetching,
        isSuccess: isGetCarriagesSuccess,
        isError: isGetCarriagesError,
    } = useGetCarriagesQuery(null)

    useEffect(() => {
        if (isGetCarriagesSuccess) {
            setCarriages(getCarriages)
        }
    }, [getCarriages, isGetCarriagesFetching, isGetCarriagesSuccess])

    if (carriages === undefined) {
        return <Loading/>
    } else {
        const allCarriages = Object.values(carriages).map((carriage: Carriage) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{carriage.databadaniatechnicznego.toString().split("T")[0]}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{carriage.liczbamiejsc.toString()}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/carriages/${carriage.id}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <CarriagesTable {...allCarriages}/>
    }
}

export default Carriages
