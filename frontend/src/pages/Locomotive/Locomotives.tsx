import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {Locomotive, SearchLocomotive} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetLocomotivesQuery, useFilterLocomotiveQuery} from "../../services/locomotivesApi"
import {useNavigate} from "react-router-dom";
import Menu from "../../components/Menu";
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const initialState: SearchLocomotive = {
    databadaniamin: "",
    databadaniamax: "",
    nazwa: ""
}

const Locomotives = () => {
    const [searchLocomotive, setSearchLocomotive] = useState<SearchLocomotive>(initialState)
    const [showSearchResponse, setShowSearchResponse] = useState<boolean>(false)
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

    const [locomotives, setLocomotives] = useState<Locomotive[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getFilterLocomotives,
        isFetching: isGetFilterLocomotiveFetching,
        isSuccess: isGetFilterLocomotiveSuccess,
        isError: isGetFilterLocomotiveError,
        error: getFilterLocomotiveError
    } = useFilterLocomotiveQuery(
        searchLocomotive,
        {skip: !showSearchResponse}
    )

    const {
        data: getLocomotives,
        isFetching: isGetLocomotivesFetching,
        isSuccess: isGetLocomotivesSuccess,
        isError: isGetLocomotivesError,
    } = useGetLocomotivesQuery(null,
        {
            refetchOnMountOrArgChange: true
        })

    useEffect(() => {
        if (isGetFilterLocomotiveSuccess) {
            setLocomotives(getFilterLocomotives)
            setShowSearchResponse(() => false)
        } else if (isGetLocomotivesSuccess && isFirstRender) {
            setLocomotives(getLocomotives)
            setIsFirstRender(() => false)
        }
    }, [getFilterLocomotives, isFirstRender, isGetFilterLocomotiveSuccess, getLocomotives,
        isGetLocomotivesFetching, isGetLocomotivesSuccess])

    if (locomotives === undefined) {
        return <Loading/>
    } else {
        const allLocomotives = Object.values(locomotives).map((locomotive: Locomotive) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{locomotive.databadaniatechnicznego.toString().split("T")[0]}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{locomotive.nazwa}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/locomotive/${locomotive.id}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-2 py-2 lg:px-10 lg:py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Lokomotywy</p>
                </div>

                <div className={"bg-white h-[calc(100vh-6rem)] max-h-[calc(100vh-9rem)] " +
                    "w-full rounded-xl lg:p-8 p-4 border border-stone-200 overflow-auto"}>
                    <div className={"flex items-center mr-4"}>
                        <input type="text"
                               placeholder="Minimalna data badania"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchLocomotive((prevState: SearchLocomotive) => {
                                   return {...prevState, databadaniamin: e.target.value}
                               })}/>
                        <div/>
                        <input type="text"
                               placeholder="Maksymalna data badania"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchLocomotive((prevState: SearchLocomotive) => {
                                   return {...prevState, databadaniamax: e.target.value}
                               })}/>
                        <div/>
                        <input type="text"
                               placeholder="Nazwa lokomotywy"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchLocomotive((prevState: SearchLocomotive) => {
                                   return {...prevState, nazwa: e.target.value}
                               })}/>

                        <button className={"mb-4"} onClick={() => setShowSearchResponse(!showSearchResponse)}>
                            Szukaj
                        </button>

                        <div className={`${isGetFilterLocomotiveError ? "visible w-full" : "invisible absolute"} `}>
                            <div className={"w-96 mb-4 ml-2 text-red-700"}>
                                <div className={"flex items-center w-full"}>
                                    <ExclamationMark className={"h-5 mr-2"}/>
                                    <p className={"w-full"}>

                                        {// @ts-ignore
                                            getFilterLocomotiveError !== undefined ? getFilterLocomotiveError!.data : ""}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={"flex justify-end w-full mb-4"}>
                            <button onClick={() => navigate("/add-locomotive")}>
                                Dodaj lokomotywę
                            </button>
                        </div>
                    </div>
                    <table className={"w-full border-spacing-0 border-separate overflow-y-auto"}>
                        <tbody>
                        <tr className={"rounded-tl-xl text-slate-600"}>
                            <th className={"rounded-tl-xl bg-slate-100 py-2 border-y border-l border-stone-200"}>Data
                                badania technicznego
                            </th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Nazwa</th>
                            <th className={"rounded-tr-xl bg-slate-100 w-20 border-y  border-r border-stone-200"}></th>
                        </tr>
                        {allLocomotives}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default Locomotives
