import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {Worker} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetWorkersQuery} from "../../services/workersApi"
import WorkersTable from "./WorkersTable"
import {useNavigate} from "react-router-dom"

const Workers = () => {
    const [workers, setWorkers] = useState<Worker[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getWorkers,
        isFetching: isGetWorkersFetching,
        isSuccess: isGetWorkersSuccess,
        isError: isGetWorkersError,
    } = useGetWorkersQuery(null)

    useEffect(() => {
        if (isGetWorkersSuccess) {
            setWorkers(getWorkers)
        }
    }, [getWorkers, isGetWorkersFetching, isGetWorkersSuccess])

    if (workers === undefined) {
        return <Loading/>
    } else {
        const allWorkers = Object.values(workers).map((worker: Worker) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{worker.id}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{worker.imie}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{worker.nazwisko}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{worker.placa}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{worker.zawod}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/worker/${worker.id}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <WorkersTable {...allWorkers}/>
    }
}

export default Workers
