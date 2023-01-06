import React, {useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {Discount, SearchDiscount} from "../../types"
import {v4 as uuidv4} from "uuid"
import {useFilterDiscountQuery, useGetDiscountsQuery} from "../../services/discountsApi"
import {useNavigate} from "react-router-dom";
import Menu from "../../components/Menu";
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";
import {useGetReservationsQuery} from "../../services/reservationsApi";

const initialState: SearchDiscount = {
    nazwa: "",
    procentmin: "",
    procentmax: "",
    dokument: "",
}

const Discounts = () => {
    const [searchDiscount, setSearchDiscount] = useState<SearchDiscount>(initialState)
    const [showSearchResponse, setShowSearchResponse] = useState<boolean>(false)
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

    const [discounts, setDiscounts] = useState<Discount[] | undefined>(undefined)
    const navigate = useNavigate()
    const {
        data: getFilterDiscounts,
        isSuccess: isGetFilterDiscountSuccess,
        isError: isGetFilterDiscountError,
        error: getFilterDiscountsError
    } = useFilterDiscountQuery(
        searchDiscount,
        {skip: !showSearchResponse}
    )



    const {
        data: getDiscounts,
        isFetching: isGetDiscountsFetching,
        isSuccess: isGetDiscountsSuccess,
    } = useGetDiscountsQuery(null,
        {
            refetchOnMountOrArgChange: true
        })

    useEffect(() => {
        if (isGetFilterDiscountSuccess) {
            setDiscounts(getFilterDiscounts)
            setShowSearchResponse(() => false)
        } else if (isGetDiscountsSuccess && isFirstRender) {
            setDiscounts(getDiscounts)
            setIsFirstRender(() => false)
        }
    }, [isFirstRender, getFilterDiscounts, isGetFilterDiscountSuccess,
        getDiscounts, isGetDiscountsFetching, isGetDiscountsSuccess])

    if (discounts === undefined) {
        return <Loading/>
    } else {
        const allDiscounts = Object.values(discounts).map((discount: Discount) => {
            return <tr key={uuidv4()}>
                <th className={"py-2 font-semibold border-b border-l border-stone-200"}>{discount.nazwaznizki}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{discount.procentznizki}</th>
                <th className={"py-2 font-semibold border-b border-stone-200"}>{discount.dokumentpotwierdzajacy}</th>

                <th className={"py-2 border-r border-b border-stone-200 flex align-center justify-center font-semibold"}
                    onClick={() => navigate(`/discounts/${discount.nazwaznizki}`)}>
                    <div className={"px-3 py-1 border-2 rounded-md cursor-pointer mr-2"}>Edytuj</div>
                </th>
            </tr>
        })


        return <div className={"flex"}>
            <Menu/>
            <div className={"px-2 py-2 lg:px-10 lg:py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Zniżki</p>
                </div>

                <div className={"bg-white h-[calc(100vh-6rem)] max-h-[calc(100vh-9rem)] " +
                    "w-full rounded-xl lg:p-8 p-4 border border-stone-200 overflow-auto"}>
                    <div className={"flex items-center mr-4"}>
                        <input type="text"
                               placeholder="Nazwa zniżki"
                               className={"border mb-4 mr-2"}
                               onChange={(e) => setSearchDiscount((prevState: SearchDiscount) => {
                                   return {...prevState, nazwa: e.target.value}
                               })}/>
                        <div/>
                        <div className={"flex items-center relative"}>
                            <input type="text"
                                   placeholder="Minimalny procent zniżki"
                                   className={"border mb-4 mr-2"}
                                   onChange={(e) => setSearchDiscount((prevState: SearchDiscount) => {
                                       return {...prevState, procentmin: e.target.value}
                                   })}/>
                            <input type="text"
                                   placeholder="Maksymalny procent zniżki"
                                   className={"border mb-4 mr-2"}
                                   onChange={(e) => setSearchDiscount((prevState: SearchDiscount) => {
                                       return {...prevState, procentmax: e.target.value}
                                   })}/>
                            <input type="text"
                                   placeholder="Dokument potwierdzający"
                                   className={"border mb-4 mr-2"}
                                   onChange={(e) => setSearchDiscount((prevState: SearchDiscount) => {
                                       return {...prevState, dokument: e.target.value}
                                   })}/>
                            <button className={"mb-4"} onClick={() => setShowSearchResponse(!showSearchResponse)}>
                                Szukaj
                            </button>

                            <div className={`${isGetFilterDiscountError ? "visible w-full" : "invisible absolute"} `}>
                                <div className={"w-96 mb-4 ml-2 text-red-700"}>
                                    <div className={"flex items-center w-full"}>
                                        <ExclamationMark className={"h-5 mr-2"}/>
                                        <p className={"w-full"}>

                                            {// @ts-ignore
                                                getFilterDiscountsError !== undefined ? getFilterDiscountsError!.data : ""}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"flex justify-end w-full mb-4"}>
                            <button onClick={() => navigate("/add-discount")}>
                                Dodaj zniżkę
                            </button>
                        </div>
                    </div>
                    <table className={"w-full border-spacing-0 border-separate overflow-y-auto"}>
                        <tbody>
                        <tr className={"rounded-tl-xl text-slate-600"}>
                            <th className={"w-1/4 rounded-tl-xl bg-slate-100 py-2 border-y border-l border-stone-200"}>Nazwa
                                zniżki
                            </th>
                            <th className={"w-1/4 bg-slate-100 py-2 border-y border-stone-200"}>Procent zniżki</th>
                            <th className={"w-1/4 bg-slate-100 py-2 border-y border-stone-200"}>Dokument
                                potwierdzający
                            </th>
                            <th className={"w-1/4 rounded-tr-xl bg-slate-100 w-20 border-y  border-r border-stone-200"}></th>
                        </tr>
                        {allDiscounts}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default Discounts
