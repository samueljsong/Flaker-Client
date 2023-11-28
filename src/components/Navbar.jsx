//styles
import "../style/Navbar.css"
import "../style/Animations.css"

//image
import logo from '../assets/sf-icon.png'
import start from '../assets/plus.png'
import calendar from '../assets/calendar.png'
import logoutimg from '../assets/logout.png'

//dependencies
import { Link, useNavigate} from "react-router-dom"
import { motion } from "framer-motion"
import { useContext, useEffect, useState } from 'react'

//Context
import { ApiContext } from '../context/ApiContext';
import { CookieContext } from "../context/CookieContext"
import { setCardPicture } from "../util/picture"

export const Navbar = (props) => {
    const navigate = useNavigate();
    const api = useContext(ApiContext);
    const cookies = useContext(CookieContext);
    const [profile, setProfile] = useState();

    useEffect(() => {
        fetch(api + 'getUserID', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                session: cookies.get('session')
            })
        })
            .then(res => res.json())
            .then(json => {
                const pic = setCardPicture(json.user_pic)
                setProfile(pic)
            })
    }, [])

    const onProfileClickHandler = () => {
        navigate('/profile')
    }

    const logout = async () => {
        console.log("logging out")
        fetch(api + 'logout', {
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
                    cookies.remove('session');
                    console.log("SUCCESS: User logged out" );
                    navigate('/')
                }
                if(!json.success){
                    console.log("ERROR: User failed to log out");
                }
            })
    }
    

    return(
    
        <motion.div className="navbar-container">
            <div className="navbar-left">
                <span className="navbar-spaceing"></span>
                <Link to={'/'} className="navbar-link">
                    <img className="navbar-logo" src={logo} alt="" />
                    <span><h2 className="navbar-title">FLAKER</h2></span>
                </Link>
                {
                    props.auth ? <>
                            <Link to={'/start'} className="navbar-link">
                                <img className="navbar-icon" src={start} alt="" /><p className="navbar-none">Start</p>
                            </Link><Link to={'/calendarGroup'} className="navbar-link">
                                <img className="navbar-icon" src={calendar} alt="" /><p className="navbar-none">Calendars</p>
                            </Link></> : <></>
                }
                
                
            </div>

            <div className="navbar-right">
                    {
                        props.auth ? <>
                                <div className="navbar-link" onClick={() => logout()}>
                                    <img className="navbar-icon" src={logoutimg} alt="" />
                                    <p className="navbar-none">Logout</p>
                                </div>
                                <img src={profile} className="navbar-profile"
                                onClick={onProfileClickHandler}/>
                                </> : <></>
                    }
                    
                <span className="navbar-spacing"></span>
            </div>
        </motion.div>
    )
}