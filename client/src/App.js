import './App.css';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useData } from "./hooks/context-hook.js";
import Login from "./comps/Login"
import Register from './comps/Register';
// import RegGenerator from "./comps/RegGenerator"
import Dashboard from "./views/DashBoard"


function App() {

  /// Destructure from useContext Hook
  // const {
  //   data,
  //   url,
  //   handleUrl,
  //   handleSetData,
  //   handleSetMessage,
  //   message,
  //   handleError,
  //   error,
  //   loggedIn
  // } = useData()


  // const { short } = useParams()

  // let params = useParams()

  // let nav = useNavigate()

  // useEffect(() => {

  //   console.log("useEffect - params change")

  //   axios({
  //     method: "POST",
  //     url: "http://localhost:8080/url",
  //     data: { short: short }
  //   })

  //     .then(res => res.data.ogUrl ? handleUrl(res.data.ogUrl) : handleError(res.data.msg))

  //     .catch(err => console.log("err", err))

  // }, [])

  // useEffect(() => {

  //   if (url) {

  //     window.open(url)
  //   }

  // }, [url])


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
    <div className="App">

      {/* {console.log("loggedIn", loggedIn)} */}
      {/* <form method="post">

        <input
          placeholder="long url"
          name="ogUrl"
          onChange={(e) => handleChange(e)}
          value={data.ogUrl || ""}
        >

        </input>

        <input
          placeholder="short url"
          name="shortUrl"
          onChange={(e) => handleChange(e)}
          value={data.shortUrl || ""}
        >

        </input>

        <input type="submit"
          onClick={(e) => handleSubmit(e)}
        >
        </input>
      </form>

      <div>
        {!error || !short ? null : <p>{error} {short}</p>}

        {message.msg ? <p>{`${message.msg}`} </p>

          : null}

        {message.success ?

          <p>{`Successfully created a TinyUrl @ ${message.success.shortUrl} to ${message.success.ogUrl}`}</p> : null
        }

      </div> */}
      <div><Dashboard /></div>


    </div>
  );
}

export default App;
