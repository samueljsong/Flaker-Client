//styles
import '../style/StartPage.css'
import '../style/Animations.css'

//images
import artist from '../assets/artist-icons.png'
import clock from '../assets/clock.png'
import calendar from '../assets/calendar.png'
import group from '../assets/group.png'

//dependencies
import { motion } from "framer-motion"
import { useNavigate } from 'react-router'

export const StartPage = () => {
    
    const navigate = useNavigate();

    return(
        <>
            <div className='dp-container'>
            
                <motion.div className='dp-artist-container'>
                    <div className='dp-artist-dropdown'></div>
                    <motion.div className='dp-artist-info'
                        initial={{opacity: 0}} 
                        animate={{opacity: 1}} 
                        transition={{duration: "0.5", delay: 0}}
                        whileHover={
                            {
                                y:-20,
                                color: "#ffffff", 
                                transition: {duration: 0.3},
                            }
                        }>
                        <img className='dp-icons' src={artist} alt="" />
                        <h1 className='dp-title'>Friends</h1>
                        <p>Add your friends to start</p>
                    </motion.div>
                </motion.div>
                <div className='dp-genre-container'>
                    <div className='dp-genre-dropdown'></div>
                    <motion.div className='dp-genre-info'
                        initial={{opacity: 0}} 
                        animate={{opacity: 1}} 
                        transition={{duration: "0.5", delay: 0}}
                        whileHover={
                            {
                                y:-20,
                                color: "#ffffff", 
                                transition: {duration: 0.3},
                            }
                        }>
                        <img className='dp-icons' src={group} alt="" />
                        <h1 className='dp-title'>Group</h1>
                        <p>Create a new friend group</p>
                    </motion.div>
                </div>
                <div className='dp-song-container'>
                    <div className='dp-song-dropdown'></div>
                    <motion.div className='dp-song-info'
                        initial={{opacity: 0}} 
                        animate={{opacity: 1}} 
                        transition={{duration: "0.5", delay: 0}}
                        whileHover={
                            {
                                y:-20,
                                color: "#ffffff", 
                                transition: {duration: 0.3},
                            }
                        }>
                        <img className='dp-icons' src={calendar} alt="" />
                        <h1 className='dp-title'>Calendar</h1>
                        <p>Open your groups calendar</p>
                    </motion.div>
                </div>
                <div className='dp-country-container'>
                    <div className='dp-country-dropdown'></div>
                    <motion.div className='dp-country-info'
                        initial={{opacity: 0}} 
                        animate={{opacity: 1}} 
                        transition={{duration: "0.5", delay: 0}}
                        whileHover={
                            {
                                y:-20,
                                color: "#ffffff", 
                                transition: {duration: 0.3},
                            }
                        }>
                        <img className='dp-icons' src={clock} alt="" />
                        <h1 className='dp-title'>Plan</h1>
                        <p>Create events for everyone</p>
                    </motion.div>
                </div>
            </div>
        </>
    )
}