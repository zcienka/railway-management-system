import React, {useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import {useGetSingleReservationQuery} from "../services/reservationsApi"
import {Reservation} from "../types"
import Menu from "../components/Menu";


const EditReservations = () => {
    const [reservation, setReservation] = useState<Reservation | undefined>(undefined)

    const {id} = useParams()
    const {
        data: getSingleReservation,
        isFetching: isGetSingleReservationFetching,
        isSuccess: isGetSingleReservationSuccess,
        isError: isGetSingleReservationError,
    } = useGetSingleReservationQuery(id, {
        skip: id === undefined
    })

    useEffect(() => {
        if (isGetSingleReservationSuccess) {
            setReservation(getSingleReservation[0])
        }
    }, [getSingleReservation, isGetSingleReservationSuccess])

    console.log({getSingleReservation})
    console.log({reservation})

    if (reservation === undefined) {
        return <div>loading..</div>
    } else {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Rezerwacja</p>
                </div>

                <div className={"bg-white h-[calc(100%-6rem)] w-full rounded-xl p-8 border border-stone-200"}>
                    <p>{reservation.id}</p>
                    <p>{reservation.imie}</p>
                    <p>{reservation.nazwisko}</p>
                </div>
            </div>
        </div>
    }
}

export default EditReservations
