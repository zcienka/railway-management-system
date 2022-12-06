import React, {useEffect, useState} from "react"
import {useGetReservationsQuery} from "../services/reservationsApi"
import Home from "./Home"
import {Reservation} from "../types"
import {useNavigate} from "react-router-dom"

const Reservations = () => {
    const [reservations, setReservations] = useState<Reservation[] | undefined>(undefined)
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
        return <div>loading..</div>
    } else {
        const allReservations = Object.values(reservations).map((reservation: Reservation, index: number) => {
            return <tr key={index}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{reservation.id}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{reservation.imie}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{reservation.nazwisko}</th>
                <th className={"py-2 font-semibold border-b border-stone-200 "}>{reservation.idPrzejazdu}</th>
                <th className={"py-2 font-semibold border-b border-stone-200 "}>{reservation.znizka}</th>
                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/reservations/${reservation.id}`, {replace: false})}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer"}>Edit</div>
                </th>
            </tr>
        })
        return <Home {...allReservations}/>
    }
}

export default Reservations
