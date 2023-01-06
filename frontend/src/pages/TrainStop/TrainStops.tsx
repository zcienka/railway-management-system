import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {SearchTrainStop, TrainStop} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetTrainStopsQuery, useFilterTrainStopQuery} from "../../services/trainStopApi"
import {useNavigate} from "react-router-dom"
import Menu from "../../components/Menu"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const initialState: SearchTrainStop = {
    numerprzystankumin: "",
    numerprzystankumax: "",
    nazwastacji: "",
    idliniimin: "",
    idliniimax: "",
}

const TrainStops = () => {
    const [searchTrainStop, setSearchTrainStop] = useState<SearchTrainStop>(initialState)
    const [showSearchResponse, setShowSearchResponse] = useState<boolean>(false)
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
    const [isLineIdInteger, setIsLineIdInteger] = useState<boolean>(true)
    const [isTrainStopNumberInteger, setIsTrainStopNumberInteger] = useState<boolean>(true)

    const [trainStop, setTrainStops] = useState<TrainStop[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getFilterTrainStops,
        isFetching: isGetFilterTrainStopFetching,
        isSuccess: isGetFilterTrainStopSuccess,
        isError: isGetFilterTrainStopError,
    } = useFilterTrainStopQuery(
        searchTrainStop,
        {skip: !showSearchResponse}
    )

    const checkIsLineIdInteger = () => {
        if (isNaN(Number(searchTrainStop.idliniimin)) || isNaN(Number(searchTrainStop.idliniimax))) {
            setIsLineIdInteger(() => false)
        } else {
            setIsLineIdInteger(() => true)
        }
    }

    const checkIsTrainStopNumberInteger = () => {
        if (isNaN(Number(searchTrainStop.numerprzystankumin)) || isNaN(Number(searchTrainStop.numerprzystankumax))) {
            setIsTrainStopNumberInteger(() => false)
        } else {
            setIsTrainStopNumberInteger(() => true)
        }
    }

    const {
        data: getTrainStops,
        isFetching: isGetTrainStopsFetching,
        isSuccess: isGetTrainStopsSuccess,
    } = useGetTrainStopsQuery(null)

    useEffect(() => {
        if (isGetFilterTrainStopSuccess) {
            setTrainStops(getFilterTrainStops)
            setShowSearchResponse(() => false)
        } else if (isGetTrainStopsSuccess && isFirstRender) {
            setTrainStops(getTrainStops)
            setIsFirstRender(() => false)
        }
    }, [getFilterTrainStops, getTrainStops, isFirstRender, isGetFilterTrainStopSuccess,
        isGetTrainStopsFetching, isGetTrainStopsSuccess])

    const searchValues = () => {
        if (isLineIdInteger && isTrainStopNumberInteger) {
            setShowSearchResponse(!showSearchResponse)
        }
    }

    if (trainStop === undefined) {
        return <Loading/>
    } else {
        const allTrainStops = Object.values(trainStop).map((trainStop: TrainStop) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{trainStop.idlinii}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainStop.nazwastacji}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainStop.numerprzystanku}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/train-stops/${trainStop.numerprzystanku}/${trainStop.nazwastacji}/${trainStop.idlinii}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-2 py-2 lg:px-10 lg:py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Przystanki</p>
                </div>

                <div className={"bg-white h-[calc(100vh-6rem)] max-h-[calc(100vh-9rem)] " +
                    "w-full rounded-xl lg:p-8 p-4 border border-stone-200 overflow-auto"}>
                    <div className={"flex mb-4 w-full"}>

                            <input type="text"
                                   placeholder="Minimalny numer przystanku"
                                   onBlur={() => checkIsTrainStopNumberInteger()}
                                   className={"border mb-4  mr-2 w-3/4"}
                                   onChange={(e) => setSearchTrainStop((prevState: SearchTrainStop) => {
                                       return {...prevState, numerprzystankumin: e.target.value}
                                   })}/>

                            <input type="text"
                                   placeholder="Maksymalny numer przystanku"
                                   onBlur={() => checkIsTrainStopNumberInteger()}
                                   className={"border mb-4 w-3/4 mr-2"}
                                   onChange={(e) => setSearchTrainStop((prevState: SearchTrainStop) => {
                                       return {...prevState, numerprzystankumax: e.target.value}
                                   })}/>

                        <input type="text"
                               placeholder="Nazwa stacji"
                               className={"border mb-4 mr-2 w-36"}
                               onChange={(e) => setSearchTrainStop((prevState: SearchTrainStop) => {
                                   return {...prevState, nazwastacji: e.target.value}
                               })}/>

                        <input type="text"
                               placeholder="Minimalne id linii"
                               className={"border mb-4 mr-2 w-40"}
                               onBlur={() => checkIsLineIdInteger()}
                               onChange={(e) => setSearchTrainStop((prevState: SearchTrainStop) => {
                                   return {...prevState, idliniimin: e.target.value}
                               })}/>

                        <input type="text"
                               placeholder="Maksymalne id linii"
                               className={"border mb-4 mr-2 w-40"}
                               onBlur={() => checkIsLineIdInteger()}
                               onChange={(e) => setSearchTrainStop((prevState: SearchTrainStop) => {
                                   return {...prevState, idliniimax: e.target.value}
                               })}/>

                        <button className={"mb-4"} onClick={() => searchValues()}>
                            Szukaj
                        </button>

                        <div className={"h-14 w-full flex items-center text-sm flex-col"}>
                            <div
                                className={`${!isTrainStopNumberInteger ?
                                    `visible w-full items-center h-full flex ${!isLineIdInteger ? "mb-1" : "mb-4"}` : "invisible absolute"}`}>
                                <div className={"w-full ml-2 text-red-700"}>
                                    <div className={"flex items-center w-full"}>
                                        <ExclamationMark className={"h-5 mr-2"}/>
                                        <p className={"w-full"}>
                                            Numer przystanku powinien być liczbą
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`${!isLineIdInteger ? "visible w-full items-center h-full flex mb-4" : "invisible absolute"} `}>
                                <div className={"w-full ml-2 text-red-700 "}>
                                    <div className={"flex items-center w-full"}>
                                        <ExclamationMark className={"h-5 mr-2"}/>
                                        <p className={"w-full"}>
                                            Id musi być liczbą
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"flex justify-end w-full mb-4"}>
                            <button onClick={() => navigate("/add-train-stop")}>
                                Dodaj przystanek
                            </button>
                        </div>
                    </div>
                    <table className={"w-full border-spacing-0 border-separate overflow-y-auto"}>
                        <tbody>
                        <tr className={"rounded-tl-xl text-slate-600"}>
                            <th className={"rounded-tl-xl  bg-slate-100 py-2 border-y border-l border-stone-200"}>Id linii</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Nazwa stacji</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Numer przystanku</th>
                            <th className={"rounded-tr-xl bg-slate-100 w-20 border-y border-r border-stone-200"}></th>
                        </tr>
                        {allTrainStops}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default TrainStops
