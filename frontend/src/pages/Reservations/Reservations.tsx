import React, {useEffect, useState} from "react"
import {useGetReservationsQuery, useFilterReservationQuery} from "../../services/reservationsApi"
import {ReservationResponse, SearchReservation} from "../../types"
import {useNavigate} from "react-router-dom"
import {v4 as uuidv4} from 'uuid'
import Loading from "../../components/Loading"
import Menu from "../../components/Menu";
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const initialState: SearchReservation = {
    imie: "",
    nazwisko: "",
    znizka: "",
    dataprzejazdumin: "",
    dataprzejazdumax: ""
}

const Reservations = () => {
    const [searchReservation, setSearchReservation] = useState<SearchReservation>(initialState)
    const [showSearchResponse, setShowSearchResponse] = useState<boolean>(false)
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
    const [isDateGoodFormat, setIsDateGoodFormat] = useState<boolean>(true)

    const [reservations, setReservations] = useState<ReservationResponse[] | undefined>(undefined)
    const navigate = useNavigate()

    const {
        data: getFilterReservations,
        isFetching: isGetFilterReservationFetching,
        isSuccess: isGetFilterReservationSuccess,
        isError: isGetFilterReservationError,
    } = useFilterReservationQuery(
        searchReservation,
        {skip: !showSearchResponse}
    )


    const {
        data: getReservations,
        isFetching: isGetReservationsFetching,
        isSuccess: isGetReservationsSuccess,
        isError: isGetReservationsError
    } = useGetReservationsQuery(null,
        {
            refetchOnMountOrArgChange: true,
        })

    useEffect(() => {
        if (isGetFilterReservationSuccess) {
            setReservations(getFilterReservations)
            setShowSearchResponse(() => false)
        } else if (isGetReservationsSuccess && isFirstRender) {
            setReservations(getReservations)
            setIsFirstRender(() => false)
        }
    }, [getFilterReservations, getReservations, isFirstRender,
        isGetFilterReservationSuccess, isGetReservationsFetching, isGetReservationsSuccess])

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
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-2 py-2 lg:px-10 lg:py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Rezerwacja</p>
                </div>

                <div className={"bg-white h-[calc(100vh-6rem)] max-h-[calc(100vh-9rem)] " +
                    "w-full rounded-xl lg:p-8 p-4 border border-stone-200 overflow-auto"}>
                    <div className={"flex mb-4 w-full"}>
                        <input type="text"
                               placeholder="Imi??"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchReservation((prevState: SearchReservation) => {
                                   return {...prevState, imie: e.target.value}
                               })}/>
                        <div/>

                        <input type="text"
                               placeholder="Nazwisko"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchReservation((prevState: SearchReservation) => {
                                   return {...prevState, nazwisko: e.target.value}
                               })}/>
                        <div/>

                        <input type="text"
                               placeholder="Zni??ka"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchReservation((prevState: SearchReservation) => {
                                   return {...prevState, znizka: e.target.value}
                               })}/>
                        <div/>

                        <button className={"mb-4"} onClick={() => setShowSearchResponse(!showSearchResponse)}>
                            Szukaj
                        </button>

                        <div/>

                        <div className={"flex justify-end w-full mb-4"}>
                            <button onClick={() => navigate("/create-reservation")}>
                                Sk??adanie rezerwacji
                            </button>
                        </div>
                    </div>

                    <table className={"w-full border-spacing-0 border-separate overflow-y-auto"}>
                        <tbody>
                        <tr className={"rounded-tl-xl text-slate-600"}>
                            <th className={"rounded-tl-xl  bg-slate-100 py-2 border-y border-l border-stone-200"}>Imi??</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Nazwisko</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Data odjazdu</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Data przyjazdu</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Zni??ka</th>
                            <th className={"rounded-tr-xl bg-slate-100 w-20 border-y  border-r border-stone-200"}></th>
                        </tr>
                        {allReservations}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default Reservations
