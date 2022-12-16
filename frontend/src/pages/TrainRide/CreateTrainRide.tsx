import React, {useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {useNavigate} from "react-router-dom"
import {useCreateTrainRideMutation} from "../../services/trainRideApi"
import {TrainRide} from "../../types"

const CreateTrainRide = () => {
    const navigate = useNavigate()

    const [departureDate, setDepartureDate] = useState<string>("")
    const [departureDateInput, setDepartureDateInput] = useState<boolean>(true)

    const [arrivalDate, setArrivalDate] = useState<string>("")
    const [arrivalDateInput, setArrivalDateInput] = useState<boolean>(true)

    const [conductorId, setConductorId] = useState<string>("")
    const [conductorIdInput, setConductorIdInput] = useState<boolean>(true)

    const [driverId, setDriverId] = useState<string>("")
    const [driverIdInput, setDriverIdInput] = useState<boolean>(true)

    const [railConnectionId, setRailConnectionId] = useState<string>("")
    const [railConnectionIdInput, setRailConnectionIdInput] = useState<boolean>(true)

    const [trainId, setTrainId] = useState<string>("")
    const [trainIdInput, setTrainIdInput] = useState<boolean>(true)

    const [createTrainRide] = useCreateTrainRideMutation()

    const createSingleTrainRide = async () => {
        const singleTrainRide: TrainRide = {
            dataodjazdu: new Date(departureDate),
            dataprzyjazdu: new Date(arrivalDate),
            idkonduktora: parseInt(conductorId),
            idmaszynisty: parseInt(driverId),
            idliniiprzejazdu: parseInt(railConnectionId),
            idpociagu: parseInt(trainId),
        }
        await createTrainRide(singleTrainRide)
        navigate("train-rides")
    }

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Dodawanie przejazdu</p>
            </div>
            <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Data odjazdu</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               type={"datetime-local"}
                               value={departureDate}
                               onChange={(e) => {
                                   setDepartureDate(e.target.value)
                                   setDepartureDateInput(false)
                               }}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Data przyjazdu</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               type={"datetime-local"}
                               value={arrivalDate}
                               onChange={(e) => {
                                   setArrivalDate(e.target.value)
                                   setArrivalDateInput(false)
                               }}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Id konduktora</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={conductorId}
                               onChange={(e) => {
                                   setConductorId(e.target.value)
                                   setConductorIdInput(false)
                               }}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Id maszynisty</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={driverId}
                               onChange={(e) => {
                                   setDriverId(e.target.value)
                                   setDriverIdInput(false)
                               }}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Id linii przejazdu</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={railConnectionId}
                               onChange={(e) => {
                                   setRailConnectionId(e.target.value)
                                   setRailConnectionIdInput(false)
                               }}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Id pociągu</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={trainId}
                               onChange={(e) => {
                                   setTrainId(e.target.value)
                                   setTrainIdInput(false)
                               }}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                </div>

                <div className={"flex mt-8"}>
                    <button onClick={() => navigate('train-rides')}>Anuluj</button>
                    <div className={"flex justify-end w-full"}>
                        <button
                            className={"cursor-pointer"}
                            onClick={() => createSingleTrainRide()}>
                            Dodaj
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CreateTrainRide
