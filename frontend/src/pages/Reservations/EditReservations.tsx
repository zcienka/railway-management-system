import React, {ChangeEvent, useEffect, useState} from "react"
import {useNavigate, useParams} from 'react-router-dom'
import {
    useGetSingleReservationQuery,
    useDeleteReservationMutation,
    useUpdateReservationMutation
} from "../../services/reservationsApi"
import {Discount, Reservation, TrainStop} from "../../types"
import Menu from "../../components/Menu"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg"
import {useGetDiscountsQuery} from "../../services/discountsApi"
import {v4 as uuidv4} from 'uuid'
import Loading from "../../components/Loading"
import {useGetTrainStopByLineQuery} from "../../services/trainRideApi"


const EditReservations = () => {
    const [reservation, setReservation] = useState<Reservation | undefined>(undefined)
    const [name, setName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [trainPassageId, setTrainPassageId] = useState<string>("")
    const [discountName, setDiscountName] = useState<string>("")
    const [initialStation, setInitialStation] = useState<string>("")
    const [finalStation, setFinalStation] = useState<string>("")

    const [isLastNameValidLength, setIsLastNameValidLength] = useState<boolean>(true)
    const [isNameValidLength, setIsNameValidLength] = useState<boolean>(true)

    const navigate = useNavigate()

    const {id} = useParams()
    const {
        data: getSingleReservation,
        isSuccess: isGetSingleReservationSuccess
    } = useGetSingleReservationQuery(id, {
        skip: id === undefined
    })

    const {
        data: getTrainStopByLineData,
        isSuccess: isGetTrainStopByLineSuccess
    } = useGetTrainStopByLineQuery(trainPassageId, {
        skip: trainPassageId === ""
    })

    const {data: getDiscountData} = useGetDiscountsQuery(null)

    const [deleteReservation] = useDeleteReservationMutation()
    const [updateReservation] = useUpdateReservationMutation()

    const updateSingleReservation = async () => {
        if (name !== "" && lastName !== ""
            && isNameValidLength && isLastNameValidLength) {
            const trainPassageIdNumber = parseInt(trainPassageId)

            if (typeof id === "string") {
                const idNumber = parseInt(id)
                await updateReservation({
                    "id": idNumber,
                    "idprzejazdu": trainPassageIdNumber,
                    "imie": name,
                    "nazwisko": lastName,
                    "znizka": discountName
                })
                navigate("/reservations")
            }
        }
    }

    const deleteSingleReservation = async () => {
        await deleteReservation(id)
        navigate("/reservations")
    }

    const handleDiscountChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setDiscountName(event.target.value)
    }

    const checkNameValidLength = (userInput: string) => {
        if (userInput.length > 16) {
            setIsNameValidLength(false)
        } else {
            setIsNameValidLength(true)
        }
    }

    const checkLastNameValidLength = (userInput: string) => {
        if (userInput.length > 32) {
            setIsLastNameValidLength(false)
        } else {
            setIsLastNameValidLength(true)
        }
    }

    useEffect(() => {
        if (isGetSingleReservationSuccess) {
            setReservation(getSingleReservation[0])
        }
    }, [getSingleReservation, isGetSingleReservationSuccess])

    useEffect(() => {
        if (reservation !== undefined) {
            setTrainPassageId(reservation.idprzejazdu.toString())
            setName(reservation.imie)
            setLastName(reservation.nazwisko)
            setDiscountName(reservation.znizka)
        }
    }, [reservation])

    useEffect(() => {
        if (isGetTrainStopByLineSuccess) {
            setFinalStation(getTrainStopByLineData[getTrainStopByLineData.length - 1].nazwastacji)
            setInitialStation(getTrainStopByLineData[0].nazwastacji)
        }
    }, [isGetTrainStopByLineSuccess, getTrainStopByLineData])

    if (reservation !== undefined && getDiscountData !== undefined && getTrainStopByLineData !== undefined) {
        const discounts = getDiscountData.map((discount: Discount) => {
            return <option key={uuidv4()} value={discount.nazwaznizki}>
                {discount.nazwaznizki} ({discount.procentznizki} %)
            </option>
        })

        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Rezerwacja</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Imię</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   onBlur={(e) => checkNameValidLength(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${name === "" && isNameValidLength ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole imię jest wymagane
                                </p>
                            </div>
                        </div>

                        <div className={`${!isNameValidLength ? "visible w-full" : "invisible absolute"} `}>
                            <div className={"flex items-center"}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Imię musi mieć długość do 16 znaków
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Nazwisko</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
                                   onBlur={(e) => checkLastNameValidLength(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div className={`flex items-center ${lastName === "" && isLastNameValidLength ?
                            "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole nazwisko jest wymagane
                            </p>
                        </div>

                        <div
                            className={`flex items-center ${!isLastNameValidLength ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Nazwisko musi mieć długość do 32 znaków
                            </p>
                        </div>
                    </div>

                    <div className={"w-160 flex items-center mb-6"}>
                        <label className={"w-2/6"}>Zniżka</label>
                        <div className={"flex w-4/6"}>
                            <select className={"w-1/2"} value={discountName} onChange={handleDiscountChange}>
                                {discounts}
                            </select>
                        </div>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Stacja początkowa</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={initialStation}
                                   onChange={(e) => setInitialStation(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Stacja końcowa</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={finalStation}
                                   onChange={(e) => setFinalStation(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"flex"}>
                        <button onClick={() => navigate("/reservations")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleReservation()}>
                                Usuń
                            </button>
                            <button
                                className={`${(discountName === "" || lastName === "" || name === "" ||
                                    !isNameValidLength || !isLastNameValidLength ||
                                    initialStation === "" || finalStation === "")
                                    ? "cursor-not-allowed bg-slate-200 border-stone-100" : "cursor-pointer"}`}
                                onClick={() => updateSingleReservation()}>
                                Zapisz zmiany
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditReservations
