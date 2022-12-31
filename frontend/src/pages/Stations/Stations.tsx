import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {SearchStation, Station} from "../../types"
import {useNavigate} from "react-router-dom"
import {useGetStationsQuery, useFilterStationQuery} from "../../services/stationsApi"
import {v4 as uuidv4} from "uuid"
import Menu from "../../components/Menu"

const initialState: SearchStation = {
    nazwa: "",
    adres: "",
}

const Stations = () => {
    const [searchStation, setSearchStation] = useState<SearchStation>(initialState)
    const [showSearchResponse, setShowSearchResponse] = useState<boolean>(false)
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

    const [stations, setStations] = useState<Station[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getFilterStations,
        isFetching: isGetFilterStationFetching,
        isSuccess: isGetFilterStationSuccess,
        isError: isGetFilterStationError,
    } = useFilterStationQuery(
        searchStation,
        {skip: !showSearchResponse}
    )

    const {
        data: getStations,
        isFetching: isGetStationsFetching,
        isSuccess: isGetStationsSuccess,
        isError: isGetStationsError,
    } = useGetStationsQuery(null)

    useEffect(() => {
        if (isGetFilterStationSuccess) {
            setStations(getFilterStations)
            setShowSearchResponse(() => false)
        } else if (isGetStationsSuccess && isFirstRender) {
            setStations(getStations)
            setIsFirstRender(() => false)
        }
    }, [getFilterStations, getStations, isFirstRender, isGetFilterStationSuccess,
        isGetStationsFetching, isGetStationsSuccess])

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
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-2 py-2 lg:px-10 lg:py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Stacja</p>
                </div>

                <div className={"bg-white h-[calc(100vh-6rem)] max-h-[calc(100vh-9rem)] " +
                    "w-full rounded-xl lg:p-8 p-4 border border-stone-200 overflow-auto"}>

                    <div className={"flex mb-4 w-full"}>
                        <input type="text"
                               placeholder="Nazwa"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchStation((prevState: SearchStation) => {
                                   return {...prevState, nazwa: e.target.value}
                               })}/>

                        <input type="text"
                               placeholder="Adres"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchStation((prevState: SearchStation) => {
                                   return {...prevState, adres: e.target.value}
                               })}/>

                        <button className={"mb-4"} onClick={() => setShowSearchResponse(!showSearchResponse)}>
                            Szukaj
                        </button>

                        <div className={"flex justify-end w-full mb-4"}>
                            <button onClick={() => navigate("/add-station")}>
                                Dodaj stację
                            </button>
                        </div>
                    </div>
                    <table className={"w-full border-spacing-0 border-separate overflow-y-auto"}>
                        <tbody>
                        <tr className={"rounded-tl-xl text-slate-600"}>
                            <th className={"rounded-tl-xl  bg-slate-100 py-2 border-y border-l border-stone-200"}>Nazwa</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Adres</th>
                            <th className={"rounded-tr-xl bg-slate-100 w-20 border-y border-r border-stone-200"}></th>
                        </tr>
                        {allStations}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default Stations
