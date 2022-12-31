import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {
    RailroadCarInTheTrainResponse,
    SearchRailroadCarInTheTrain
} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetRailroadCarsInTheTrainQuery, useFilterRailroadCarInTheTrainQuery} from "../../services/railroadCarsInTheTrainApi"
import {Link, useNavigate} from "react-router-dom"
import Menu from "../../components/Menu"

const initialState: SearchRailroadCarInTheTrain = {
    idwagonumin: "",
    idwagonumax: "",
    idpociagumin: "",
    idpociagumax: ""
}

const RailroadCarsInTheTrain = () => {
    const [searchRailroadCarsInTheTrain, setSearchRailroadCarsInTheTrain] = useState<SearchRailroadCarInTheTrain>(initialState)
    const [showSearchResponse, setShowSearchResponse] = useState<boolean>(false)
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

    const [railroadCars, setRailroadCarsInTheTrain] = useState<RailroadCarInTheTrainResponse[] | undefined>(undefined)

    const navigate = useNavigate()

    const {
        data: getFilterRailroadCarInTheTrains,
        isFetching: isGetFilterRailroadCarInTheTrainFetching,
        isSuccess: isGetFilterRailroadCarInTheTrainSuccess,
        isError: isGetFilterRailroadCarInTheTrainError,
    } = useFilterRailroadCarInTheTrainQuery(
        searchRailroadCarsInTheTrain,
        {skip: !showSearchResponse}
    )
    const {
        data: getRailroadCars,
        isFetching: isGetRailroadCarsFetching,
        isSuccess: isGetRailroadCarsInTheTrainSuccess,
        isError: isGetRailroadCarsError,
    } = useGetRailroadCarsInTheTrainQuery(null)

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

    if (railroadCars === undefined) {
        return <Loading/>
    } else {
        const allRailroadCars = Object.values(railroadCars).map((railroadCar: RailroadCarInTheTrainResponse) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{railroadCar.numerwagonu}</th>
                <th className={"py-2 font-semibold  border-b border-stone-200"}>{railroadCar.nazwapociagu} </th>
                <th className={"py-2 font-semibold border-b  border-stone-200 underline"}><Link to={"/xd"}>Pokaż wagon</Link></th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/railroad-cars/${railroadCar.idwagonu}/${railroadCar.idpociagu}`)}>
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
                               onChange={(e) => setSearchRailroadCarsInTheTrain((prevState: SearchRailroadCarInTheTrain) => {
                                   return {...prevState, idwagonumin: e.target.value}
                               })}/>
                        <input type="text"
                               placeholder="Maksimum id wagonu"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchRailroadCarsInTheTrain((prevState: SearchRailroadCarInTheTrain) => {
                                   return {...prevState, idwagonumax: e.target.value}
                               })}/>
                        <input type="text"
                               placeholder="Minimum id pociągu"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchRailroadCarsInTheTrain((prevState: SearchRailroadCarInTheTrain) => {
                                   return {...prevState, idpociagumin: e.target.value}
                               })}/>

                        <input type="text"
                               placeholder="Maksimum id pociągu"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchRailroadCarsInTheTrain((prevState: SearchRailroadCarInTheTrain) => {
                                   return {...prevState, idpociagumax: e.target.value}
                               })}/>
                        <button className={"mb-4"} onClick={() => setShowSearchResponse(!showSearchResponse)}>
                            Szukaj
                        </button>

                        <div className={"flex justify-end w-full mb-4"}>
                            <button onClick={() => navigate("/add-railroad-cars")}>
                                Dodaj wagon w pociągu
                            </button>
                        </div>
                    </div>
                    <table className={"w-full border-spacing-0 border-separate overflow-y-auto"}>
                        <tbody>
                        <tr className={"rounded-tl-xl text-slate-600"}>
                            <th className={"rounded-tl-xl  bg-slate-100 py-2 border-y border-l border-stone-200"}>Numer wagonu</th>
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