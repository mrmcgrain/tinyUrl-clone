import Login from "../comps/Login"
import Authed from "../comps/Authed"
import { useData } from "../hooks/context-hook"
// import CreateUrl from "../comps/CreateUrl"

const Header = () => {


    const { loggedIn } = useData()



    return (


        <div id='Header'  s>
            <div className="border flex" style={{height: "100px" }}>
                <div id="leftHeader" className="flex border" style={{ width: "50%" }}>
                    <div>LOGO HERE</div>
                    {/* <div className="border flex-col margin" style={{ width: "200px" }}>
                    <p> Welcome to Short Urls</p>
                </div> */}
                    <div className="border flex-col margin flex-center">
                        {/* <CreateUrl /> */}
                    </div>
                </div>
                <div id="centerHeader"></div>

                <div id="rightHeader" className="flex flex-end border" style={{ width: "50%" }}>


                    <div className=" flex-col  margin flex ">

                        {loggedIn.username ?
                            (
                                <Authed />
                            )
                            :
                            (
                                <Login />
                            )
                        }

                    </div>
                </div>
            </div>


        </div>
    )
};

export default Header
