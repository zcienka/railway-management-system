import React, {useState} from "react"
import Menu from "../../components/Menu"
import {ReactComponent as MagnifyingGlass} from "../../icons/magnifyingGlass.svg";
import {useNavigate} from "react-router-dom";

const WorkersTable = (props: any[]) => {
    const [searchValue, setSearchValue] = useState<string>("")
    const navigate = useNavigate()

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-2 py-2 lg:px-10 lg:py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Pracownicy</p>
            </div>

            <div className={"bg-white h-[calc(100vh-6rem)] max-h-[calc(100vh-9rem)] " +
                "w-full rounded-xl lg:p-8 p-4 border border-stone-200 overflow-auto"}>
                <div className={"flex mb-4 w-full"}>
                    <div className={"flex items-center relative w-96"}>
                        <input type="text"
                               placeholder="Szukaj pracownika"
                               className={"pl-10 border-none w-96"}
                               onChange={(e) => setSearchValue(e.target.value)}/>

                        <div className={"absolute w-8 h-8 top-2 pl-2"}>
                            <MagnifyingGlass/>
                        </div>
                    </div>
                    <div className={"flex justify-end w-full"}>
                        <button onClick={() => navigate("/add-worker")}>
                            Dodaj pracownika
                        </button>
                    </div>
                </div>
                <table className={"w-full border-spacing-0 border-separate overflow-y-auto"}>
                    <tbody>
                        <tr className={"rounded-tl-xl text-slate-600"}>
                            <th className={"rounded-tl-xl  bg-slate-100 py-2 border-y border-l border-stone-200"}>Imię</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Nazwisko</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Płaca</th>
                            <th className={"bg-slate-100 py-2 border-y border-stone-200"}>Zawód</th>
                            <th className={"rounded-tr-xl bg-slate-100 w-20 border-y border-r border-stone-200"}></th>
                        </tr>
                        {Object.values(props)}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}

export default WorkersTable
