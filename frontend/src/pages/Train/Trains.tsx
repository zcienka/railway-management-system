import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {Train} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetTrainsQuery} from "../../services/trainsApi"
import TrainsTable from "./TrainsTable"
import {useNavigate} from "react-router-dom"

const Trains = () => {
    const [trains, setTrains] = useState<Train[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getTrains,
        isFetching: isGetTrainsFetching,
        isSuccess: isGetTrainsSuccess,
        isError: isGetTrainsError,
    } = useGetTrainsQuery(null)

    useEffect(() => {
        if (isGetTrainsSuccess) {
            setTrains(getTrains)
        }
    }, [getTrains, isGetTrainsFetching, isGetTrainsSuccess])
console.log({trains})
    if (trains === undefined) {
        return <Loading/>
    } else {
        const allTrains = Object.values(trains).map((train: Train) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{train.nazwa}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{train.nazwalokomotywy}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/train/${train.id}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <TrainsTable {...allTrains}/>
    }
}

export default Trains
