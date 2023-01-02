import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {useCreateLocomotiveMutation} from "../../services/locomotivesApi"
import {Locomotive} from "../../types"
import {useNavigate} from "react-router-dom"
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const CreateLocomotive = () => {
    const navigate = useNavigate()

    const [technicalResearch, setTechnicalResearch] = useState<string>("")
    const [technicalResearchInput, setTechnicalResearchInput] = useState<boolean>(true)
    const [isTechnicalResearchValid, setIsTechnicalResearchValid] = useState<boolean>(true)

    const [locomotiveName, setLocomotiveName] = useState<string>("")
    const [locomotiveInput, setLocomotiveNameInput] = useState<boolean>(true)
    const [isNameValidLength, setIsNameValidLength] = useState<boolean>(true)

    const [createLocomotive, {
        error: createLocomotiveError,
        isError: isCreateLocomotiveError,
        isSuccess: isCreateLocomotiveSuccess
    }] = useCreateLocomotiveMutation()

    const createSingleLocomotive = async () => {
        if (technicalResearch === "" || locomotiveName === "" || !isTechnicalResearchValid || !isNameValidLength) {
            setTechnicalResearchInput(false)
            setLocomotiveNameInput(false)
        } else {
            const singleLocomotive: Locomotive = {
                databadaniatechnicznego: new Date(technicalResearch),
                nazwa: locomotiveName,
            }
            await createLocomotive(singleLocomotive)
        }
    }

    useEffect(() => {
        if (isCreateLocomotiveSuccess) {
            navigate("/locomotive")
        }
    }, [isCreateLocomotiveSuccess, navigate])

    const checkNameValidLength = (userInput: string) => {
        if (userInput.length > 32) {
            setIsNameValidLength(false)
        } else {
            setIsNameValidLength(true)
        }
    }

    const checkDate = (userInput: string) => {
        const userDate = new Date(userInput)
        const todayDate = new Date()

        if (userDate > todayDate) {
            setIsTechnicalResearchValid(true)
        } else {
            setIsTechnicalResearchValid(false)
        }
    }

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Dodawanie lokomotywy</p>
            </div>
            <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Data badania technicznego</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               type={"date"}
                               value={technicalResearch}
                               onChange={(e) => {
                                   setTechnicalResearch(e.target.value)
                                   setTechnicalResearchInput(false)
                               }}
                               onBlur={(e) => checkDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${technicalResearch === "" && !technicalResearchInput && isTechnicalResearchValid ? "visible w-full"
                            : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole data badania technicznego jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isTechnicalResearchValid ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Data nie może być przeszła
                        </p>
                    </div>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Nazwa</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={locomotiveName}
                               onChange={(e) => {
                                   setLocomotiveName(e.target.value)
                                   setLocomotiveNameInput(false)
                               }}
                               onBlur={(e) => checkNameValidLength(e.target.value)}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                    <div
                        className={`${locomotiveName === "" && !locomotiveInput && isNameValidLength ? "visible w-full"
                            : "invisible absolute"}`}>
                        <div className={`flex items-center`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole nazwa jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isNameValidLength ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Nazwa lokomotywy musi mieć długość do 32 znaków
                        </p>
                    </div>
                </div>

                <div className={"flex mt-8"}>
                    <button onClick={() => navigate('/locomotive')}>Anuluj</button>
                    <div className={"flex justify-end w-full"}>
                        <button
                            className={"cursor-pointer"}
                            onClick={() => createSingleLocomotive()}>
                            Dodaj
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CreateLocomotive
