import '../style/CreateGroupModal.css'

//dependencies
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'

import close from "../assets/close.png"
import { useContext, useState } from 'react'
import { ApiContext } from '../context/ApiContext'
import { CookieContext } from '../context/CookieContext'

export const CreateGroupModal = (props) => {
    const navigate = useNavigate();
    const api = useContext(ApiContext);
    const cookies = useContext(CookieContext);

    const [groupName, setGroupName] = useState("");
    const onInputChangeHandler = (e) => {
        setGroupName(e.target.value);
    }

    const onClickCreateGroup = async() => {
        fetch(api + 'group/createGroup', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                group: props.group,
                groupName: groupName,
                session: cookies.get("session")
            })
        })
            .then(res => res.json())
            .then(json => {
                navigate('/calendarGroup')
            })
    }
    
    
    return(
        <div className='cgm-container'>
            <motion.div className='cgm-modal-container'
            initial={{opacity: 0, y:20}} 
            animate={{opacity: 1, y: 0}} 
            transition={{duration: "0.5", delay: 0.25}}>
                <div className='cgm-title'>
                    <h2>Create a Group</h2>
                    <motion.img src={close} className='cgm-close-icon' alt="" 
                    onClick={props.closeModal}
                    whileHover={{
                        y:-5,
                    }}
                    whileTap={{
                        scale:0.95
                    }}/>
                </div>
                <div className='cgm-info'>
                    What would you like to name your group?
                </div>
                <div className='cgm-input-container'>
                    <input type="text" className='cgm-input' onChange={onInputChangeHandler}/>
                </div>
                <motion.div className='cgm-create'
                onClick={onClickCreateGroup}
                whileHover={{
                    y:-5,
                    backgroundColor: "#74634c"
                }}
                whileTap={{
                    scale:0.95
                }}>
                    Create Group
                </motion.div>

            </motion.div>
        </div>
    )
}