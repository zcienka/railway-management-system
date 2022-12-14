import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {TrainStop} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetTrainStopsQuery} from "../../services/trainStopApi"
import TrainStopsTable from "./TrainStopTable"
import {useNavigate} from "react-router-dom";

const TrainStops = () => {
    const [trainStop, setTrainStops] = useState<TrainStop[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getTrainStops,
        isFetching: isGetTrainStopsFetching,
        isSuccess: isGetTrainStopsSuccess,
        isError: isGetTrainStopsError,
    } = useGetTrainStopsQuery(null)
    console.log({getTrainStops})

    useEffect(() => {
        if (isGetTrainStopsSuccess) {
            setTrainStops(getTrainStops)
        }
    }, [getTrainStops, isGetTrainStopsFetching, isGetTrainStopsSuccess])

    if (trainStop === undefined) {
        return <Loading/>
    } else {
        const allTrainStops = Object.values(trainStop).map((trainStop: TrainStop) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{trainStop.numerprzystanku}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainStop.nazwastacji}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainStop.idlinii}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/train-stop/${trainStop.nazwastacji}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <TrainStopsTable {...allTrainStops}/>
    }
}

export default TrainStops
