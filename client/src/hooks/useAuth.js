import { useNavigate } from 'react-router-dom';

import { useData } from "./context-hook.js";

const useAuth = (link = "") => {


    const { loggedIn } = useData()
    const nav = useNavigate()

    if(!loggedIn.username){
        return nav("/" + link)
    } else {
        return
    }
}
export default  useAuth