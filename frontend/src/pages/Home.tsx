import React, {useEffect, useState} from "react"
import Menu from "../components/Menu";

const Home = () => {


    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Rezerwacja</p>
            </div>

            <div className={"bg-white h-[calc(100%-6rem)] w-full rounded-xl p-8"}>
                <table className={"w-full"}>
                    <tr className={""}>
                        <th className={"rounded-tl-xl bg-slate-200 py-2"}>id</th>
                        <th className={"bg-slate-200 py-2"}>imie</th>
                        <th className={"bg-slate-200 py-2"}>nazwisko</th>
                        <th className={"rounded-tr-xl bg-slate-200 py-2"}>cena</th>
                    </tr>
                </table>
            </div>
        </div>

    </div>
}

export default Home
