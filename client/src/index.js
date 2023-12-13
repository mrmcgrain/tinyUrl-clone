import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MyProvider } from "./hooks/context-hook.js"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  // NavLink
} from "react-router-dom"
import Register from './comps/Register';
import Registered from './comps/Registered';
// import Login from "./comps/Login"
import Form from "./Form"
import Admin from "./comps/Admin"
import Profile from "./comps/Profile"

// import Redirect from './Redirect';

const root = ReactDOM.createRoot(document.getElementById('root'));

// const { url } = useData()

root.render(
  // <React.StrictMode>
  <>
    <MyProvider>

      <Router>
        {/* <App /> */}
        <Routes>

          <Route path="/" element={<App />} >


            <Route path="/register" element={<Register />} />
            <Route path="/registered" element={<Registered />} />
            <Route path="/profile" element={<Profile />} />


          </Route>

          <Route path="/:short"
            // element={() => window.open(url) } 
            // element={<Redirect/>}
            element={<App />}
          />

          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/form" element={<Form />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

      </Router>
    </MyProvider>
    {/* </React.StrictMode> */}
 </>
);

