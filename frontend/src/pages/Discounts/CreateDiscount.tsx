import React, {useEffect, useState} from "react"
import Menu from "../../components/Menu"
import {Discount} from "../../types";
import {useCreateDiscountMutation} from "../../services/discountsApi";
import {useNavigate} from "react-router-dom";
import {ReactComponent as ExclamationMark} from "../../icons/exclamationMark.svg";

const CreateDiscount = () => {
    const navigate = useNavigate()

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

    const [createDiscount, {
        error: createDiscountError,
        isError: isCreateDiscountError,
        isSuccess: isCreateDiscountSuccess
    }] = useCreateDiscountMutation()

    const createSingleDiscount = async () => {
        if (discountName === "" || discountPercentage === "" || identityDocument === "" ||
            !isDiscountPercentageValidLength || !isDiscountPercentageInteger ||
            !isDiscountNameValidLength || !isDocumentValidLength) {
            setDiscountNameInput(false)
            setDiscountPercentageInput(false)
            setIdentityDocumentInput(false)
        } else {
            const singleDiscount: Discount = {
                nazwaznizki: discountName,
                procentznizki: parseInt(discountPercentage),
                dokumentpotwierdzajacy: identityDocument
            }
            await createDiscount(singleDiscount)
        }
    }

    useEffect(() => {
        if (isCreateDiscountSuccess) {
            navigate("/discounts")
        }
    }, [isCreateDiscountSuccess, navigate])

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

    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Dodawanie zni??ki</p>
            </div>
            <div className={"bg-white w-full rounded-xl p-8 px-16 border border-stone-200"}>
                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Nazwa zni??ki</label>
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
                                Pole nazwa zni??ki jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isDiscountNameValidLength ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Nazwa zni??ki musi mie?? d??ugo???? do 32 znak??w
                        </p>
                    </div>
                    <div className={`flex items-center ${isCreateDiscountError ?
                        "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            {// @ts-ignore
                                createDiscountError !== undefined ? createDiscountError!.data : ""}
                        </p>
                    </div>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Procent zni??ki</label>
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
                                Pole procent zni??ki jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isDiscountPercentageInteger ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Pole procent zni??ki musi by?? liczb??
                        </p>
                    </div>

                    <div
                        className={`flex items-center ${!isDiscountPercentageValidLength ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Procent zni??ki musi by?? mi??dzy 0 a 100
                        </p>
                    </div>
                </div>

                <div className={"w-160 flex items-center"}>
                    <label className={"w-2/6"}>Dokument potwierdzaj??cy</label>
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
                                Pole dokument potwierdzaj??cy jest wymagane
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${!isDocumentValidLength ? "visible w-full" : "invisible absolute"}`}>
                        <ExclamationMark className={"h-5 mr-2"}/>
                        <p className={"w-full"}>
                            Dokument musi mie?? d??ugo???? do 32 znak??w
                        </p>
                    </div>
                </div>

                <div className={"flex mt-8"}>
                    <button onClick={() => navigate('/discounts')}>Anuluj</button>
                    <div className={"flex justify-end w-full"}>
                        <button
                            className={"cursor-pointer"}
                            onClick={() => createSingleDiscount()}>
                            Dodaj
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CreateDiscount
