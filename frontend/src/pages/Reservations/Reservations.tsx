import React, {useEffect, useState} from "react"
import {useGetReservationsQuery} from "../../services/reservationsApi"
import ReservationsTable from "./ReservationsTable"
import {Reservation, ReservationResponse} from "../../types"
import {useNavigate} from "react-router-dom"
import {v4 as uuidv4} from 'uuid'
import Loading from "../../components/Loading"

const Reservations = () => {
    const [reservations, setReservations] = useState<ReservationResponse[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getReservations,
        isFetching: isGetReservationsFetching,
        isSuccess: isGetReservationsSuccess,
        isError: isGetReservationsError,
    } = useGetReservationsQuery(null)

    useEffect(() => {
        if (isGetReservationsSuccess) {
            setReservations(getReservations)
        }
    }, [getReservations, isGetReservationsFetching, isGetReservationsSuccess])

    if (reservations === undefined) {
        return <Loading/>
    } else {
        const allReservations = Object.values(reservations).map((reservation: ReservationResponse) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{reservation.imie}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{reservation.nazwisko}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>
                    {reservation.dataodjazdu.toString().split("T")[0] + " " + reservation.dataodjazdu.toString().split("T")[1]}
                </th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>
                    {reservation.dataprzyjazdu.toString().split("T")[0] + " " + reservation.dataprzyjazdu.toString().split("T")[1]}
                </th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{reservation.znizka}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/reservations/${reservation.id}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })
        return <ReservationsTable {...allReservations}/>
    }
}

export default Reservations
