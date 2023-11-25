import '../style/AddEventModal.css'

//dependencies
import { motion } from "framer-motion"

import close from '../assets/close.png'

export const AddEventModal = (props) => {

    return(
        <motion.div className='aem-container'>
            <motion.div className='aem-modal'
            initial={{
                y:20,
                opacity:0
            }}
            animate={{
                y:0,
                opacity:1
            }}
            transition={{
                duration: 0.5
            }}
            >
                <div className='aem-title'>
                    <h1 className='aem-title-info'>Add an event</h1>
                    <motion.img
                    onTap={props.closeHandler} 
                    whileHover={{
                        scale:1.1,
                    }}
                    whileTap={{
                        scale:0.9
                    }} 
                    src={close} className='aem-close-icon' alt="" />
                </div>
                <div className='aem-input-container'>
                    <input type="text" className='aem-input' placeholder='Event Title'/>
                </div>
                <div className='aem-info'>
                    <div className='aem-start-date'>

                    </div>
                    <div className='aem-end-date'>

                    </div>
                    <div className='aem-color'>

                    </div>
                </div>
                <div className='aem-details'>

                </div>
                <motion.div className='aem-create'
                whileHover={{
                    backgroundColor: "#1087ff",
                    y: -5
                }}
                whileTap={{
                    scale:0.95
                }}>
                    <p>Create Event</p>
                </motion.div>
            </motion.div> 
        </motion.div>
    )
}