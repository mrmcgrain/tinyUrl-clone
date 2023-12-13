// import './App.css';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useData } from "../hooks/context-hook.js";
// import Login from "../comps/Login"
// import Register from '../comps/Register';
// import RegGenerator from "../comps/RegGenerator"
import Header from "./Header"
import Body from "./Body"


function DashBoard() {

  /// Destructure from useContext Hook
  const {
    // data,
    url,
    handleUrl,
    // handleSetData,
    // handleSetMessage,
    // message,
    handleError,
    // error,
    // loggedIn,
    urlMessage,
    // handleDisplayedPage,
    // displayedPage
  } = useData()


  const { short } = useParams()

  // let params = useParams()

  let nav = useNavigate()

  useEffect(() => {

    console.log("useEffect - params change")

    axios({
      method: "POST",
      url: "http://localhost:8080/url",
      data: { short: short }
    })

      .then(res => res.data.ogUrl ? handleUrl(res.data.ogUrl) : handleError(res.data.msg))

      .catch(err => console.log("err", err))

  }, [short])

  useEffect(() => {

    if (url) {
console.log("url redirect hit")
      // window.open(url)
      window.location.replace(url)
      // window.location.href(url)

      nav('/')
    }
// // Simulate a mouse click:
// window.location.href = "http://www.w3schools.com";

// // Simulate an HTTP redirect:
// window.location.replace("http://www.w3schools.com");

  }, [url])


  // const handleChange = (e) => {
  //   handleSetData(e.target.name, e.target.value)

  // }


  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   axios({
  //     method: 'POST',
  //     url: "http://localhost:8080/api/create",
  //     data: data
  //   })
  //     .then(res => handleSetMessage(res.data))
  //   // console.log("submit", res.data) )
  // }



  return (
    <div className="Dashboard">
      {console.log("urlMessage", urlMessage)}
      {/* {console.log("url", url)}
      {console.log("shortparam", short)}
      {console.log("err", error)}
      {console.log("handleDisplayedPage", displayedPage)} */}

      <div><Header /></div>


      <div>

        <Body />

      </div>




    </div>
  );
}

export default DashBoard;
