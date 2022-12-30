import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom"
import {useGetSingleCarriageQuery} from "../../services/carriagesApi"
import {Carriage} from "../../types"
import {useDeleteCarriageMutation, useUpdateCarriageMutation} from "../../services/carriagesApi"
import Menu from "../../components/Menu"

const EditCarriages = () => {
    const [seatsNumber, setSeatsNumber] = useState<string>("")
    const [seatsNumberInput, setSeatsNumberInput] = useState<boolean>(true)

    const [technicalResearch, setTechnicalResearch] = useState<string>("")
    const [technicalResearchInput, setTechnicalResearchInput] = useState<boolean>(true)

    const navigate = useNavigate()
    const {id} = useParams()
    const {
        data: getSingleCarriageData,
        isSuccess: isGetSingleCarriageSuccess
    } = useGetSingleCarriageQuery(id, {
        skip: id === undefined
    })

    const deleteSingleCarriage = async () => {
        await deleteCarriage(id)
        navigate("/carriages")
    }

    const updateSingleCarriage = async () => {
        if(id){
            
        }
        const singleCarriage: Carriage = {
            databadaniatechnicznego: new Date(technicalResearch),
            liczbamiejsc: parseInt(seatsNumber),
            id: parseInt(id?.toString() || "undefined")
        }
        await updateCarriage(singleCarriage)
        navigate("/carriages")
    }
    const [deleteCarriage] = useDeleteCarriageMutation()
    const [updateCarriage] = useUpdateCarriageMutation()

    useEffect(() => {
        if (isGetSingleCarriageSuccess) {
            setSeatsNumber(getSingleCarriageData[0].liczbamiejsc.toString())
            setTechnicalResearch(getSingleCarriageData[0].databadaniatechnicznego.toString().split('T')[0])
        }
    }, [getSingleCarriageData, isGetSingleCarriageSuccess])

    if (getSingleCarriageData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj wagon</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Nazwa wagonu</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={seatsNumber}
                                   onChange={(e) => {
                                       setSeatsNumber(e.target.value)
                                       setSeatsNumberInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Data badania technicznego</label>
                        <div className={"flex w-4/6"}>
                            <input type="date" className={"w-1/2"}
                                   value={technicalResearch}
                                   onChange={(e) => {
                                       setTechnicalResearch(e.target.value)
                                       setTechnicalResearchInput(false)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    </div>

                    <div className={"flex"}>
                        <button onClick={() => navigate("/carriages")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleCarriage()}>
                                Usuń
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleCarriage()}>
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

export default EditCarriages
