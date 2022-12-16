import React, {useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {useCreateLocomotiveMutation} from "../../services/locomotivesApi"
import {Locomotive} from "../../types"
import {useNavigate} from "react-router-dom"

const CreateLocomotive = () => {
    const navigate = useNavigate()

    const [technicalResearch, setTechnicalResearch] = useState<string>("")
    const [technicalResearchInput, setTechnicalResearchInput] = useState<boolean>(true)

    const [locomotiveName, setLocomotiveName] = useState<string>("")
    const [locomotiveInput, setLocomotiveNameInput] = useState<boolean>(true)

    const [createLocomotive] = useCreateLocomotiveMutation()

    const createSingleLocomotive = async () => {
        const singleLocomotive: Locomotive = {
            databadaniatechnicznego: new Date(technicalResearch),
            nazwa: locomotiveName,
        }
        await createLocomotive(singleLocomotive)
        navigate("/locomotives")
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
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
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
                        />
                    </div>
                </div>

                <div className={"flex mt-8"}>
                    <button onClick={() => navigate('/locomotives')}>Anuluj</button>
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
