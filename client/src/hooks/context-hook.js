import React, { createContext, useState, useContext } from "react"
import axios from 'axios'

////IMAGES 



const MyContext = createContext()

export const useData = () => useContext(MyContext)


export function MyProvider({ children }) {

// const nav = useNavigate()

    const [data, setData] = useState({
    })

    // const [ user, setUser ] 

    const [url, setUrl] = useState(null)

     /////////////////    Ssytem message.. "Registered"   ////////////////
    const [message, setMessage] = useState("")


    /////////////////    Message holding from API on url create    ////////////////
    const [urlMessage, setUrlMessage] = useState({})

    const [error, setError] = useState(null)

    const [loggedIn, setLoggedIn] = useState({})


    /////////////////   Current Display Page    ////////////////
    //to correspond with routes and conditionaly render
    const [displayedPage, setDisplayedPage] = useState("")

    const handleDisplayedPage = (e, input) => {
        setDisplayedPage(e.target.id)
    }

    //// New user registration

    // const [register, setRegister] = useState({
    //     username: "",
    //     firstName: "",
    //     lastName: "",
    //     password: "",
    //     admin: false
    // })

    /// Handlers to update context State

    const handleUrl = (input) => {
        setUrl(input)
        console.log("setUrl", url)
    }

    const handleSetData = (name, value) => {
        setData(prev => ({
            ...prev,
            [name]: value

        }))
    }


    /// url create message handler
    const handleSetUrlMessage = (input) => {
        setUrlMessage(input)
    }

    const handleSetMessage = (input) => {
        setMessage(input)
    }

    const handleError = (input) => {
        setError(input)
    }


    //////////////////////    Logout    ////////////////////

    const handleLogOut = (e) => {
        setLoggedIn("")
        setMessage("")
        
    }

    //////////////////////    Handles URL Delete    ////////////////////

    const handleDeleteURL = (e, input) => {
        console.log("delete", e.target.id)
        axios({
            method: "POST",
            url: "http://localhost:8080/api/delete",
            data: { id: e.target.id }

        })
            .then(res => setUrlMessage(res.data.deleted))

    }

    //////////////////////    Handles URL Crate    ////////////////////

    const handleSubmit = (e, input) => {
        e.preventDefault()

        axios({
            method: 'POST',
            url: "http://localhost:8080/api/create",
            data: input
        })
            .then(res => {
                setUrlMessage(res.data)
                console.log("del-res", res)
            })
        // console.log("submit", res.data) )
    }

    // const handleUserRegister = (name, value) => {
    //     setRegister(prev => ({
    //         ...prev,
    //         [name]: value
    //     }))
    // }

    // const handleRegSubmit =()=> {
    //     // verify all fields are  valid and username not taken.
    // }

    //////  Form Validators /////


    // const validName = (input) => {
    //     if (input.length > 2 && input.length < 20) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    // const validUserName = (input) => {
    //     if (input.length > 2 && input.length < 20) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    // const validPassword = (input) => {
    //     if (input.length > 2 && input.length < 20) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }




    return (

        <MyContext.Provider
            value={{
                setUrl,
                data,
                url,
                handleUrl,
                handleSetData,
                handleSetMessage,
                message,
                handleError,
                error,
                setLoggedIn,
                loggedIn,
                handleSubmit,
                handleLogOut,
                urlMessage,
                handleSetUrlMessage,
                handleDeleteURL,
                displayedPage,
                handleDisplayedPage,
                setMessage
                // validName,
                // validUserName,
                // validPassword


            }}
        >
            {children}


        </MyContext.Provider>


    )




}

