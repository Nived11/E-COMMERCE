import React from "react";
import AdminLogin from "./Components/Adminlogin";
import ForgetPassword from "./Components/Forgetpassword";
import Resetpassword from "./Components/Resetpassword";
import AdminHome from "./Components/AdminHome";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import { BrowserRouter, Routes,Route } from "react-router-dom";

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AdminLogin/>}/>
                <Route path="/forgetpassword" element={<ForgetPassword/>}/>
                <Route path="/resetpassword" element={<Resetpassword/>}/>
                <Route path="/adminhome" element={<AdminHome/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/login" element={<Login/>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default App;