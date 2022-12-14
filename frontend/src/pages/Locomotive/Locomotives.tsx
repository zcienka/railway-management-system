import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {Locomotive} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetLocomotivesQuery} from "../../services/locomotivesApi"
import LocomotiveTable from "./LocomotiveTable"
import {useNavigate} from "react-router-dom";

const Locomotives = () => {
    const [locomotives, setLocomotives] = useState<Locomotive[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getLocomotives,
        isFetching: isGetLocomotivesFetching,
        isSuccess: isGetLocomotivesSuccess,
        isError: isGetLocomotivesError,
    } = useGetLocomotivesQuery(null)
    console.log({getLocomotives})

    useEffect(() => {
        if (isGetLocomotivesSuccess) {
            setLocomotives(getLocomotives)
        }
    }, [getLocomotives, isGetLocomotivesFetching, isGetLocomotivesSuccess])

    if (locomotives === undefined) {
        return <Loading/>
    } else {
        const allLocomotives = Object.values(locomotives).map((locomotive: Locomotive) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{locomotive.id}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{locomotive.databadaniatechnicznego.toString()}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{locomotive.nazwa}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/locomotive/${locomotive.nazwa}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <LocomotiveTable {...allLocomotives}/>
    }
}

export default Locomotives
