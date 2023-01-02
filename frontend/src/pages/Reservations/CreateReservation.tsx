import React, {ChangeEvent, useEffect, useState} from "react"
import Menu from "../../components/Menu"
import {useCreateReservationMutation} from "../../services/reservationsApi"
import {useNavigate} from "react-router-dom"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg"
import {Discount, Reservation} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useGetDiscountsQuery} from "../../services/discountsApi"
import Loading from "../../components/Loading"


const CreateReservation = () => {
    const [createReservation, {
        error: createReservationError,
        isError: isCreateReservationError,
        isSuccess: isCreateReservationSuccess
    }] = useCreateReservationMutation()
    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [trainRideId, setTrainRideId] = useState<string>("")
    const [discountName, setDiscountName] = useState<string>("default")
    const [firstLastNameInput, setFirstLastNameInput] = useState<boolean>(true)
    const [firstNameInput, setFirstNameInput] = useState<boolean>(true)
    const [firstDiscountNameInput, setFirstDiscountNameInput] = useState<boolean>(true)
    const [firstTrainRideIdInput, setFirstTrainRideIdInput] = useState<boolean>(true)

    const [isLastNameValidLength, setIsLastNameValidLength] = useState<boolean>(true)
    const [isNameValidLength, setIsNameValidLength] = useState<boolean>(true)
    const [isTrainRideInteger, setIsTrainRideInteger] = useState<boolean>(true)

    const createSingleReservation = async () => {
        if ((discountName === "default" || lastName === "" || name === "" || trainRideId === "" ||
            !isNameValidLength || !isLastNameValidLength || !isTrainRideInteger)) {
            setFirstLastNameInput(false)
            setFirstDiscountNameInput(false)
            setFirstNameInput(false)
            setFirstTrainRideIdInput(false)
        } else {
            const reservation: Reservation = {
                idprzejazdu: parseInt(trainRideId),
                imie: name,
                nazwisko: lastName,
                znizka: discountName,
            }
            await createReservation(reservation)
        }
    }

    useEffect(() => {
        if (isCreateReservationSuccess) {
            navigate("/reservations")
        }
    }, [isCreateReservationSuccess, navigate])

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

    const checkTrainRideIdInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsTrainRideInteger(() => false)
        } else {
            setIsTrainRideInteger(() => true)
        }
    }

    const {data: getDiscountData} = useGetDiscountsQuery(null)

    const handleDiscountChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setDiscountName(event.target.value)
        setFirstDiscountNameInput(false)
    }

    if (getDiscountData !== undefined) {
        const discounts = getDiscountData.map((discount: Discount) => {
            return <option key={uuidv4()} value={discount.nazwaznizki}>
                {discount.nazwaznizki} ({discount.procentznizki} %)
            </option>
        })

        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Składanie rezerwacji</p>
                </div>

                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Imię</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   onChange={(e) => {
                                       setName(e.target.value)
                                       setFirstNameInput(false)
                                   }}
                                   onBlur={(e) => checkNameValidLength(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${name === "" && isNameValidLength && !firstNameInput ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole imię jest wymagane
                                </p>
                            </div>
                        </div>

                        <div className={`${!isNameValidLength ? "visible w-full" : "invisible absolute"}`}>
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
                                   onChange={(e) => {
                                       setLastName(e.target.value)
                                       setFirstLastNameInput(false)
                                   }}
                                   onBlur={(e) => checkLastNameValidLength(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex text-red-900 text-xs"}>
                        <div
                            className={`flex items-center ${lastName === "" && isLastNameValidLength && !firstLastNameInput ?
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

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Zniżka</label>
                        <div className={"flex w-4/6"}>
                            <select className={"w-1/2"} value={discountName} onChange={handleDiscountChange}>
                                <option value="default">
                                    Wybierz zniżkę
                                </option>
                                {discounts}
                            </select>
                        </div>
                    </div>

                    <div className={"h-6 flex text-red-900 text-xs"}>
                        <div className={`flex items-center ${discountName === "default" && !firstDiscountNameInput ?
                            "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole zniżka jest wymagane
                            </p>
                        </div>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Id przejazdu</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={trainRideId}
                                   onChange={(e) => {
                                       setTrainRideId(e.target.value)
                                       setFirstTrainRideIdInput(false)
                                   }}
                                   onBlur={(e) => checkTrainRideIdInteger(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex text-red-900 text-xs"}>
                        <div className={`flex items-center ${!isTrainRideInteger ?
                            "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Id musi być liczbą
                            </p>
                        </div>
                        <div
                            className={`flex items-center ${!firstTrainRideIdInput && trainRideId === "" && isTrainRideInteger ?
                                "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole id przejazdu jest wymagane
                            </p>
                        </div>
                        <div className={`flex items-center ${isCreateReservationError ?
                            "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                {// @ts-ignore
                                    createReservationError !== undefined ? createReservationError!.data : ""}
                            </p>
                        </div>
                    </div>

                    <div className={"flex mt-8"}>
                        <button onClick={() => navigate('/reservations')}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button
                                className={"cursor-pointer"}
                                onClick={() => createSingleReservation()}>
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

export default CreateReservation
