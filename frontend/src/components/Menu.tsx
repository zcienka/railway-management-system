import React, {useState} from "react"
import {ReactComponent as MenuBar} from "../icons/menuBar.svg"

const Menu = () => {
    const [showMenu, setShowMenu] = useState(false)
    //<div className={"flex align-center h-screen"}>[calc(100vh-6rem)]
    return <div className={`${showMenu ? "w-64" : "w-20"} h-screen py-6`}>
        <div className={"rounded-r-3xl p-4 border border-stone-200  bg-white h-full"}>
            <div className={"w-12"}>
                <MenuBar className={"text-sm cursor-pointer"} onClick={() => setShowMenu(!showMenu)}/>
            </div>
        </div>
    </div>
}


export default Menu