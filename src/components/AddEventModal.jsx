import '../style/AddEventModal.css'
import Dropdown from "react-dropdown"
import '../style/Dropdown.css'
import 'react-dropdown/style.css';

//dependencies
import { motion } from "framer-motion"

import close from '../assets/close.png'
import { useContext, useState } from 'react';
import { ApiContext } from '../context/ApiContext';
import { CookieContext } from '../context/CookieContext';

export const AddEventModal = (props) => {

    const api = useContext(ApiContext)
    const cookies = useContext(CookieContext)

    //values
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const onTitleChangeHandler = (e) => {
        setTitle(e.target.value)
    }

    const onDescriptionChangeHandler = (e) => {
        setDescription(e.target.value)
    }

    const onStartTimeChangeHandler = (e) => {
        setStartTime(e.value)
    }

    const onEndTimeChangeHandler = (e) => {
        setEndTime(e.value)
    }

    const createEvent = () => {
        fetch(api + 'event/create', {
            method:"POST",
            mode:"cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                session: cookies.get('session'),
                title: title,
                description: description,
                startTime: startTime,
                endTime: endTime,
                date: props.date,
                group_id: props.group_id
            })
        })
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    props.closeHandler
                }
            })
    }

    const startOptions = [
        "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", 
        "06:00", "07:00", "08:00", "09:00","10:00", "11:00", 
        "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", 
        "18:00", "19:00", "20:00", "21:00","22:00","23:00","24:00"
    ]

    const endOptions = [
        "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", 
        "06:00", "07:00", "08:00", "09:00","10:00", "11:00", 
        "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", 
        "18:00", "19:00", "20:00", "21:00","22:00","23:00","24:00"
    ]

    const defaultOption = startOptions[0];
    const defaultEndOption = endOptions[0];

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
                    <input type="text" className='aem-input' placeholder='Event Title' onChange={onTitleChangeHandler}/>
                </div>
                <div className='aem-info'>
                    <Dropdown className='aem-start-date' options={startOptions} value={"Start Time"} placeholder="Select an option" onChange={onStartTimeChangeHandler}/>
                    <Dropdown className='aem-end-date' options={endOptions} value={"End Time"} placeholder="Select an option" onChange={onEndTimeChangeHandler}/>
                    <div className='aem-color'>

                    </div>
                </div>
                <textarea className='aem-details-input' name="" id="" cols="30" rows="10" placeholder='Enter event details here...' onChange={onDescriptionChangeHandler}></textarea>
                <motion.div className='aem-create'
                onClick={createEvent}
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