import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {RailroadCar} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetRailroadCarsQuery} from "../../services/railroadCarsApi"
import RailroadCarTable from "./RailroadCarTable"
import {useNavigate} from "react-router-dom"

const RailroadCars = () => {
    const [railroadCars, setRailroadCars] = useState<RailroadCar[] | undefined>(undefined)


    const navigate = useNavigate()

    const {
        data: getRailroadCars,
        isFetching: isGetRailroadCarsFetching,
        isSuccess: isGetRailroadCarsSuccess,
        isError: isGetRailroadCarsError,
    } = useGetRailroadCarsQuery(null)

    useEffect(() => {
        if (isGetRailroadCarsSuccess) {
            setRailroadCars(getRailroadCars)
        }
    }, [getRailroadCars, isGetRailroadCarsFetching, isGetRailroadCarsSuccess])

    if (railroadCars === undefined) {
        return <Loading/>
    } else {
        const allRailroadCars = Object.values(railroadCars).map((railroadCar: RailroadCar) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{railroadCar.idpociagu}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{railroadCar.idwagonu}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{railroadCar.numerwagonu}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/railroad-cars/${railroadCar.idpociagu}/${railroadCar.idwagonu}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <RailroadCarTable {...allRailroadCars}/>
    }
}

export default RailroadCars
