import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")

    const navigate = useNavigate()
    
    const [isValid, setIsValid] = useState(false)
    
    const handleEmail = (ev) => {
        setEmail(ev.target.value)
    }

    const handlePassword = (ev) => {
        setPassword(ev.target.value)
    }

    const handleConfirmedPassword = (ev) => {
        setConfirmedPassword(ev.target.value)
    }

    useEffect(() => {

        if(password === confirmedPassword){ 
            setIsValid(true) 
        } else { 
            setIsValid(false) 
        }
    }, [password, confirmedPassword])

    const handleSubmit = (ev) => {
        ev.preventDefault()
        
        fetch(process.env.BACKEND_URL + "/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
                })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
        navigate("/login")
    }

    return (
    <div className="container col-lg-6 needs-validation">
        <h1>Sign Up</h1>
            <form className="mt-3" method="POST" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="EmailForm">E-mail Adress</label>
                    <input type="email" className="form-control" id="EmailForm" placeholder="JohnDoe@example.com" onInput={handleEmail} required></input>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="PasswordForm">Password</label>
                    <input type="password" className="form-control" id="PasswordForm" onInput={handlePassword} minLength={8} required></input>  
                    {password.length != 0 ? (<></>): (<div className="alert-danger rounded text-danger"><p className="mt-3 p-2">Password required</p></div>)}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="PasswordConfirm">Confirm Password</label>
                    <input type="password" className="form-control" id="PasswordConfirm" minLength={8} onInput={handleConfirmedPassword} required></input>
                    {isValid === true ? (<></>) : (<div className="alert-danger rounded text-danger"><p className="mt-3 p-2">Passwords don't match</p></div>)}
                    
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}