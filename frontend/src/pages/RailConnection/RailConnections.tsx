import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {RailConnection} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetRailConnectionsQuery} from "../../services/railConnectionsApi"
import Menu from "../../components/Menu";
import {ReactComponent as MagnifyingGlass} from "../../icons/magnifyingGlass.svg";
import {useNavigate} from "react-router-dom";

const RailConnections = () => {
    const [railConnections, setRailConnections] = useState<RailConnection[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getRailConnections,
        isFetching: isGetRailConnectionsFetching,
        isSuccess: isGetRailConnectionsSuccess,
        isError: isGetRailConnectionsError,
    } = useGetRailConnectionsQuery(null)

    useEffect(() => {
        if (isGetRailConnectionsSuccess) {
            setRailConnections(getRailConnections)
        }
    }, [getRailConnections, isGetRailConnectionsFetching, isGetRailConnectionsSuccess])

    if (railConnections === undefined) {
        return <Loading/>
    } else {
        const allRailConnections = Object.values(railConnections).map((railConnection: RailConnection) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{railConnection.id}</th>
                <th className={"py-2 font-semibold border-b border-stone-200 underline"}>Pokaż przystanki</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-2 py-2 lg:px-10 lg:py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Linia przejazdu</p>
                </div>

                <div className={"bg-white h-[calc(100vh-6rem)] max-h-[calc(100vh-9rem)] " +
                    "w-full rounded-xl lg:p-8 p-4 border border-stone-200 overflow-auto"}>
                    <div className={"flex mb-4 w-full"}>

                        <div className={"flex justify-end w-full"}>
                            <button onClick={() => navigate("/add-rail-connection")}>
                                Dodaj linię przejazdu
                            </button>
                        </div>
                    </div>
                    <table className={"w-full border-spacing-0 border-separate overflow-y-auto"}>
                        <tbody>
                        <tr className={"rounded-tl-xl text-slate-600"}>
                            <th className={"rounded-tl-xl bg-slate-100 py-2 border-y border-l border-stone-200"}>Id</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Przystanki</th>
                            <th className={"rounded-tr-xl bg-slate-100 w-20 border-y border-r border-stone-200"}></th>
                        </tr>
                        {allRailConnections}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default RailConnections
