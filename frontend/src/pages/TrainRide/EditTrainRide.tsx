import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {TrainRide} from "../../types"
import Menu from "../../components/Menu"
import {
    useDeleteTrainRideMutation,
    useGetSingleTrainRideQuery,
    useUpdateTrainRideMutation
} from "../../services/trainRideApi"

const EditTrainRide = () => {
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

    const navigate = useNavigate()
    const {idParam} = useParams()
    const {
        data: getSingleTrainRideData,
        isSuccess: isGetSingleTrainRideSuccess
    } = useGetSingleTrainRideQuery(idParam, {
        skip: idParam === undefined
    })

    const [deleteTrainRide] = useDeleteTrainRideMutation()
    const [updateTrainRide] = useUpdateTrainRideMutation()

    const deleteSingleTrainRide = async () => {
        await deleteTrainRide(idParam)
        navigate("/train-rides")
    }

    const updateSingleTrainRide = async () => {
        // updateTrainRide()
        // navigate("/train")
    }
    useEffect(() => {
        if (isGetSingleTrainRideSuccess) {
            // console.log(getSingleTrainRideData[0].dataprzyjazdu.toString().split('T')[0])
            setDepartureDate(getSingleTrainRideData[0].dataodjazdu.toString())
            setArrivalDate(getSingleTrainRideData[0].dataprzyjazdu.toString())
            setConductorId(getSingleTrainRideData[0].idkonduktora.toString())
            setDriverId(getSingleTrainRideData[0].idmaszynisty.toString())
            setRailConnectionId(getSingleTrainRideData[0].idliniiprzejazdu.toString())
            setTrainId(getSingleTrainRideData[0].idpociagu.toString())
        }
    }, [getSingleTrainRideData, isGetSingleTrainRideSuccess])

    if (getSingleTrainRideData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj przejazd</p>
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

                    <div className={"flex"}>
                        <button onClick={() => navigate("/train-rides")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleTrainRide()}>
                                Usuń
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleTrainRide()}>
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

export default EditTrainRide
