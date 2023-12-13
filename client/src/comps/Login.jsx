import React, { useState } from 'react'
import axios from 'axios'
import { useData } from "../hooks/context-hook.js";
import { useNavigate } from "react-router-dom"


const Login = () => {


    const nav = useNavigate()

    const {
        setLoggedIn,

        handleSetMessage
    } = useData()

    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const [user, setUser] = useState({
        username: "",
        password: ""
    })


    const handleUserChange = (e) => {
        setUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    /////  handle User AUTH
    const handleSubmit = (e) => {
        e.preventDefault()

        axios({
            method: 'POST',
            url: "http://localhost:8080/api/login",
            data: user
        })
            // .then(res => console.log("res", res))
            .then(res => res.data.message === "Authed" ? (setLoggedIn(res.data), handleSetMessage("LoggedIn")) : ((setError(res.data.message))))
        // console.log("res", res)
        nav("/Profile")

    }


    //Check Valid User Name
    const validUserName = (input) => {
        // console.log("validuser ?", input, loggedIn)

        axios({
            method: 'POST',
            url: "http://localhost:8080/api/userCheck",
            data: user
        })
            .then(res =>

                setMessage(res.data.message)
            )
            .catch(err => console.log("err", err))

        if (message === "Please enter your password") {
            return true

        } else {
            return false
        }

    }

    // cosnt validPassword = (input) => {

    //     axios({})
    // }

    return (

        <div id='Login' className="inputForm">
            {/* {console.log(user)}
            {console.log("msg", message)}
            {console.log("loggedIn?", loggedIn)}
            {console.log("err", error)} */}
            <form>
                <input
                    style={{ width: '200px', border: validUserName(user.username) || user.username === "" ? null : "red solid 1px" }}
                    required
                    name="username"
                    value={user.username}
                    onChange={(e) => handleUserChange(e)}
                    placeholder="User Name"
                >
                </input>

                <input
                    required

                    name="password"
                    value={user.password}
                    onChange={(e) => handleUserChange(e)}
                    placeholder="Password"
                >
                </input>


                <input
                    disabled={!validUserName(user.username) || !user.password}
                    type="submit"
                    value="Login"
                    onClick={(e) => handleSubmit(e)}
                >
                </input>

            </form>

            <div >
                {validUserName(user.username) || user.username === ""
                    ?
                    (null)
                    :
                    (<p>{message}</p>)}
                {error ? <p>{error}</p> : null}

            </div>


        </div>
    )
};

export default Login
