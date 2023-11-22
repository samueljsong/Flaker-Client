import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import './App.css'
import Cookies from "universal-cookie";

//Context
import { ApiContext } from './context/ApiContext';
import { CookieContext } from './context/CookieContext';
import { AuthContext } from './context/AuthContext';

//components
import { Navbar } from './components/Navbar';

//pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { StartPage } from './pages/StartPage';

function App() {
  const api = "http://localhost:3000/"
  const cookies = new Cookies();
  const location = useLocation()
  const [auth, setAuth] = useState(0);
  const [admin, setAdmin] = useState(false)

  const authenticate = async () => {
    console.log("authenticating")
    fetch(api + 'authenticate', {
        method: "POST",
        mode: "cors",
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          session: cookies.get('session')
        })
    })
        .then(res => res.json())
        .then(json => {
            if(json.success){
                setAuth(true);
                console.log("SUCCESS: User authenticated" );
            }
            if(!json.success){
                setAuth(false);
                console.log("ERROR: User not authenticated");
            }
            if(json.admin){
                setAdmin(true);
            } else {
                setAdmin(false);
            }
        })
  }

  useEffect(() => {
    authenticate();
  }, [location])

  return (
    <>
    <CookieContext.Provider value={cookies}>
      <ApiContext.Provider value={api}>
        <Navbar admin={admin} auth={auth}></Navbar>
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/start' element={<StartPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/signup' element={<SignupPage/>}></Route>
        </Routes>
      </ApiContext.Provider>
    </CookieContext.Provider>

      
    </>
  )
}

export default App
