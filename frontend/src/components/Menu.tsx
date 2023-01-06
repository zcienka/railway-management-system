import React, {useState} from "react"
import {ReactComponent as MenuBar} from "../icons/menuBar.svg"
import {Link} from "react-router-dom";

const Menu = () => {
    const [showMenu, setShowMenu] = useState(false)


    return <div className={`${showMenu ? "lg:w-64" : "lg:w-20"} h-screen py-6 invisible lg:visible`}>
        <div className={"rounded-r-3xl lg:p-4 pt-4 border border-stone-200 bg-white h-full"}>
            <div className={"lg:w-12"}>
                <MenuBar className={"text-sm cursor-pointer"} onClick={() => setShowMenu(!showMenu)}/>
            </div>
            <ul className={`${showMenu ? 'visible' : 'invisible absolute'}`}>
                <li className={"p-2 border-b cursor-pointer"}><Link to={"/discounts"}>Zniżki</Link></li>
                <li className={"p-2 border-b cursor-pointer"}><Link to={"/locomotive"}>Lokomotywy</Link></li>
                <li className={"p-2 border-b cursor-pointer"}><Link to={"/rail-connection"}>Linie przejazdu</Link></li>
                <li className={"p-2 border-b cursor-pointer"}><Link to={"/railroad-cars"}>Wagony</Link></li>
                <li className={"p-2 border-b cursor-pointer"}><Link to={"/railroad-cars-in-the-train"}>Wagony w pociągu</Link></li>
                <li className={"p-2 border-b cursor-pointer"} >
                    <Link to={"/reservations"}>Rezerwacje</Link>
                </li>
                <li className={"p-2 border-b cursor-pointer"}><Link to={"/stations"}>Stacje</Link></li>
                <li className={"p-2 border-b cursor-pointer"}><Link to={"/train"}>Pociągi</Link></li>
                <li className={"p-2 border-b cursor-pointer"}><Link to={"/train-rides"}>Przejazdy</Link></li>
                <li className={"p-2 border-b cursor-pointer"}><Link to={"/train-stops"}>Przystanki</Link></li>
                <li className={"p-2 border-b cursor-pointer"}><Link to={"/workers"}>Pracownicy</Link></li>
            </ul>
        </div>
    </div>
}


export default Menu