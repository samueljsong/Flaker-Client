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
            <div className='cgm-modal-container'>
                <div className='cgm-title'>
                    <h2>Create a Group</h2>
                    <img src={close} className='cgm-close-icon' alt="" 
                    onClick={props.closeModal}/>
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

            </div>
        </div>
    )
}