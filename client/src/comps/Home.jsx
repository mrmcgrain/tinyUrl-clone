import { Link, Outlet } from 'react-router-dom'
import { useData } from "../hooks/context-hook.js"
import CreateUrl from './CreateUrl.jsx'

const Home = () => {

    const { handleDisplayedPage } = useData()

    return (
        <>
            <div className="center flex-col">
                <p>
                    Create A New Account Today!
            </p>
                <p>
                    Customize your short Url paths and access your visitors history
            </p>
            <div>

                <p>
                    Url's created without logging in will only  last 24hrs
            </p>
            </div>
            <div>

                <Link
                    to="/register"
                    id="register"
                    onClick={(e) => handleDisplayedPage(e)}
                    
                    >Register Today!
                        </Link>
                    </div>
                    <br />
                    <br />
                    <br />
            <div>
                <CreateUrl />
            </div>
            <br />
            <br />
     
                <div>

                    {/* <p>Login in to customize your short Url and view access visitor history </p> */}
                    < br />

                </div>
                <br />
                <br />
     
                <br />
                <div>
                    <p>             Join the legion
  </p>
                </div>

            </div>
        </>
    )
};

export default Home
