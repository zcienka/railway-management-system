import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {TrainRide} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetTrainRidesQuery} from "../../services/trainRideApi"
import TrainRidesTable from "./TrainRidesTable"
import {useNavigate} from "react-router-dom"

const TrainRides = () => {
    const [trainRides, setTrainRides] = useState<TrainRide[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getTrainRides,
        isFetching: isGetTrainRidesFetching,
        isSuccess: isGetTrainRidesSuccess,
        isError: isGetTrainRidesError,
    } = useGetTrainRidesQuery(null)

    useEffect(() => {
        if (isGetTrainRidesSuccess) {
            setTrainRides(getTrainRides)
        }
    }, [getTrainRides, isGetTrainRidesFetching, isGetTrainRidesSuccess])

    if (trainRides === undefined) {
        return <Loading/>
    } else {
        const allTrainRides = Object.values(trainRides).map((trainRide: TrainRide) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{trainRide.id}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainRide.idkonduktora}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainRide.idmaszynisty}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainRide.idliniiprzejazdu}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainRide.idpociagu}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/train-ride/${trainRide.id}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <TrainRidesTable {...allTrainRides}/>
    }
}

export default TrainRides
