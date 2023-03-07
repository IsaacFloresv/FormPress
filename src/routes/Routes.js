import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/login/login.js'
import CompFormPrese from '../pages/formPres/CompoForm.js'
import Dashboard from '../pages/dashboard/dashboard.js'


import { ProtectedRoute } from "../componentes/ProtectedRouter.jsx";

import Cookies from 'universal-cookie'
const cookies = new Cookies()
var user = cookies.get('token')

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route replace path="/" element={<Login />} />
                <Route element={<ProtectedRoute user={user} />} >
                    <Route replace path="/formpres" element={<CompFormPrese />} />
                    <Route replace path="/dashboard" element={<Dashboard />} />
                    <Route replace path="*" element={<Navigate replace to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router