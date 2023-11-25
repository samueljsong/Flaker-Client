import '../style/CreateGroupModal.css'

//dependencies
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'

import close from "../assets/close.png"

export const CreateGroupModal = (props) => {

    const navigate = useNavigate();

    const onCreateGroupClickHandler = () => {
        navigate('/calendar')
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
                    <input type="text" className='cgm-input'/>
                </div>
                <motion.div className='cgm-create'
                onClick={onCreateGroupClickHandler}
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