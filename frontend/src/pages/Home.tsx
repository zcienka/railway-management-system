import React, {useEffect, useState} from "react"
import Menu from "../components/Menu"
import {useGetReservationsQuery} from "../services/reservationsApi"

const Home = () => {
    const {
        data: getReservations,
        isFetching: isGetRoomFetching,
        isSuccess: isGetRoomSuccess,
        isError: isGetReservationsError,
    } = useGetReservationsQuery({})

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Rezerwacja</p>
            </div>

            <div className={"bg-white h-[calc(100%-6rem)] w-full rounded-xl p-8 border border-stone-200"}>
                <table className={"w-full border-spacing-0 border-separate"}>
                    <tbody>
                        <tr className={"rounded-tl-xl text-slate-600"}>
                            <th className={"rounded-tl-xl  bg-slate-100 py-2  border-y border-l border-stone-200"}>Id</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Imię</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Nazwisko</th>
                            <th className={"bg-slate-100 py-2 border-y  border-stone-200"}>Cena</th>
                            <th className={"rounded-tr-xl bg-slate-100 w-20 border-y  border-r border-stone-200"}></th>
                        </tr>
                        <tr>
                            <th className={"py-2 font-semibold border-b border-l border-stone-200"}>1</th>
                            <th className={"py-2 font-semibold border-b border-stone-200"}>imie</th>
                            <th className={"py-2 font-semibold border-b border-stone-200"}>nazwisko</th>
                            <th className={"py-2 font-semibold border-b border-stone-200 "}>200</th>
                            <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}>
                                <div className={"px-3 py-1 border-2 rounded-md cursor-pointer"}>Edit</div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
}

export default Home
