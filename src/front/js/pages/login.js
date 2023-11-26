import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("") 
const navigate = useNavigate()

const handleEmail = (ev) => {
    setEmail(ev.target.value)
}

const handlePassword = (ev) => {
    setPassword(ev.target.value)
}

const handleLogin = (ev) => {
    ev.preventDefault()

    fetch(process.env.BACKEND_URL + "/api/login", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
    .then(res => res.json())
    .then(data => {
        sessionStorage.setItem("token", data.token)
        navigate("/private")
    })
    .catch(err => console.log(err))

   
}

    return(
        <div className="container col-lg-6 needs-validation">
            <h1>Log In</h1>
            <form className="mt-3" method="POST" onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="EmailForm">E-mail Adress</label>
                        <input type="email" className="form-control" id="EmailForm" placeholder="yahaira@example.com" onInput={handleEmail} required></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="PasswordForm">Password</label>
                        <input type="password" className="form-control" id="PasswordForm" onInput={handlePassword} required></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button> 
            </form>
        </div>
    )
}