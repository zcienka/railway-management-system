import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {
    RailroadCar,
    RailroadCarInTheTrainResponse,
    SearchRailroadCarInTheTrain
} from "../../types"
import {v4 as uuidv4} from "uuid"
import {
    useGetRailroadCarsInTheTrainQuery,
    useFilterRailroadCarInTheTrainQuery
} from "../../services/railroadCarsInTheTrainApi"
import {Link, useNavigate} from "react-router-dom"
import Menu from "../../components/Menu"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";
import {useGetRailroadCarsQuery} from "../../services/railroadCarsApi";

const initialState: SearchRailroadCarInTheTrain = {
    idwagonumin: "",
    idwagonumax: "",
    nazwapociagu: "",
}

const RailroadCarsInTheTrain = () => {
    const [searchRailroadCarsInTheTrain, setSearchRailroadCarsInTheTrain] = useState<SearchRailroadCarInTheTrain>(initialState)
    const [showSearchResponse, setShowSearchResponse] = useState<boolean>(false)
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
    const [isRailroadCarIdInteger, setIsRailroadCarIdInteger] = useState<boolean>(true)
    const [railroadCars, setRailroadCarsInTheTrain] = useState<RailroadCarInTheTrainResponse[] | undefined>(undefined)

    const navigate = useNavigate()

    const {
        data: getFilterRailroadCarInTheTrains,
        isFetching: isGetFilterRailroadCarInTheTrainFetching,
        isSuccess: isGetFilterRailroadCarInTheTrainSuccess,
        isError: isGetFilterRailroadCarInTheTrainError,
    } = useFilterRailroadCarInTheTrainQuery(
        searchRailroadCarsInTheTrain,
        {
            skip: !showSearchResponse,
            refetchOnMountOrArgChange: true
        }
    )

    const {
        data: getRailroadCars,
        isFetching: isGetRailroadCarsFetching,
        isSuccess: isGetRailroadCarsInTheTrainSuccess,
        isError: isGetRailroadCarsError,
    } = useGetRailroadCarsInTheTrainQuery(null, {
        refetchOnMountOrArgChange: true
    })

    const {
        data: getCarsData,
        isFetching: isGetCarsFetching,
        isSuccess: isGetCarsSuccess,
        isError: isGetCarsError,
    } = useGetRailroadCarsQuery(null, {
        refetchOnMountOrArgChange: true
    })

    const checkIsRailroadCarIdInteger = () => {
        if (isNaN(Number(searchRailroadCarsInTheTrain.idwagonumin)) || isNaN(Number(searchRailroadCarsInTheTrain.idwagonumax))) {
            setIsRailroadCarIdInteger(() => false)
        } else {
            setIsRailroadCarIdInteger(() => true)
        }
    }

    useEffect(() => {
        if (isGetFilterRailroadCarInTheTrainSuccess) {
            setRailroadCarsInTheTrain(getFilterRailroadCarInTheTrains)
            setShowSearchResponse(() => false)
        } else if (isGetRailroadCarsInTheTrainSuccess && isFirstRender) {
            setRailroadCarsInTheTrain(getRailroadCars)
            setIsFirstRender(() => false)
        }
    }, [getFilterRailroadCarInTheTrains, getRailroadCars, isFirstRender,
        isGetFilterRailroadCarInTheTrainSuccess, isGetRailroadCarsFetching, isGetRailroadCarsInTheTrainSuccess])

    const searchValues = () => {
        if (isRailroadCarIdInteger) {
            setShowSearchResponse(!showSearchResponse)
        }
    }

    if (railroadCars === undefined) {
        return <Loading/>
    } else {
        const allRailroadCars = Object.values(railroadCars).map((railroadCar: RailroadCarInTheTrainResponse) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{railroadCar.numerwagonu}</th>
                <th className={"py-2 font-semibold  border-b border-stone-200"}>{railroadCar.nazwapociagu} </th>
                <th className={"py-2 font-semibold border-b  border-stone-200"}>
                    {railroadCar.liczbamiejsc + " miejsc, data badania technicznego: " + railroadCar.databadaniatechnicznego.toString().split("T")[0]}
                </th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/railroad-cars-in-the-train/${railroadCar.idwagonu}/${railroadCar.idpociagu}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-2 py-2 lg:px-10 lg:py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Wagony w pociągu</p>
                </div>

                <div className={"bg-white h-[calc(100vh-6rem)] max-h-[calc(100vh-9rem)] " +
                    "w-full rounded-xl lg:p-8 p-4 border border-stone-200 overflow-auto"}>
                    <div className={"flex mb-4 w-full"}>
                        <input type="text"
                               placeholder="Minimum id wagonu"
                               className={"border mb-4 mr-2"}
                               onBlur={() => checkIsRailroadCarIdInteger()}
                               onChange={(e) => setSearchRailroadCarsInTheTrain((prevState: SearchRailroadCarInTheTrain) => {
                                   return {...prevState, idwagonumin: e.target.value}
                               })}/>
                        <input type="text"
                               placeholder="Maksimum id wagonu"
                               className={"border mb-4 mr-2"}
                               onBlur={() => checkIsRailroadCarIdInteger()}
                               onChange={(e) => setSearchRailroadCarsInTheTrain((prevState: SearchRailroadCarInTheTrain) => {
                                   return {...prevState, idwagonumax: e.target.value}
                               })}/>
                        <input type="text"
                               placeholder="Nazwa pociągu"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchRailroadCarsInTheTrain((prevState: SearchRailroadCarInTheTrain) => {
                                   return {...prevState, nazwapociagu: e.target.value}
                               })}/>

                        <button className={"mb-4"} onClick={() => searchValues()}>
                            Szukaj
                        </button>

                        <div className={"h-14 flex items-center w-full text-sm flex-col"}>
                            <div
                                className={`${!isRailroadCarIdInteger ?
                                    "visible w-full" : "invisible absolute"}`}>
                                <div className={"w-96 mb-4 ml-2 text-red-700"}>
                                    <div className={"flex items-center w-full"}>
                                        <ExclamationMark className={"h-5 mr-2"}/>
                                        <p className={"w-full"}>
                                            Id wagonu powinno być liczbą
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"flex justify-end w-full mb-4"}>
                            <button onClick={() => navigate("/add-railroad-cars-in-the-train")}>
                                Dodaj wagon w pociągu
                            </button>
                        </div>
                    </div>
                    <table className={"w-full border-spacing-0 border-separate overflow-y-auto"}>
                        <tbody>
                        <tr className={"rounded-tl-xl text-slate-600"}>
                            <th className={"rounded-tl-xl  bg-slate-100 py-2 border-y border-l border-stone-200"}>Numer
                                wagonu
                            </th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Pociąg</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Wagon</th>
                            <th className={"rounded-tr-xl bg-slate-100 w-20 border-y  border-r border-stone-200"}></th>
                        </tr>
                        {allRailroadCars}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default RailroadCarsInTheTrain
