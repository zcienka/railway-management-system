import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {RailroadCarriage} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetRailroadCarriagesQuery} from "../../services/railroadCarriagesApi"
import RailroadCarriagesTable from "./RailroadCarriagesTable"
import {useNavigate} from "react-router-dom"

const RailroadCarriages = () => {
    const [railroadCarriages, setRailroadCarriages] = useState<RailroadCarriage[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getRailroadCarriages,
        isFetching: isGetRailroadCarriagesFetching,
        isSuccess: isGetRailroadCarriagesSuccess,
        isError: isGetRailroadCarriagesError,
    } = useGetRailroadCarriagesQuery(null)
    console.log({getRailroadCarriages})

    useEffect(() => {
        if (isGetRailroadCarriagesSuccess) {
            setRailroadCarriages(getRailroadCarriages)
        }
    }, [getRailroadCarriages, isGetRailroadCarriagesFetching, isGetRailroadCarriagesSuccess])

    if (railroadCarriages === undefined) {
        return <Loading/>
    } else {
        const allRailroadCarriages = Object.values(railroadCarriages).map((railroadCarriage: RailroadCarriage) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{railroadCarriage.idpociagu}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{railroadCarriage.idwagonu}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{railroadCarriage.numerwagonu}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/railroad-carriages/${railroadCarriage.idpociagu}/${railroadCarriage.idwagonu}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <RailroadCarriagesTable {...allRailroadCarriages}/>
    }
}

export default RailroadCarriages
