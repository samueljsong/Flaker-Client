import '../style/FriendCard.css'

//icons
import plus from '../assets/plus.png'
import close from '../assets/close.png'

import { motion } from "framer-motion"
import { useEffect, useState, useContext } from "react"

//Context
import { ApiContext } from '../context/ApiContext'
import { CookieContext } from '../context/CookieContext';

import { setCardPicture } from '../util/picture'

export const FriendCard = (props) => {
    const api = useContext(ApiContext);
    const cookies = useContext(CookieContext);
    const [inGroup, setInGroup] = useState(false);

    const add = <><img src={plus} className='friendcard-icon' alt="" />
    add</>

    const remove = <><img src={close} className='friendcard-icon' alt="" />
    remove</>

    const onButtonClickHandler = () => {
        console.log(inGroup)
        if(!inGroup){
            props.addToGroup(props.userid);
            setInGroup(!inGroup);
            return
        } 
        if(inGroup){
            props.removeFromGroup(props.userid);
            setInGroup(!inGroup);
            return
        }
    }

    const [profilePic, setProfilePic] = useState();
    useEffect(() => {
        const pic = setCardPicture(props.user_pic)
        setProfilePic(pic)
    }, [])


    return (
        <div className='friendcard-container'>
            <img src={profilePic} className='friendcard-profilepic'/>
            <div className='friendcard-username'>
                @{props.username}
            </div>
            <div className='friendcard-button-container'>
                <motion.div className='friendcard-button'
                    whileHover={{
                        backgroundColor: "#74634c"
                    }}
                    whileTap={{
                        scale:0.95
                    }}
                    onClick={onButtonClickHandler}>
                        {
                            inGroup ? remove : add
                        }
                </motion.div>
            </div>
        </div>
    )
}