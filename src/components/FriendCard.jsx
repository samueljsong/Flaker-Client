import '../style/FriendCard.css'

//icons
import plus from '../assets/plus.png'
import close from '../assets/close.png'

import { motion } from "framer-motion"
import { useEffect, useState, useContext } from "react"

//Context
import { ApiContext } from '../context/ApiContext'
import { CookieContext } from '../context/CookieContext';

export const FriendCard = (props) => {
    const api = useContext(ApiContext);
    const cookies = useContext(CookieContext);

    const [statusbtn, setStatusBtn] = useState(<motion.div className='friendcard-button'
    whileHover={{
        backgroundColor: "#74634c"
    }}
    whileTap={{
        scale:0.95
    }}
    onClick={() => sendRequest()}>
        <img src={plus} className='friendcard-icon' alt="" />
        add
    </motion.div>)

    return (
        <div className='friendcard-container'>
            <div className='friendcard-profilepic'></div>
            <div className='friendcard-username'>
                @{props.username}
            </div>
            <div className='friendcard-button-container'>
                {statusbtn}
            </div>
        </div>
    )
}