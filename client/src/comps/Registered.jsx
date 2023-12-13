import Login from "./Login"
import useAuth from "../hooks/useAuth.js"




const Registered = () => {

useAuth()

    return (

        <div id='Registered'>
            <div className="center flex-col">
                <p>Congradulations!! Please login to begin creating custom URLS and tracking your friends!</p>
                <Login />
            </div>
        </div>
    )
};

export default Registered
