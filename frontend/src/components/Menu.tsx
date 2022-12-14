import React, {useState} from "react"
import {ReactComponent as MenuBar} from "../icons/menuBar.svg"

const Menu = () => {
    const [showMenu, setShowMenu] = useState(false)

    return <div className={`${showMenu ? "lg:w-64" : "lg:w-20"} h-screen py-6 invisible lg:visible`}>
        <div className={"rounded-r-3xl lg:p-4 pt-4 border border-stone-200 bg-white h-full"}>
            <div className={"lg:w-12"}>
                <MenuBar className={"text-sm cursor-pointer"} onClick={() => setShowMenu(!showMenu)}/>
            </div>
        </div>
    </div>
}


export default Menu