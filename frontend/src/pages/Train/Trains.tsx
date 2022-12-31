import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {SearchTrain, Train} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetTrainsQuery} from "../../services/trainsApi"
import {useNavigate} from "react-router-dom"
import Menu from "../../components/Menu"
import {useFilterTrainQuery} from "../../services/trainsApi"

const initialState: SearchTrain = {
    nazwa: "",
    idlokomotywymin: "",
    idlokomotywymax: ""
}

const Trains = () => {
    const [searchTrain, setSearchTrain] = useState<SearchTrain>(initialState)
    const [showSearchResponse, setShowSearchResponse] = useState<boolean>(false)
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

    const [trains, setTrains] = useState<Train[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getFilterTrains,
        isFetching: isGetFilterTrainFetching,
        isSuccess: isGetFilterTrainSuccess,
        isError: isGetFilterTrainError,
    } = useFilterTrainQuery(
        searchTrain,
        {skip: !showSearchResponse}
    )

    const {
        data: getTrains,
        isFetching: isGetTrainsFetching,
        isSuccess: isGetTrainsSuccess,
        isError: isGetTrainsError,
    } = useGetTrainsQuery(null)

    useEffect(() => {
        if (isGetFilterTrainSuccess) {
            setTrains(getFilterTrains)
            setShowSearchResponse(() => false)
        } else if (isGetTrainsSuccess && isFirstRender) {
            setTrains(getTrains)
            setIsFirstRender(() => false)
        }
    }, [getFilterTrains, getTrains, isFirstRender, isGetFilterTrainSuccess,
        isGetTrainsFetching, isGetTrainsSuccess])

    if (trains === undefined) {
        return <Loading/>
    } else {
        const allTrains = Object.values(trains).map((train: Train) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{train.nazwa}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{train.idlokomotywy}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/train/${train.id}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-2 py-2 lg:px-10 lg:py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Pociągi</p>
                </div>

                <div className={"bg-white h-[calc(100vh-6rem)] max-h-[calc(100vh-9rem)] " +
                    "w-full rounded-xl lg:p-8 p-4 border border-stone-200 overflow-auto"}>
                    <div className={"flex mb-4 w-full"}>
                        <input type="text"
                               placeholder="Nazwa"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchTrain((prevState: SearchTrain) => {
                                   return {...prevState, nazwa: e.target.value}
                               })}/>
                        <div/>

                        <input type="text"
                               placeholder="Minimalne id lokomotywy"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchTrain((prevState: SearchTrain) => {
                                   return {...prevState, idlokomotywymin: e.target.value}
                               })}/>
                        <div/>

                        <input type="text"
                               placeholder="Maksymalne id lokomotywy"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchTrain((prevState: SearchTrain) => {
                                   return {...prevState, idlokomotywymax: e.target.value}
                               })}/>
                        <div/>

                        <button className={"mb-4"} onClick={() => setShowSearchResponse(!showSearchResponse)}>
                            Szukaj
                        </button>

                        <div className={"flex justify-end w-full"}>
                            <button onClick={() => navigate("/add-train")}>
                                Dodaj pociąg
                            </button>
                        </div>
                    </div>
                    <table className={"w-full border-spacing-0 border-separate overflow-y-auto"}>
                        <tbody>
                        <tr className={"rounded-tl-xl text-slate-600"}>
                            <th className={"rounded-tl-xl  bg-slate-100 py-2 border-y border-l border-stone-200"}>Nazwa</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Id lokomotywy</th>
                            <th className={"rounded-tr-xl bg-slate-100 w-20 border-y border-r border-stone-200"}></th>
                        </tr>
                        {allTrains}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default Trains
