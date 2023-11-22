import '../style/UserCard.css'

import plus from '../assets/plus.png'
import { motion } from "framer-motion"

export const UserCard = (props) => {

    return (
        <div className='usercard-container'>
            <div className='usercard-profilepic'></div>
            <div className='usercard-username'>
                @{props.username}
            </div>
            <div className='usercard-button-container'>
                <motion.div className='usercard-button'
                whileHover={{
                    backgroundColor: "#3b5d6f"
                }}
                whileTap={{
                    scale:0.95
                }}>
                    <img src={plus} className='usercard-icon' alt="" />
                    add
                </motion.div>
            </div>
        </div>
    )
}