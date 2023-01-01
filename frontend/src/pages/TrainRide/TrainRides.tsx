import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {SearchTrainRide, TrainRideResponse} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetTrainRidesQuery} from "../../services/trainRideApi"
import {useNavigate} from "react-router-dom"
import Menu from "../../components/Menu"
import {useFilterTrainRideQuery} from "../../services/trainRideApi"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const initialState: SearchTrainRide = {
    dataodjazdumin: "",
    dataodjazdumax: "",
    dataprzyjazdumin: "",
    dataprzyjazdumax: "",
    idliniiprzejazdumin: "",
    idliniiprzejazdumax: "",
}

const TrainRides = () => {
    const [searchTrainRide, setSearchTrainRide] = useState<SearchTrainRide>(initialState)
    const [showSearchResponse, setShowSearchResponse] = useState<boolean>(false)
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
    const [isTrainLineIdInteger, setIsTrainLineIdInteger] = useState<boolean>(true)
    const [isDateGoodFormat, setIsDateGoodFormat] = useState<boolean>(true)

    const [trainRides, setTrainRides] = useState<TrainRideResponse[] | undefined>(undefined)
    const navigate = useNavigate()
    const {
        data: getFilterTrainRides,
        isFetching: isGetFilterTrainRideFetching,
        isSuccess: isGetFilterTrainRideSuccess,
        isError: isGetFilterTrainRideError,
    } = useFilterTrainRideQuery(
        searchTrainRide,
        {skip: !showSearchResponse}
    )

    const {
        data: getTrainRides,
        isFetching: isGetTrainRidesFetching,
        isSuccess: isGetTrainRidesSuccess,
    } = useGetTrainRidesQuery(null)

    useEffect(() => {
        if (isGetFilterTrainRideSuccess) {
            setTrainRides(getFilterTrainRides)
            setShowSearchResponse(() => false)
        } else if (isGetTrainRidesSuccess && isFirstRender) {
            setTrainRides(getTrainRides)
            setIsFirstRender(() => false)
        }
    }, [getFilterTrainRides, getTrainRides, isFirstRender, isGetFilterTrainRideSuccess, isGetTrainRidesFetching, isGetTrainRidesSuccess])

    const checkIsTrainLineIdInteger = () => {
        if (isNaN(Number(searchTrainRide.idliniiprzejazdumin)) || isNaN(Number(searchTrainRide.idliniiprzejazdumax))) {
            setIsTrainLineIdInteger(() => false)
        } else {
            setIsTrainLineIdInteger(() => true)
        }
    }

    const checkIsDateGoodFormat = () => {
        if ((!isNaN(new Date(searchTrainRide.dataodjazdumax).getMonth()) || searchTrainRide.dataodjazdumax === "")
            && (!isNaN(new Date(searchTrainRide.dataprzyjazdumin).getMonth()) || searchTrainRide.dataprzyjazdumin === "")
            && (!isNaN(new Date(searchTrainRide.dataodjazdumin).getMonth()) || searchTrainRide.dataodjazdumin === "")
            && (!isNaN(new Date(searchTrainRide.dataprzyjazdumax).getMonth()) || searchTrainRide.dataprzyjazdumax === "")) {
            setIsDateGoodFormat(() => true)
        } else {
            setIsDateGoodFormat(() => false)
        }
    }

    const searchValues = () => {
        if (isDateGoodFormat && isTrainLineIdInteger) {
            setShowSearchResponse(!showSearchResponse)
        }
    }

    if (trainRides === undefined) {
        return <Loading/>
    } else {
        const allTrainRides = Object.values(trainRides).map((trainRide: TrainRideResponse) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{trainRide.imiekonduktora + " " + trainRide.nazwiskokonduktora}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainRide.imiemaszynisty + " " + trainRide.nazwiskomaszynisty}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainRide.idliniiprzejazdu}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainRide.dataodjazdu.toString().split("T")[0]}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainRide.dataprzyjazdu.toString().split("T")[0]}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainRide.nazwapociagu}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/train-ride/${trainRide.id}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-2 py-2 lg:px-10 lg:py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Przejazdy</p>
                </div>

                <div className={"bg-white h-[calc(100vh-6rem)] max-h-[calc(100vh-9rem)] " +
                    "w-full rounded-xl lg:p-8 p-4 border border-stone-200 overflow-auto"}>
                    <div className={"flex mb-4 w-full"}>
                        <input type="text"
                               placeholder="Minimalna data odjazdu"
                               className={"border mb-4 mr-2"}
                               onBlur={() => checkIsDateGoodFormat()}
                               onChange={(e) => setSearchTrainRide((prevState: SearchTrainRide) => {
                                   return {...prevState, dataodjazdumin: e.target.value}
                               })}/>
                        <input type="text"
                               placeholder="Maksymalna data odjazdu"
                               className={"border mb-4 mr-2"}
                               onBlur={() => checkIsDateGoodFormat()}
                               onChange={(e) => setSearchTrainRide((prevState: SearchTrainRide) => {
                                   return {...prevState, dataodjazdumax: e.target.value}
                               })}/>
                        <input type="text"
                               placeholder="Minimalna data przyjazdu"
                               className={"border mb-4 mr-2"}
                               onBlur={() => checkIsDateGoodFormat()}
                               onChange={(e) => setSearchTrainRide((prevState: SearchTrainRide) => {
                                   return {...prevState, dataprzyjazdumin: e.target.value}
                               })}/>
                        <input type="text"
                               placeholder="Maksymalna data przyjazdu"
                               className={"border mb-4 mr-2"}
                               onBlur={() => checkIsDateGoodFormat()}
                               onChange={(e) => setSearchTrainRide((prevState: SearchTrainRide) => {
                                   return {...prevState, dataprzyjazdumax: e.target.value}
                               })}/>
                        <input type="text"
                               placeholder="Minimalne id linii"
                               className={"border mb-4 mr-2 w-40"}
                               onBlur={() => checkIsTrainLineIdInteger()}
                               onChange={(e) => setSearchTrainRide((prevState: SearchTrainRide) => {
                                   return {...prevState, idliniiprzejazdumin: e.target.value}
                               })}/>
                        <input type="text"
                               placeholder="Maksymalne id linii"
                               className={"border mb-4 mr-2 w-40"}
                               onBlur={() => checkIsTrainLineIdInteger()}
                               onChange={(e) => setSearchTrainRide((prevState: SearchTrainRide) => {
                                   return {...prevState, idliniiprzejazdumax: e.target.value}
                               })}/>

                        <button className={"mb-4"} onClick={() => searchValues()}>
                            Szukaj
                        </button>

                        <div className={"h-14 flex items-center w-full text-sm flex-col"}>
                            <div
                                className={`${!isDateGoodFormat ? `visible w-48 items-center h-full flex 
                                ${!isTrainLineIdInteger ? "mb-1" : "mb-4"} ` : "invisible absolute"} `}>
                                <div className={"w-96 ml-2 text-red-700"}>
                                    <div className={"flex items-center w-full"}>
                                        <ExclamationMark className={"h-5 mr-2"}/>
                                        <p className={"w-full"}>
                                            Niepoprawny zapis dat
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`${!isTrainLineIdInteger ? "visible w-full items-center h-full flex mb-4" : "invisible absolute"} `}>
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
                            <button onClick={() => navigate("/add-train-ride")}>
                                Dodaj przejazd
                            </button>
                        </div>
                    </div>
                    <table className={"w-full border-spacing-0 border-separate overflow-y-auto"}>
                        <tbody>
                        <tr className={"rounded-tl-xl text-slate-600"}>
                            <th className={"rounded-tl-xl  bg-slate-100 py-2 border-y border-l border-stone-200"}>Konduktor</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Maszynista</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Id linii przejazdu</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Data odjazdu</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Data przyjazdu</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Pociąg</th>
                            <th className={"rounded-tr-xl bg-slate-100 w-20 border-y border-r border-stone-200"}></th>
                        </tr>
                        {allTrainRides}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default TrainRides
