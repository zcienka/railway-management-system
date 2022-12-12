import React from "react"
import Loading from "../../components/Loading";

const CreateTrainPassage = () => {
    if ("xd" !== undefined) {
        return <></>
    } else {
        return <Loading/>
    }
}

export default CreateTrainPassage
