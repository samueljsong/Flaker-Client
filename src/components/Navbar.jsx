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
import { useContext } from 'react'

//Context
import { ApiContext } from '../context/ApiContext';

export const Navbar = () => {
    const navigate = useNavigate();

    return(
    
        <motion.div className="navbar-container">
            <div className="navbar-left">
                <span className="navbar-spaceing"></span>
                <Link to={'/'} className="navbar-link">
                    <img className="navbar-logo" src={logo} alt="" />
                    <span><h2 className="navbar-title">FLAKER</h2></span>
                </Link>
                <Link to={'/start'} className="navbar-link">
                    <img className="navbar-icon" src={start} alt="" /><p className="navbar-none">Start</p>
                </Link><Link to={'/calendar'} className="navbar-link">
                    <img className="navbar-icon" src={calendar} alt="" /><p className="navbar-none">Calendars</p>
                </Link>
                
            </div>

            <div className="navbar-right">
                
                    <div className="navbar-link" onClick={() => logout()}>
                    <img className="navbar-icon" src={logoutimg} alt="" />
                    <p className="navbar-none">Logout</p>
                    </div>
                    <div className="navbar-profile">
                    </div>
                <span className="navbar-spacing"></span>
            </div>
        </motion.div>
    )
}