import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom";
import {useGetSingleDiscountQuery} from "../../services/discountsApi";
import {Discount} from "../../types";
import {useDeleteDiscountMutation, useUpdateDiscountMutation} from "../../services/discountsApi";
import Menu from "../../components/Menu";
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const EditDiscounts = () => {
    const [discountName, setDiscountName] = useState<string>("")
    const [discountInput, setDiscountNameInput] = useState<boolean>(true)
    const [isDiscountNameValidLength, setIsDiscountNameValidLength] = useState<boolean>(true)

    const [discountPercentage, setDiscountPercentage] = useState<string>("")
    const [discountPercentageInput, setDiscountPercentageInput] = useState<boolean>(true)
    const [isDiscountPercentageInteger, setIsDiscountPercentageInteger] = useState<boolean>(true)
    const [isDiscountPercentageValidLength, setIsDiscountPercentageValidLength] = useState<boolean>(true)

    const [identityDocument, setIdentityDocument] = useState<string>("")
    const [identityDocumentInput, setIdentityDocumentInput] = useState<boolean>(true)
    const [isDocumentValidLength, setIsDocumentValidLength] = useState<boolean>(true)

    const navigate = useNavigate()
    const {id} = useParams()

    const {
        data: getSingleDiscountData,
        isSuccess: isGetSingleDiscountSuccess
    } = useGetSingleDiscountQuery(id, {
        skip: id === undefined
    })

    const deleteSingleDiscount = async () => {
        await deleteDiscount(id)
        navigate("/discounts")
    }

    const updateSingleDiscount = async () => {
        const singleDiscount: Discount = {
            nazwaznizki: discountName,
            procentznizki: parseInt(discountPercentage),
            dokumentpotwierdzajacy: identityDocument
        }
        await updateDiscount(singleDiscount)
        navigate("/discounts")
    }

    const checkDiscountPercentageInteger = (userInput: string) => {
        if (isNaN(Number(userInput))) {
            setIsDiscountPercentageInteger(() => false)
            setIsDiscountPercentageValidLength(() => true)
        } else {
            setIsDiscountPercentageInteger(() => true)

            if (100 < parseInt(userInput) || 0 > parseInt(userInput)) {
                setIsDiscountPercentageValidLength(() => false)
            } else {
                setIsDiscountPercentageValidLength(() => true)
            }
        }
    }

    const checkDiscountNameValidLength = (userInput: string) => {
        if (userInput.length > 32) {
            setIsDiscountNameValidLength(false)
        } else {
            setIsDiscountNameValidLength(true)
        }
    }

    const checkDocumentValidLength = (userInput: string) => {
        if (userInput.length > 32) {
            setIsDocumentValidLength(false)
        } else {
            setIsDocumentValidLength(true)
        }
    }

    const [deleteDiscount] = useDeleteDiscountMutation()
    const [updateDiscount] = useUpdateDiscountMutation()

    useEffect(() => {
        if (isGetSingleDiscountSuccess) {
            setDiscountPercentage(getSingleDiscountData[0].procentznizki.toString())
            setDiscountName(getSingleDiscountData[0].nazwaznizki)
            setIdentityDocument(getSingleDiscountData[0].dokumentpotwierdzajacy)
        }
    }, [getSingleDiscountData, isGetSingleDiscountSuccess])

    if (getSingleDiscountData !== undefined) {
        return <div className={"flex"}>
            <Menu/>
            <div className={"px-16 py-6 w-full"}>
                <div className={"h-24 w-full flex items-center"}>
                    <p className={"text-4xl"}>Edytuj zniżkę</p>
                </div>
                <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Nazwa zniżki</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={discountName}
                                   onChange={(e) => {
                                       setDiscountName(e.target.value)
                                       setDiscountNameInput(false)
                                   }}
                                   onBlur={(e) => checkDiscountNameValidLength(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${discountName === "" && !discountInput && isDiscountNameValidLength ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole nazwa zniżki jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isDiscountNameValidLength ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Nazwa zniżki musi mieć długość do 32 znaków
                            </p>
                        </div>
                        {/*<div className={`flex items-center ${isCreateDiscountError ?*/}
                        {/*    "visible w-full" : "invisible absolute"}`}>*/}
                        {/*    <ExclamationMark className={"h-5 mr-2"}/>*/}
                        {/*    <p className={"w-full"}>*/}
                        {/*        {// @ts-ignore*/}
                        {/*            createDiscountError !== undefined ? createDiscountError!.data : ""}*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Procent zniżki</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={discountPercentage}
                                   onChange={(e) => {
                                       setDiscountPercentage(e.target.value)
                                       setDiscountPercentageInput(false)
                                   }}
                                   onBlur={(e) => {
                                       checkDiscountPercentageInteger(e.target.value)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${discountPercentage === "" && !discountPercentageInput && isDiscountPercentageInteger &&
                            isDiscountPercentageValidLength ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole procent zniżki jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isDiscountPercentageInteger ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Pole procent zniżki musi być liczbą
                            </p>
                        </div>

                        <div
                            className={`flex items-center ${!isDiscountPercentageValidLength ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Procent zniżki musi być między 0 a 100
                            </p>
                        </div>
                    </div>

                    <div className={"w-160 flex items-center"}>
                        <label className={"w-2/6"}>Dokument potwierdzający</label>
                        <div className={"flex w-4/6"}>
                            <input className={"w-1/2"}
                                   value={identityDocument}
                                   onChange={(e) => {
                                       setIdentityDocument(e.target.value)
                                       setIdentityDocumentInput(false)
                                   }}
                                   onBlur={(e) => {
                                       checkDocumentValidLength(e.target.value)
                                   }}
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
                        <div
                            className={`${identityDocument === "" && !identityDocumentInput ? "visible w-full" : "invisible absolute"}`}>
                            <div className={`flex items-center`}>
                                <ExclamationMark className={"h-5 mr-2"}/>
                                <p className={"w-full"}>
                                    Pole dokument potwierdzający jest wymagane
                                </p>
                            </div>
                        </div>
                        <div
                            className={`flex items-center ${!isDocumentValidLength ? "visible w-full" : "invisible absolute"}`}>
                            <ExclamationMark className={"h-5 mr-2"}/>
                            <p className={"w-full"}>
                                Dokument musi mieć długość do 32 znaków
                            </p>
                        </div>
                    </div>

                    <div className={"flex"}>
                        <button onClick={() => navigate("/discounts")}>Anuluj</button>
                        <div className={"flex justify-end w-full"}>
                            <button className={"mr-2 bg-red-600 border-red-700 text-white"}
                                    onClick={() => deleteSingleDiscount()}>
                                Usuń
                            </button>
                            <button
                                className={`${"cursor-pointer"}`}
                                onClick={() => updateSingleDiscount()}>
                                Zapisz zmiany
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    } else {
        return <Loading/>
    }
}

export default EditDiscounts
