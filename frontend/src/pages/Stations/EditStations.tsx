import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {Station} from "../../types"
import {useNavigate, useParams} from "react-router-dom"
import {
    useDeleteStationMutation,
    useGetSingleStationQuery, useGetStationsQuery,
    useUpdateStationMutation
} from "../../services/stationsApi"
import Menu from "../../components/Menu"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";
import {useGetTrainStopsQuery} from "../../services/trainStopApi";
import {useGetReservationsQuery} from "../../services/reservationsApi";
import {useGetTrainRidesQuery} from "../../services/trainRideApi";
import {useGetWorkersQuery} from "../../services/workersApi";
import {useGetRailroadCarsInTheTrainQuery} from "../../services/railroadCarsInTheTrainApi";
import {useGetTrainsQuery} from "../../services/trainsApi";
import {useGetRailroadCarsQuery} from "../../services/railroadCarsApi";
import {useGetDiscountsQuery} from "../../services/discountsApi";
import {useGetRailConnectionsQuery} from "../../services/railConnectionsApi";

const EditStations = () => {
    const [name, setName] = useState<string>("")
    const [nameInput, setNameInput] = useState<boolean>(true)

    const [address, setAddress] = useState<string>("")
    const [addressInput, setAddressInput] = useState<boolean>(true)
    const {refetch: refetchReservations} = useGetReservationsQuery(null)
    const {refetch: refetchTrainRides} = useGetTrainRidesQuery(null)
    const {refetch: refetchWorkers} = useGetWorkersQuery(null)
    const {refetch: refetchRailroadCarsInTheTrain} = useGetRailroadCarsInTheTrainQuery(null)
    const {refetch: refetchTrainStop} = useGetTrainStopsQuery(null)
    const {refetch: refetchTrains} = useGetTrainsQuery(null)
    const {refetch: refetchRailroadCar} = useGetRailroadCarsQuery(null)
    const {refetch: refetchDiscounts} = useGetDiscountsQuery(null)
    const {refetch: refetchRailConnections} = useGetRailConnectionsQuery(null)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleStationData,
        isSuccess: isGetSingleStationSuccess
    } = useGetSingleStationQuery(id, {
        skip: id === undefined
    })

    const [deleteStation, {
        error: deleteStationError,
        isError: isDeleteStationError,
        isSuccess: isDeleteStationSuccess
    }] = useDeleteStationMutation()

    const [updateStation, {
        error: updateStationError,
        isError: isUpdateStationError,
        isSuccess: isUpdateStationSuccess
    }] = useUpdateStationMutation()

    const deleteSingleStation = async () => {
        await deleteStation(id)
    }

    useEffect(() => {
        if (isDeleteStationSuccess) {
            refetchReservations()
            refetchTrainRides()
            refetchWorkers()
            refetchTrainStop()
            refetchTrains()
            refetchRailroadCar()
            refetchRailConnections()
            refetchDiscounts()
            refetchRailroadCarsInTheTrain()
            navigate("/stations")
        }
    }, [isDeleteStationSuccess, navigate, refetchDiscounts, refetchRailConnections, refetchRailroadCar, refetchRailroadCarsInTheTrain, refetchReservations, refetchTrainRides, refetchTrainStop, refetchTrains, refetchWorkers])

    const updateSingleStation = async () => {
        const singleStation: Station = {
            nazwa: name,
            adres: address
        }
        await updateStation(singleStation)
    }
    useEffect(() => {
        if (isUpdateStationSuccess) {
            navigate("/stations")
        }
    }, [isUpdateStationSuccess, navigate])

    useEffect(() => {
        if (isGetSingleStationSuccess) {
            setAddress(getSingleStationData[0].adres)
            setName(getSingleStationData[0].nazwa)
        }
    }, [getSingleStationData, isGetSingleStationSuccess])

    if (getSingleStationData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj stacj??</p>
                </div>
                <div className={"bg-white w-full rounded-xl pt-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Nazwa</label>
                        <div className={"flex w-4/6"}>
                            <label className={"w-2/6"}>{name}</label>
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Adres</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={address}
                                   onChange={(e) => {
                                       setAddress(e.target.value)
                                       setAddressInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div className={`flex items-center ${isUpdateStationError ?
                            "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                {// @ts-ignore
                                    updateStationError !== undefined ? updateStationError!.data === "Adres stacji musi mie?? d??ugo???? mi??dzy 1 a 61 znak??w" : ""}
                                Adres stacji musi mie?? d??ugo???? mi??dzy 1 a 61 znak??w
                            </p>
                        </div>
                    </div>


                    <div className={"flex"}>
                        <button onClick={() => navigate("/stations")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleStation()}>
                                Usu??
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleStation()}>
                                Zapisz zmiany
                            </button>
                        </div>
                    </div>
                    <div className={"h-8 flex w-full text-red-900 text-xs justify-end"}>
                        <div
                            className={`flex items-center ${
                                // @ts-ignore
                                deleteStationError !== undefined ?
                                    "visible w-full justify-end flex" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2 flex"}/>
                            <p className={"flex justify-end"}>
                                {// @ts-ignore
                                    deleteStationError !== undefined && deleteStationError.data ? deleteStationError.data : ""}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditStations
