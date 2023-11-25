//dependencies
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { motion } from "framer-motion"

//libraries
import Calendar from 'react-calendar';

import plus from '../assets/plus.png'

//components
import { AddEventModal } from '../components/AddEventModal';

//style
import '../style/CalendarPage.css'
import '../style/Calendar.css'

export const CalendarPage = (props) => {
    const navigate = useNavigate();
    const [value, onChange] = useState(new Date());

    //Event modal
    const [addEvent, setAddEvent] = useState(false);
    const onAddEventClickHandler = () => {
        setAddEvent(!addEvent);
    }

    useEffect(() => {
        if (!props.auth) {
            navigate('/');
        }
    }, [props.auth])

    return(
        <>
            <div className='cp-container'>
                <div className='cp-dropdown'></div>
                <motion.div className='cp-calendar-container'
                initial={{
                    opacity:0,
                    y:20
                }}
                animate={{
                    opacity:1,
                    y:0
                }}
                transition={{
                    duration:0.5
                }}>
                    <h1 style={{color: "white"}}>Your Group Name</h1>
                    <div className='cp-calendar'>
                        <Calendar calendarType='gregory' onChange={onChange} value={value} />
                    </div>
                </motion.div>
                <motion.div className='cp-schedule'
                initial={{
                    opacity:0,
                    y:20
                }}
                animate={{
                    opacity:1,
                    y:0
                }}
                transition={{
                    duration:0.5
                }}>
                    <div className='cp-schedule-title'>
                        <h1>Schedule</h1>
                        <motion.div className='cp-add-event'
                        onClick={onAddEventClickHandler}
                        whileHover={{
                            scale:1.05,
                            backgroundColor: "#1087ff"
                        }}
                        whileTap={{
                            scale:0.97
                        }}>
                            <img src={plus} alt="" className='cp-plus-icon'/>
                            <p>Add Event</p>
                        </motion.div>
                    </div>
                    <div className='cp-events-container'>
                        <div className='cp-events'>
                            <div className='cp-hours h-0'>
                                <div className='cp-time'>
                                    00:00
                                </div>
                            </div>
                            <div className='cp-event'></div>
                            <div className='cp-hours h-1'>
                                <div className='cp-time'>
                                    01:00
                                </div>
                            </div>
                            <div className='cp-hours h-2'>
                                <div className='cp-time'>
                                    02:00
                                </div>
                            </div>
                            <div className='cp-hours h-3'>
                                <div className='cp-time'>
                                    03:00
                                </div>
                            </div>
                            <div className='cp-hours h-4'>
                                <div className='cp-time'>
                                    04:00
                                </div>
                            </div>
                            <div className='cp-hours h-5'>
                                <div className='cp-time'>
                                    05:00
                                </div>
                            </div>
                            <div className='cp-hours h-6'>
                                <div className='cp-time'>
                                    06:00
                                </div>
                            </div>
                            <div className='cp-hours h-7'>
                                <div className='cp-time'>
                                    07:00
                                </div>
                            </div>
                            <div className='cp-hours h-8'>
                                <div className='cp-time'>
                                    08:00
                                </div>
                            </div>
                            <div className='cp-hours h-9'>
                                <div className='cp-time'>
                                    09:00
                                </div>
                            </div>
                            <div className='cp-hours h-10'>
                                <div className='cp-time'>
                                    10:00
                                </div>
                            </div>
                            <div className='cp-hours h-11'>
                                <div className='cp-time'>
                                    11:00
                                </div>
                            </div>
                            <div className='cp-hours h-12'>
                                <div className='cp-time'>
                                    12:00
                                </div>
                            </div>
                            <div className='cp-hours h-13'>
                                <div className='cp-time'>
                                    13:00
                                </div>
                            </div>
                            <div className='cp-hours h-14'>
                                <div className='cp-time'>
                                    14:00
                                </div>
                            </div>
                            <div className='cp-hours h-15'>
                                <div className='cp-time'>
                                    15:00
                                </div>
                            </div>
                            <div className='cp-hours h-16'>
                                <div className='cp-time'>
                                    16:00
                                </div>
                            </div>
                            <div className='cp-hours h-17'>
                                <div className='cp-time'>
                                    17:00
                                </div>
                            </div>
                            <div className='cp-hours h-18'>
                                <div className='cp-time'>
                                    18:00
                                </div>
                            </div>
                            <div className='cp-hours h-19'>
                                <div className='cp-time'>
                                    19:00
                                </div>
                            </div>
                            <div className='cp-hours h-20'>
                                <div className='cp-time'>
                                    20:00
                                </div>
                            </div>
                            <div className='cp-hours h-21'>
                                <div className='cp-time'>
                                    21:00
                                </div>
                            </div>
                            <div className='cp-hours h-22'>
                                <div className='cp-time'>
                                    22:00
                                </div>
                            </div>
                            <div className='cp-hours h-23'>
                                <div className='cp-time'>
                                    23:00
                                </div>
                            </div>
                            <div className='cp-hours h-24'>
                                <div className='cp-time'>
                                    24:00
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </motion.div>
                {
                    addEvent ?  <AddEventModal closeHandler={onAddEventClickHandler}/> : <></>
                }
            </div>
        </>
    )
}