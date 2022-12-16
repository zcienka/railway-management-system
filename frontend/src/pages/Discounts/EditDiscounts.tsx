import React, {ChangeEvent, useEffect, useState} from "react"
import Loading from "../../components/Loading"
import {useNavigate, useParams} from "react-router-dom";
import {useGetSingleDiscountQuery} from "../../services/discountsApi";
import {Discount} from "../../types";
import {useDeleteDiscountMutation, useUpdateDiscountMutation} from "../../services/discountsApi";
import Menu from "../../components/Menu";

const EditDiscounts = () => {
    const [discountName, setDiscountName] = useState<string>("")
    const [discountNameInput, setDiscountNameInput] = useState<boolean>(true)

    const [discountPercentage, setDiscountPercentage] = useState<string>("")
    const [discountPercentageInput, setDiscountPercentageInput] = useState<boolean>(true)

    const [identityDocument, setIdentityDocument] = useState<string>("")
    const [identityDocumentInput, setIdentityDocumentInput] = useState<boolean>(true)

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
        // updateDiscount()
        // navigate("/discounts")
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
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
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
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
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
                            />
                        </div>
                    </div>

                    <div className={"h-6 flex w-full text-red-900 text-xs"}>
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
