//dependencies
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { motion } from "framer-motion"

//libraries
import Calendar from 'react-calendar';

//icons
import plus from '../assets/plus.png'
import back from '../assets/back.png'
import close from '../assets/close.png'

//components
import { AddEventModal } from '../components/AddEventModal';
import { EventCard } from '../components/EventCard';
import { RecycleComponent } from '../components/RecycleComponent';

//style
import '../style/CalendarPage.css'
import '../style/Calendar.css'
import { ApiContext } from '../context/ApiContext';
import { CookieContext } from '../context/CookieContext';

export const CalendarPage = (props) => {
    const navigate = useNavigate();

    const [groupName, setGroupName] = useState("")
    const [value, setValue] = useState(new Date());
    const onChangeDateValue = (date) => {
        setValue(new Date(date))
    }
    const api = useContext(ApiContext);
    const cookies = useContext(CookieContext);

    //Event modal
    const [addEvent, setAddEvent] = useState(false);
    const onAddEventClickHandler = () => {
        setAddEvent(!addEvent);
    }

    //Recycle page
    const [recycle, setRecycle] = useState(false);
    const onRecycleClickHandler = () => {
        setRecycle(!recycle);
    }

    const [allEvent, setAllEvent] = useState([]);

    const getAllEvents = async() => {
        fetch(api + `event/getAllEvents/?group_id=${props.group_id}&date=${value}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            }
        })
            .then(res => res.json())
            .then(json => {
                setAllEvent(json.result)
            })
    }

    const deleteGroup = async() => {
        fetch(api + `group/deleteGroup/${props.group_id}`, {
            method:"DELETE",
            mode: "cors",
            headers: {  
                "Content-Type" : "application/json"
            }
        })
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    navigate('/start')
                }
            })
    }

    useEffect(() => {
        fetch(api + `group/getName/${props.group_id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            }
        })
            .then(res => res.json())
            .then(json => {
                setGroupName(json.name)
            })
    }, [])

    useEffect(() => {
        getAllEvents();
    }, [value])

    useEffect(() => {
        if (!props.auth) {
            navigate('/');
        }
    }, [props.auth])

    const onClickGoBack = () => {
        props.onClickGroupCard();
        props.calendarID(0);
    }

    const getEventsAgain = () => {
        getAllEvents();
    }

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
                    <div className='cp-title-container'>
                        <motion.img className='cp-goback' src={back} alt="" 
                        onClick={onClickGoBack}
                        transition={{duration: "0.25"}}
                        whileHover={{
                            y: -5
                        }}
                        whileTap={{
                            scale:0.85
                        }}/>
                        <h1 className='cp-groupname' style={{color: "white"}}>{groupName}</h1>
                        <motion.div className='cp-delete-group'
                        whileHover={{
                            scale:1.05,
                            backgroundColor: "rgb(227, 72, 72)"
                        }}
                        whileTap={{
                            scale: 0.95
                        }}
                        onClick={deleteGroup}>
                            <img src={close} alt="" className='cp-plus-icon'/>
                            <p>Delete Group</p>
                        </motion.div>
                    </div>
                    <div className='cp-calendar'>
                        <Calendar calendarType='gregory' onChange={onChangeDateValue} value={value} />
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
                        <motion.div className='cp-recycle'
                        onClick={onRecycleClickHandler}
                        whileHover={{
                            scale:1.05,
                            backgroundColor: "#1087ff"
                        }}
                        whileTap={{
                            scale:0.97
                        }}>
                            <p>Recycle Page</p>
                        </motion.div>
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
                        {
                            allEvent.map(event => {
                                return <EventCard event_id={event.event_id} key={event.event_id} title={event.name} 
                                        location={event.location} date={event.date} 
                                        startTime={event.start_time} endTime={event.end_time} 
                                        description={event.description} owner={event.creator_id}
                                        getAllEvents={getAllEvents}/>
                            })
                        }
                    </div>
                </motion.div>
                {
                    addEvent ?  <AddEventModal getAllEvents={getAllEvents} group_id={props.group_id} date={value} closeHandler={onAddEventClickHandler}/> : <></>
                }
                {
                    recycle ? <RecycleComponent getEventsAgain={getEventsAgain} closeComponent={onRecycleClickHandler} group_id={props.group_id} getAllEvents={getAllEvents}/> : <></>
                }
            </div>
        </>
    )
}