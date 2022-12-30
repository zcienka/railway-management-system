import React, {useState} from "react"
import Loading from "../../components/Loading"
import Menu from "../../components/Menu"
import {Discount} from "../../types";
import {useCreateDiscountMutation} from "../../services/discountsApi";
import {useNavigate} from "react-router-dom";

const CreateDiscount = () => {
    const navigate = useNavigate()

    const [discountName, setDiscountName] = useState<string>("")
    const [discountInput, setDiscountNameInput] = useState<boolean>(true)

    const [discountPercentage, setDiscountPercentage] = useState<string>("")
    const [discountPercentageInput, setDiscountPercentageInput] = useState<boolean>(true)

    const [identityDocument, setIdentityDocument] = useState<string>("")
    const [identityDocumentInput, setIdentityDocumentInput] = useState<boolean>(true)
    const [createDiscount] = useCreateDiscountMutation()

    const createSingleDiscount = async () => {
        const singleDiscount: Discount = {
            nazwaznizki: discountName,
            procentznizki: parseInt(discountPercentage),
            dokumentpotwierdzajacy: identityDocument
        }
        await createDiscount(singleDiscount)
        navigate("/discounts")
    }

    const updateSingleCarriage = async () => {
        // updateCarriage()
        // navigate("/carriages")
    }



    return <div className={"flex"}>
        <Menu/>
        <div className={"px-16 py-6 w-full"}>
            <div className={"h-24 w-full flex items-center"}>
                <p className={"text-4xl"}>Dodawanie zniżki</p>
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
