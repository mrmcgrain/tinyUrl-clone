import React from 'react'
import CreateUrl from './CreateUrl'
import { useData } from "../hooks/context-hook.js";
import { useNavigate } from 'react-router-dom'

const Authed = () => {

    const { loggedIn, handleLogOut } = useData()

   const handleLogOutLocal = (e) => {
       handleLogOut(e)
       nav('/')
   }



const nav = useNavigate()

    return (
        <div id='LoggedIn'>
            {/* {console.log("loggedIn", loggedIn)} */}

            <div className="flex">

                <div className="flex flex-center">
                    <button>    </button>
                </div>


                <div className="flex border">
                    <p> Welcome back {loggedIn.username}</p>
                </div>

                <div className="flex border" style={{ width: "60px" }}>
                    <button
                        onClick={(e) =>  handleLogOutLocal(e)}
                        
                        
                    >Logout</button>
                </div>

            </div>

        </div>
    )
};

export default Authed
