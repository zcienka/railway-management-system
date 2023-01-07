import React, {useState} from "react"
import {ReactComponent as MenuBar} from "../icons/menuBar.svg"
import {Link} from "react-router-dom"

const Menu = () => {
    const [showMenu, setShowMenu] = useState(false)


    return <div className={`${showMenu ? "lg:w-64" : "lg:w-20"} h-screen py-6 invisible lg:visible`}>
        <div className={"rounded-r-3xl lg:p-4 pt-4 border border-stone-200 bg-white h-full"}>
            <div className={"lg:w-12"}>
                <MenuBar className={"text-sm cursor-pointer"} onClick={() => setShowMenu(!showMenu)}/>
            </div>
            <ul className={`${showMenu ? 'visible' : 'invisible absolute'}`}>
                <Link to={"/discounts"}>
                    <li className={"p-2 border-b cursor-pointer"}>
                        Zniżki
                    </li>
                </Link>
                <Link to={"/locomotive"}>
                    <li className={"p-2 border-b cursor-pointer"}>
                        Lokomotywy
                    </li>
                </Link>
                <Link to={"/rail-connection"}>
                    <li className={"p-2 border-b cursor-pointer"}>
                        Linie przejazdu
                    </li>
                </Link>
                <Link to={"/railroad-cars"}>
                    <li className={"p-2 border-b cursor-pointer"}>
                        Wagony
                    </li>
                </Link>
                <Link to={"/railroad-cars-in-the-train"}>
                    <li className={"p-2 border-b cursor-pointer"}>
                        Wagony w pociągu
                    </li>
                </Link>
                <li className={"p-2 border-b cursor-pointer"}>
                    <Link to={"/reservations"}>Rezerwacje</Link>
                </li>
                <Link to={"/stations"}>
                    <li className={"p-2 border-b cursor-pointer"}>Stacje</li>
                </Link>
                <Link to={"/train"}>
                    <li className={"p-2 border-b cursor-pointer"}>Pociągi</li>
                </Link>
                <Link to={"/train-rides"}>
                    <li className={"p-2 border-b cursor-pointer"}>
                        Przejazdy
                    </li>
                </Link>
                <Link to={"/train-stops"}>
                    <li className={"p-2 border-b cursor-pointer"}>Przystanki</li>
                </Link>
                <li className={"p-2 border-b cursor-pointer"}><Link to={"/workers"}>Pracownicy</Link></li>
            </ul>
        </div>
    </div>
}


export default Menu