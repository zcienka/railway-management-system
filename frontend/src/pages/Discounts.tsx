import React, {ChangeEvent, useState} from "react";

const Discounts = () => {
    const [identityDocument, setIdentityDocument] = useState<string>("")

    const handleIdentityDocumentChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setIdentityDocument(event.target.value)
    }
    return <>
        <div className={"w-160 flex items-center"}>
        <label className={"w-2/6"}>Dokument potwierdzający</label>
        <div className={"flex w-4/6"}>
            <select className={"w-1/2"} value={identityDocument} onChange={handleIdentityDocumentChange}>
                <option value={"Dowód osobisty"}>
                    Dowód osobisty
                </option>
                <option value={"Prawo jazdy"}>
                    Prawo jazdy
                </option>
                <option value={"Paszport"}>
                    Paszport
                </option>
                <option value={"Legitymacja szkolna"}>
                    Legitymacja szkolna
                </option>
                <option value={"Legitymacja studencka"}>
                    Legitymacja studencka
                </option>
            </select>
        </div>
    </div></>
}