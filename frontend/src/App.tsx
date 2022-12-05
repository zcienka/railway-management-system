import React from "react"
import Menu from "./components/Menu"
import Home from "./pages/Home"
import {Route, BrowserRouter, Routes} from "react-router-dom"

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
