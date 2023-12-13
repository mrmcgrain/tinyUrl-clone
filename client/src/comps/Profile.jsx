import { useData } from "../hooks/context-hook.js"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from "../hooks/useAuth.js"
import CreateUrl from "../comps/CreateUrl"

const Profile = () => {

    useAuth()
    const { loggedIn, urlMessage, handleDeleteURL } = useData()
    const [creations, setCreations] = useState([])


    useEffect(() => {
        // console.log("useEffrect-LoggedIm", loggedIn)
        axios({
            method: 'POST',
            url: "http://localhost:8080/api/search",
            data: loggedIn
        })
            // .then(res => console.log(res.data))
            .then(res => setCreations(res.data))

    }, [urlMessage, loggedIn])


    //     const handleDeleteRecord = (e) => {
    // console.log("delete hit...")
    //  // search for short URL and delete it from DB

    //     }


    return (


        <div id='Profile' style={{ width: "800px" }}>
            {console.log("creations", creations)}
            {console.log("loggedIn", loggedIn)}
            {console.log("urlMsg", urlMessage)}

            {/* <br /> */}
            <div
            // style={{ marginTop: "20px" }}
            >
                <CreateUrl />

            </div>

            <div>
                <div>
            
                    <h3> Profile </h3>
                    <p>UserName: {loggedIn.username}</p>
                    <p>Created: {loggedIn.created}</p>
                </div>
                <div>
                    <h2>History</h2>
                </div>


            </div>



            {creations.length
                ?
                (
                    creations.map((item, i) => {
                        return (
                            <div >
                                <table key={item._id} >
                                    <thead>

                                        <tr>
                                            <th colSpan="2">Original URL
                                            <button id={item._id} onClick={(e) => handleDeleteURL(e)}  >delete entry</button>
                                            <p> PageViews : {item.pageViews}</p>
                                            </th>


                                        </tr>
                                        <tr >
                                            <td colSpan="2">{item.ogUrl}</td>
                                        </tr>

                                        <tr>
                                            <th>Short URL</th>
                                            <th>Created on:</th>

                                        </tr>

                                        <tr>
                                            <td> {item.shortUrl}</td>
                                            <td> {item.created} </td>
                                        </tr>
                                        <tr>
                                            <th>Visitors</th>
                                            <th>Visited On</th>
                                        </tr>

                                        {item.logs.map((obj, i) => {
                                            return (
                                                <>
                                                    <tr key={i}>
                                                        <td>
                                                            {obj.visitor}
                                                        </td>
                                                        <td>{obj.accessed}</td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </thead>
                                </table>

                                <br />


                            </div>
                        )
                    })


                )
                :
                (null)
            }

        </div>
    )
};

export default Profile
