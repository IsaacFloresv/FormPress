import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/login/login.js'
import CompFormPrese from '../pages/formPres/CompoForm.js'
import Dashboard from '../pages/dashboard/dashboard.js'

import Cookies from 'universal-cookie'

const cookies = new Cookies()

function Router() {
const verify = () =>{
    if(cookies.get('token')){

    }
}

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/formpres" element={<CompFormPrese />}/>
                <Route exact path="/dashboard" element={<Dashboard />}/>
                <Route exact path="*" element={<Navigate to="/" />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router