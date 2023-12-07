import { useContext, useEffect, useState } from 'react';
import '../style/RecycleComponent.css'
import { ApiContext } from '../context/ApiContext';
import { EventCard } from './EventCard';
import { RecycledEventCard } from './RecycledEventCard';
import { motion } from "framer-motion"

import close from '../assets/close.png'

export const RecycleComponent = (props) => {
    const api = useContext(ApiContext)
    const [allEvent, setAllEvent] = useState([]);

    const getAllEvents = async() => {
        fetch(api + `event/getAllRecycledEvents/?group_id=${props.group_id}`, {
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

    

    useEffect(() => {
        getAllEvents()
    }, [])

    return(
        <div className='rc-container'>
            
            <div className='rc-box-container'>
                <div className='rc-title-container'>
                    <h1>Recycle Bin</h1>
                    <motion.div className='rc-icon-container'
                    whileHover={{
                        scale:1.1,
                        backgroundColor: "rgb(227, 72, 72)"
                    }}
                    whileTap={{
                        scale:0.95
                    }}
                    onClick={props.closeComponent}>
                        <img src={close} alt="" className='rc-icon'/>
                    </motion.div>
                </div>
                <div className='rc-events-container'>
                    {
                        allEvent.map(event => {
                            return <RecycledEventCard event_id={event.event_id} key={event.event_id} title={event.name} 
                                    location={event.location} date={event.date} 
                                    startTime={event.start_time} endTime={event.end_time} 
                                    description={event.description} owner={event.creator_id}
                                    getAllEvents={getAllEvents} getEventsAgain={props.getEventsAgain}/>
                        })
                    }
                </div>
                <span></span>
            </div>
            
        </div>
    )
}