import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
const [userInformation, setUserInformation] = useState({})
const navigate = useNavigate()

useEffect(() => {
    if(!sessionStorage.getItem("token")){
        navigate("/login")
    }

    fetch(process.env.BACKEND_URL + "/api/user", {
        headers: {
            "Authorization" : "Bearer " + sessionStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => setUserInformation(data))
    .catch(err => console.log(err))
}, [])

    return(
        <div className="container">
            <h1>Private</h1>
            {userInformation ? (<p>Hello! {userInformation.email}</p>) : <p>Loading...</p>}
        </div>
    )
}