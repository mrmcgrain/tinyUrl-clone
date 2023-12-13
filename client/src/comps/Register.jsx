import axios from 'axios'
import { useData } from "../hooks/context-hook"
import React, { useState } from 'react'
import { useNavigate, redirect } from 'react-router-dom'

const Register = () => {

    const nav = useNavigate()

    const { setMessage } = useData()

    const [register, setRegister] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        confirm: "",
        admin: false
    })
    // const { handleUserRegister } = useData()
    const [regMessage, setRegMessage] = useState("")

    const handleUserRegister = (e) => {
        console.log("register onChange")

        setRegister(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleRegSubmit = (e) => {
        console.log("register submit")
        e.preventDefault()

        axios({
            method: 'POST',
            url: "http://localhost:8080/api/register",
            data: register
        })
            .then(res => res.username ? setRegMessage(prev => ({ ...prev, message: "Successful Registration" })) : setRegMessage(res.data.message))
            .then(setMessage("Registered"))
            .then(redirect => nav("/registered"))
    }


    const validName = (input) => {
        if (input.length > 2 && input.length < 20) {
            return true
        } else {
            return false
        }
    }
    ///////////  TRYING to verify it does not  exsist PRIOR to submiting.....
    const validUserName = (input) => {
        console.log("validuser ?", input)

        axios({
            method: 'POST',
            url: "http://localhost:8080/api/register/user",
            data: register
        })
            .then(res =>

                setRegMessage(res.data.message)
            )
            .catch(err => console.log("err", err))

        if (regMessage === "valid username") {
            return true

        } else {
            return false
        }

    }

    const validPassword = (input) => {
        if (input.length > 2 && input.length < 20) {
            return true
        } else {
            return false
        }
    }


    return (

        <div id='Register' className="">

            {console.log("register", register)}
            {console.log("regMsg", regMessage)}
            <div className="center">
                <p> Register today...... joooin uuuuussss</p>
                </div>

            <div id="Form" className="flex flex-row">
                <form >
                    <div id="left-form">
                        <div>
                            <input

                                style={{ width: '200px', border: validName(register.firstName) || register.firstName === "" ? null : "red solid 1px" }}
                                required
                                name="firstName"
                                onChange={(e) => handleUserRegister(e)}
                                placeholder="First Name"
                                value={register.firstName}
                            ></input>
                        </div>
<br />
                        <div>
                            <input
                                style={{ width: '200px', border: validName(register.lastName) || register.lastName === "" ? null : "red solid 1px" }}
                                required
                                name="lastName"
                                onChange={(e) => handleUserRegister(e)}
                                placeholder="Last Name"
                                value={register.lastName}
                            ></input>
                        </div>
                        <br />

                        <div>
                            <input
                                style={{ width: '200px', border: validUserName(register.username) || register.username === "" ? null : "red solid 1px" }}
                                required
                                name="username"
                                onChange={(e) => handleUserRegister(e)}
                                placeholder="User Name"
                                value={register.username}
                            ></input>

                        </div>
                        <br />

                        <div>
                            <input
                                style={{ width: '200px', border: validPassword(register.password) || register.password === "" ? null : "red solid 1px" }}
                                required
                                name="password"
                                onChange={(e) => handleUserRegister(e)}
                                placeholder="Password"
                                value={register.password}
                            ></input>
                        </div>
                        <br />

                        <div>
                            <input
                                style={{
                                    width: '200px',
                                    border: register.confirm == register.password || register.confirm === ""
                                        ? null : "red solid 1px"
                                }}
                                required
                                name="confirm"
                                onChange={(e) => handleUserRegister(e)}
                                placeholder="Confirm Password"
                                value={register.confirm}
                            ></input>

                        </div>
                        <br />

                        <div>

                            <input type="submit"
                                onClick={(e) => handleRegSubmit(e)}
                                disabled={!validName(register.firstName) || !validName(register.lastName) || !validPassword(register.password) || register.password !== register.confirm ? true : false}
                                onClick={(e) => handleRegSubmit(e)}
                                style={{ width: "200px" }}
                                type="submit" >

                            </input>

                        </div>
                    </div>


                    <div id="right-form" className="center">
                        <p>
                            {register.confirm !== register.password ? <p> Passwords do not match </p> : null}
                            {regMessage == "User name already exsists" ? <p className="center">"User name already exsists"</p> : <p></p>}</p>
                    </div>
                </form>
            </div>
        </div>


    )
};


export default Register
