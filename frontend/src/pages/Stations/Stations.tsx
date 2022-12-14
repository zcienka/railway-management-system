import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {Station} from "../../types";
import {useNavigate} from "react-router-dom";
import {useGetStationsQuery} from "../../services/stationsApi";
import {v4 as uuidv4} from "uuid";
import StationsTable from "../Stations/StationsTable";

const Stations = () => {
    const [stations, setStations] = useState<Station[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getStations,
        isFetching: isGetStationsFetching,
        isSuccess: isGetStationsSuccess,
        isError: isGetStationsError,
    } = useGetStationsQuery(null)
    console.log({getStations})

    useEffect(() => {
        if (isGetStationsSuccess) {
            setStations(getStations)
        }
    }, [getStations, isGetStationsFetching, isGetStationsSuccess])

    if (stations === undefined) {
        return <Loading/>
    } else {
        const allStations = Object.values(stations).map((station: Station) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{station.nazwa}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{station.adres}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/stations/${station.nazwa}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <StationsTable {...allStations}/>
    }
}

export default Stations
