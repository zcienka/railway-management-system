import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {RailroadCar, SearchRailroadCar} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetRailroadCarsQuery, useFilterRailroadCarQuery} from "../../services/railroadCarsApi"
import {useNavigate} from "react-router-dom";
import Menu from "../../components/Menu";

const initialState: SearchRailroadCar = {
    databadaniamin: "",
    databadaniamax: "",
    liczbamiejscmin: "",
    liczbamiejscmax: "",
}

const RailroadCars = () => {
    const [searchRailroadCar, setSearchRailroadCar] = useState<SearchRailroadCar>(initialState)
    const [showSearchResponse, setShowSearchResponse] = useState<boolean>(false)
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
    const [carriages, setRailroadCars] = useState<RailroadCar[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getRailroadCars,
        isFetching: isGetRailroadCarsFetching,
        isSuccess: isGetRailroadCarsSuccess,
        isError: isGetRailroadCarsError,
    } = useGetRailroadCarsQuery(null)

    const {
        data: getFilterRailroadCars,
        isFetching: isGetFilterRailroadCarFetching,
        isSuccess: isGetFilterRailroadCarSuccess,
        isError: isGetFilterRailroadCarError,
    } = useFilterRailroadCarQuery(
        searchRailroadCar,
        {skip: !showSearchResponse}
    )
console.log({getFilterRailroadCars})
    useEffect(() => {
        if (isGetFilterRailroadCarSuccess) {
            setRailroadCars(getFilterRailroadCars)
            setShowSearchResponse(() => false)
        } else if (isGetRailroadCarsSuccess && isFirstRender) {
            setRailroadCars(getRailroadCars)
            setIsFirstRender(() => false)
        }
    }, [getFilterRailroadCars, getRailroadCars, isFirstRender,
        isGetFilterRailroadCarSuccess, isGetRailroadCarsFetching, isGetRailroadCarsSuccess])

    if (carriages === undefined) {
        return <Loading/>
    } else {
        const allRailroadCars = Object.values(carriages).map((carriage: RailroadCar) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{carriage.databadaniatechnicznego.toString().split("T")[0]}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{carriage.liczbamiejsc.toString()}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/railroad-cars/${carriage.id}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-2 py-2 lg:px-10 lg:py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Wagony</p>
                </div>

                <div className={"bg-white h-[calc(100vh-6rem)] max-h-[calc(100vh-9rem)] " +
                    "w-full rounded-xl lg:p-8 p-4 border border-stone-200 overflow-auto"}>
                    <div className={"flex mb-4 w-full"}>
                        <input type="text"
                               placeholder="Minimalna data badania"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchRailroadCar((prevState: SearchRailroadCar) => {
                                   return {...prevState, databadaniamin: e.target.value}
                               })}/>
                        <input type="text"
                               placeholder="Maksymalna data badania"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchRailroadCar((prevState: SearchRailroadCar) => {
                                   return {...prevState, databadaniamax: e.target.value}
                               })}/>
                        <input type="text"
                               placeholder="Minimalna liczba miejsc"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchRailroadCar((prevState: SearchRailroadCar) => {
                                   return {...prevState, liczbamiejscmin: e.target.value}
                               })}/>

                        <input type="text"
                               placeholder="Maksymalna liczba miejsc"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchRailroadCar((prevState: SearchRailroadCar) => {
                                   return {...prevState, liczbamiejscmax: e.target.value}
                               })}/>
                        <button className={"mb-4"} onClick={() => setShowSearchResponse(!showSearchResponse)}>
                            Szukaj
                        </button>

                        <div className={"flex justify-end w-full"}>
                            <button onClick={() => navigate("/add-carriage")}>
                                Dodaj wagon
                            </button>
                        </div>
                    </div>
                    <table className={"w-full border-spacing-0 border-separate overflow-y-auto"}>
                        <tbody>
                        <tr className={"rounded-tl-xl text-slate-600"}>
                            <th className={"rounded-tl-xl  bg-slate-100 py-2 border-y border-l border-stone-200"}>Data
                                badania technicznego
                            </th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Liczba miejsc</th>
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

export default RailroadCars
