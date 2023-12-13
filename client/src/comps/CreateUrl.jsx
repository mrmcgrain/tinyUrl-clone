import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useData } from "../hooks/context-hook.js";
import { nanoid } from 'nanoid'
// import axios from 'axios'



const CreateUrl = () => {
    const { short } = useParams()

    const [urlData, setUrlData] = useState({
        ogUrl: "",
        shortUrl: ""
    })


    const {
        // data,
        // url,
        // handleUrl,
        // handleSetData,
        // handleSetMessage,
        // message,
        // handleError,
        error,
        loggedIn,
        handleSubmit,
        // handleSetUrlMessage,
        urlMessage

    } = useData()


    useEffect(() => {

        if (urlMessage.error) {
            setUrlData(prev => ({
                ...prev,
                shortUrl: ""
            }))
        } else
            if (urlMessage.success) {
                setUrlData(prev => ({
                    ...prev,
                    ogUrl: "",
                    shortUrl: ""
                }))
            }

    }, [urlMessage])


    // const [message, setMessage] = useState("")
    // const handleClearInputs = () => {
    //     if (urlMessage.error) {
    //         setUrlData(prev => ({
    //             ...prev,
    //             shortUrl: ""
    //         }))
    //     } else 
    //            if (urlMessage.success) {
    //         setUrlData(prev => ({
    //             ...prev,
    //             ogUrl: "",
    //             shortUrl: ""
    //         }))
    //     }
    // }

    //   / Destructure from useContext Hook



    // const handleSetUrlData = (name, value) => {

    //     setUrlData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }))
    // }



    const handleChange = (e) => {

        if (loggedIn.id) {


            setUrlData(prev => ({
                ...prev,
                [e.target.name]: e.target.value,
                userId: loggedIn.id
            }))

        } else {
            // userId " temp " will store urls when no user logged in... right now the id is hard coded so if the DB gets dropped must update this
            setUrlData(prev => ({
                ...prev,
                ogUrl: e.target.value,
                shortUrl: nanoid(8),
                // userId: "64baadd8e84b5727b447f242"
                // userId: "temp"

            }))
        }
    }

    const isValid = (input) => {
        // console.log("isValid/input", input)

        if (input.length > 2) {
            return true
        } else {
            return false
        }
    }


    return (

        <div id='CreateUrl' className="inputForm flex flex-col center">
            {/* {console.log("creatURL-MSG", urlMessage)} */}
            <div className="center flex-col">
                <form>
                    <div>

                        <input
                            style={{ width: "400px" }}
                            placeholder="long url"
                            name="ogUrl"
                            required
                            onChange={(e) => handleChange(e)}
                            value={urlData.ogUrl || ""}
                        >

                        </input>
                    </div>
                    <br />
                    <div className="center">

                        <input
                            placeholder="short url"
                            name="shortUrl"
                            required
                            onChange={(e) => handleChange(e)}
                            value={urlData.shortUrl || ""}
                        // value={loggedIn.id ?  (urlData.shortUrl || "") : (null)}
                        >

                        </input>
                    </div>
                    <br />
                    <div className="center">

                        <input type="submit"
                            disabled={!isValid(urlData.shortUrl) || !isValid(urlData.ogUrl) ? true : false}
                            onClick={(e) => {
                                handleSubmit(e, urlData)
                                // handleClearInputs()
                            }}
                        >
                        </input>
                    </div>
                </form>

                <div className="center"
                    style={{ height: "80px" }}
                >
                    {!error || !short
                        ?
                        (
                            null
                        )
                        :
                        (
                            <div>
                                <p>{error} {short}</p>
                            </div>
                        )
                    }

                    {urlMessage.error
                        ?
                        (

                            <div>
                                <p>{`${urlMessage.error}`} </p>
                            </div>
                        )
                        :
                        (
                            null
                        )
                    }

                    {urlMessage.success
                        ? (

                            <div className="center flex-col">
                                <p>{`Successfully created a TinyUrl @ ${urlMessage.success.shortUrl} `}</p>
                                <p>{`${urlMessage.success.ogUrl}`}</p>
                            </div>
                        )
                        :
                        (
                            null
                        )
                    }

                </div>


            </div>

        </div>
    )
};

export default CreateUrl
