// import CreateUrl from "../comps/CreateUrl"
import Profile from "../comps/Profile"
import { useData } from "../hooks/context-hook.js"
import { Link, Outlet, useOutlet } from 'react-router-dom'
// import Login from "../comps/Login"
import Registered from "../comps/Registered"
import Home from "../comps/Home"

const Body = () => {

    const { loggedIn, handleDisplayedPage, displayedPage, message } = useData()

    let out = useOutlet()

    return (
        <>
            <div id='Body' className="flex flex-center flex-col">

                {out ? (<Outlet />) : (<Home />)}

            </div>
        </>

    )
};

export default Body
