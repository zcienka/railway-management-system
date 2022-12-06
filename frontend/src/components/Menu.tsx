import React, {useEffect, useState} from "react"
import {ReactComponent as MenuBar} from "../icons/menuBar.svg"

const Menu = () => {
    const [showMenu, setShowMenu] = useState(false)

    return <div className={ `${showMenu ? "w-64" : "w-20"} h-screen bg-white rounded-r-3xl p-4`}>
        <div className={"w-12"}>
            <MenuBar className={"text-sm cursor-pointer"} onClick={() => setShowMenu(!showMenu)}/>
        </div>
    </div>
}


export default Menu