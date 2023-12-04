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
import { useEffect } from 'react';

export const StartPage = (props) => {
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.auth) {
            navigate('/');
        }
    }, [props.auth])

    const onFriendsClickHandler = () => {
        navigate('/findfriends');
    }

    const onGroupClickHandler = () => {
        navigate('/createGroup');
    }

    const onCalendarClickHandler = () => {
        navigate('/calendarGroup');
    }

    const onPlanClickHandler = () => {
        navigate('/plans');
    }

    return(
        <>
            <div className='dp-container'>
            
                <motion.div className='dp-artist-container'>
                    <div className='dp-artist-dropdown'></div>
                    <motion.div className='dp-artist-info'
                        onClick={onFriendsClickHandler}
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
                        <h1 className='dp-title'>1. Friends</h1>
                        <p>Add your friends to start</p>
                    </motion.div>
                </motion.div>
                <div className='dp-genre-container'>
                    <div className='dp-genre-dropdown'></div>
                    <motion.div className='dp-genre-info'
                        onClick={onGroupClickHandler}
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
                        <h1 className='dp-title'>2. Group</h1>
                        <p>Create a new friend group</p>
                    </motion.div>
                </div>
                <div className='dp-song-container'>
                    <div className='dp-song-dropdown'></div>
                    <motion.div className='dp-song-info'
                        onClick={onCalendarClickHandler}
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
                        <h1 className='dp-title'>3. Calendar</h1>
                        <p>Open your groups calendar</p>
                    </motion.div>
                </div>
                <div className='dp-country-container'>
                    <div className='dp-country-dropdown'></div>
                    <motion.div className='dp-country-info'
                        onClick={onPlanClickHandler}
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
                        <h1 className='dp-title'>4. Plans</h1>
                        <p>Create events for everyone</p>
                    </motion.div>
                </div>
            </div>
        </>
    )
}