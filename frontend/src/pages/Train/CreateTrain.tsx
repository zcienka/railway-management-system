import React, {useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {useNavigate} from "react-router-dom";
import {useCreateTrainMutation} from "../../services/trainsApi";
import {Train} from "../../types";

const CreateTrain = () => {
    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [nameInput, setNameInput] = useState<boolean>(true)

    const [locomotiveId, setLocomotiveId] = useState<string>("")
    const [locomotiveIdInput, setLocomotiveIdInput] = useState<boolean>(true)

    const [createTrain] = useCreateTrainMutation()

    const createSingleTrain = async () => {
        const singleTrain: Train = {
            nazwa: name,
            idlokomotywy: parseInt(locomotiveId)
        }
        await createTrain(singleTrain)
        navigate("/train")
    }

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Dodawanie pociągu</p>
            </div>
            <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Nazwa</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={name}
                               onChange={(e) => {
                                   setName(e.target.value)
                                   setNameInput(false)
                               }}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Id lokomotywy</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={locomotiveId}
                               onChange={(e) => {
                                   setLocomotiveId(e.target.value)
                                   setLocomotiveIdInput(false)
                               }}
                        />
                    </div>
                </div>

                <div className={"flex mt-8"}>
                    <button onClick={() => navigate('/train')}>Anuluj</button>
                    <div className={"flex justify-end w-full"}>
                        <button
                            className={"cursor-pointer"}
                            onClick={() => createSingleTrain()}>
                            Dodaj
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CreateTrain
