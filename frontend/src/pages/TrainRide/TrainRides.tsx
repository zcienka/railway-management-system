import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {SearchTrainRide, TrainRide, TrainRideResponse} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetTrainRidesQuery} from "../../services/trainRideApi"
import {useNavigate} from "react-router-dom"
import Menu from "../../components/Menu";
// import {useFilterTrainRideQuery} from "../../services/trainRideApi";

const TrainRides = () => {
    // const [searchTrainRide, setSearchTrainRide] = useState<SearchTrainRide>(initialState)
    const [showSearchResponse, setShowSearchResponse] = useState<boolean>(false)
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

    const [trainRides, setTrainRides] = useState<TrainRideResponse[] | undefined>(undefined)
    const navigate = useNavigate()
    // const {
    //     data: getFilterTrainRides,
    //     isFetching: isGetFilterTrainRideFetching,
    //     isSuccess: isGetFilterTrainRideSuccess,
    //     isError: isGetFilterTrainRideError,
    // } = useFilterTrainRideQuery(
    //     searchTrainRide,
    //     {skip: !showSearchResponse}
    // )

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
        const allTrainRides = Object.values(trainRides).map((trainRide: TrainRideResponse) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{trainRide.imiekonduktora + " " + trainRide.nazwiskokonduktora}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainRide.imiemaszynisty + " " + trainRide.nazwiskomaszynisty}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{trainRide.idliniiprzejazdu}</th>
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
                        {/*<input type="text"*/}
                        {/*       placeholder="Minimalny procent zniżki"*/}
                        {/*       className={"border mb-4 mr-2"}*/}
                        {/*       onChange={(e) => setSearchTrainRide((prevState: SearchTrainRide) => {*/}
                        {/*           return {...prevState, nazwaznizki: e.target.value}*/}
                        {/*       })}/>*/}
                        {/*<input type="text"*/}
                        {/*       placeholder="Minimalny procent zniżki"*/}
                        {/*       className={"border mb-4 mr-2"}*/}
                        {/*       onChange={(e) => setSearchTrainRide((prevState: SearchTrainRide) => {*/}
                        {/*           return {...prevState, nazwaznizki: e.target.value}*/}
                        {/*       })}/>*/}
                        {/*<input type="text"*/}
                        {/*       placeholder="Minimalny procent zniżki"*/}
                        {/*       className={"border mb-4 mr-2"}*/}
                        {/*       onChange={(e) => setSearchTrainRide((prevState: SearchTrainRide) => {*/}
                        {/*           return {...prevState, nazwaznizki: e.target.value}*/}
                        {/*       })}/>*/}
                        {/*<input type="text"*/}
                        {/*       placeholder="Minimalny procent zniżki"*/}
                        {/*       className={"border mb-4 mr-2"}*/}
                        {/*       onChange={(e) => setSearchTrainRide((prevState: SearchTrainRide) => {*/}
                        {/*           return {...prevState, nazwaznizki: e.target.value}*/}
                        {/*       })}/>*/}


                        <div className={"flex justify-end w-full"}>
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
