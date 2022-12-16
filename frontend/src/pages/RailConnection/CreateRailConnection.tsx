import React, {useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"

const CreateRailConnection = () => {
    const [lastName, setLastName] = useState<string>("")
    const [firstLastNameInput, setFirstLastNameInput] = useState<boolean>(true)

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Dodawanie linii przejazdu</p>
            </div>
            <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Nazwa wagonu</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={lastName}
                               onChange={(e) => {
                                   setLastName(e.target.value)
                                   setFirstLastNameInput(false)
                               }}
                        />
                    </div>
                </div>

                <div className={"h-6 flex w-full text-red-900 text-xs"}>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Data badania technicznego</label>
                    <div className={"flex w-4/6"}>
                        <input className={"w-1/2"}
                               value={lastName}
                               onChange={(e) => {
                                   setLastName(e.target.value)
                                   setFirstLastNameInput(false)
                               }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CreateRailConnection
