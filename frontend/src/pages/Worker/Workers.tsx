import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {SearchWorker, Worker} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetWorkersQuery, useFilterWorkerQuery} from "../../services/workersApi"
import {useNavigate} from "react-router-dom"
import Menu from "../../components/Menu";
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const initialState: SearchWorker = {
    imie: "",
    nazwisko: "",
    placamin: "",
    placamax: "",
    zawod: ""
}

const Workers = () => {
    const [searchWorker, setSearchWorker] = useState<SearchWorker>(initialState)
    const [showSearchResponse, setShowSearchResponse] = useState<boolean>(false)
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
    const [isWageGoodFormat, setIsWageGoodFormat] = useState<boolean>(true)

    const [workers, setWorkers] = useState<Worker[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getFilterWorkers,
        isFetching: isGetFilterWorkerFetching,
        isSuccess: isGetFilterWorkerSuccess,
        isError: isGetFilterWorkerError,
    } = useFilterWorkerQuery(
        searchWorker,
        {skip: !showSearchResponse}
    )

    const {
        data: getWorkers,
        isFetching: isGetWorkersFetching,
        isSuccess: isGetWorkersSuccess,
        isError: isGetWorkersError,
    } = useGetWorkersQuery(null)

    useEffect(() => {
        if (isGetFilterWorkerSuccess) {
            setWorkers(getFilterWorkers)
            setShowSearchResponse(() => false)
        } else if (isGetWorkersSuccess && isFirstRender) {
            setWorkers(getWorkers)
            setIsFirstRender(() => false)
        }
    }, [getFilterWorkers, getWorkers, isFirstRender, isGetFilterWorkerSuccess, isGetWorkersFetching, isGetWorkersSuccess])

    const checkIsWageInteger = () => {
        if (isNaN(Number(searchWorker.placamax)) || isNaN(Number(searchWorker.placamin))) {
            setIsWageGoodFormat(() => false)
        } else {
            setIsWageGoodFormat(() => true)
        }
    }

    const searchValues = () => {
        if (isWageGoodFormat) {
            setShowSearchResponse(!showSearchResponse)
        }
    }

    if (workers === undefined) {
        return <Loading/>
    } else {
        const allWorkers = Object.values(workers).map((worker: Worker) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{worker.imie}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{worker.nazwisko}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{worker.placa}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{worker.zawod}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/worker/${worker.id}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-2 py-2 lg:px-10 lg:py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Pracownicy</p>
                </div>

                <div className={"bg-white h-[calc(100vh-6rem)] max-h-[calc(100vh-9rem)] " +
                    "w-full rounded-xl lg:p-8 p-4 border border-stone-200 overflow-auto"}>
                    <div className={"flex mb-4 w-full"}>

                        <input type="text"
                               placeholder="Imię"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchWorker((prevState: SearchWorker) => {
                                   return {...prevState, imie: e.target.value}
                               })}/>
                        <div/>

                        <input type="text"
                               placeholder="Nazwisko"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchWorker((prevState: SearchWorker) => {
                                   return {...prevState, nazwisko: e.target.value}
                               })}/>
                        <div/>

                        <input type="text"
                               placeholder="Minimalna płaca"
                               className={"border mb-4 mr-2"}
                               onBlur={() => checkIsWageInteger()}
                               onChange={(e) => setSearchWorker((prevState: SearchWorker) => {
                                   return {...prevState, placamin: e.target.value}
                               })}/>
                        <div/>

                        <input type="text"
                               placeholder="Maksymalna płaca"
                               className={"border mb-4 mr-2"}
                               onBlur={() => checkIsWageInteger()}
                               onChange={(e) => setSearchWorker((prevState: SearchWorker) => {
                                   return {...prevState, placamax: e.target.value}
                               })}/>
                        <div/>

                        <input type="text"
                               placeholder="Zawód"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchWorker((prevState: SearchWorker) => {
                                   return {...prevState, zawod: e.target.value}
                               })}/>
                        <div/>

                        <button className={"mb-4"} onClick={() => searchValues()}>
                            Szukaj
                        </button>

                        <div className={"h-14 flex items-center w-64 text-sm flex-col"}>
                            <div
                                className={`${!isWageGoodFormat ? "visible w-full items-center h-full flex mb-4" : "invisible absolute"} `}>
                                <div className={"w-96 ml-2 text-red-700"}>
                                    <div className={"flex items-center w-full"}>
                                        <ExclamationMark className={"h-5 mr-2"}/>
                                        <p className={"w-full"}>
                                            Pola płac muszą być liczbami
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"flex justify-end w-full mb-4"}>
                            <button onClick={() => navigate("/add-worker")}>
                                Dodaj pracownika
                            </button>
                        </div>
                    </div>
                    <table className={"w-full border-spacing-0 border-separate overflow-y-auto"}>
                        <tbody>
                        <tr className={"rounded-tl-xl text-slate-600"}>
                            <th className={"rounded-tl-xl  bg-slate-100 py-2 border-y border-l border-stone-200"}>Imię</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Nazwisko</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Płaca</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Zawód</th>
                            <th className={"rounded-tr-xl bg-slate-100 w-20 border-y border-r border-stone-200"}></th>
                        </tr>
                        {allWorkers}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default Workers
