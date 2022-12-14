import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {RailConnection} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetRailConnectionsQuery} from "../../services/railConnectionsApi"
import RailConnectionsTable from "./RailConnectionsTable"

const RailConnections = () => {
    const [railConnections, setRailConnections] = useState<RailConnection[] | undefined>(undefined)

    const {
        data: getRailConnections,
        isFetching: isGetRailConnectionsFetching,
        isSuccess: isGetRailConnectionsSuccess,
        isError: isGetRailConnectionsError,
    } = useGetRailConnectionsQuery(null)
    console.log({getRailConnections})

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

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <RailConnectionsTable {...allRailConnections}/>
    }
}

export default RailConnections
