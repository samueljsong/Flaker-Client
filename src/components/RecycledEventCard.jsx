// style
import '../style/EventCard.css'

//dependencies
import { motion } from 'framer-motion'

//icons
import check from '../assets/check.png'
import close from '../assets/close.png'
import trash from '../assets/trash.png'
import { useContext } from 'react'
import { ApiContext } from '../context/ApiContext'
import { CookieContext } from '../context/CookieContext'

export const RecycledEventCard = ({event_id, title, location, date, startTime, endTime, description, owner, getAllEvents}) => {

    const api = useContext(ApiContext);
    const cookies = useContext(CookieContext);

    const onDeleteClickHandler = () => {
        fetch(api + `event/deleteEvent/${event_id}`, {
            method:"DELETE",
            mode:"cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                creator_id: owner,
                session: cookies.get('session')
            })
        })
            .then(res => res.json())
            .then(json => {
                getAllEvents()
            })
    }

    return(
        <div className='eventcard-container'>
            <div className='eventcard-title'>
                <h2>{title}</h2>
                <motion.img className='ec-icon ec-trash' src={trash} alt="" 
                whileHover={{
                    scale:1.1
                }}
                whileTap={{
                    scale: 0.9
                }}
                onClick={onDeleteClickHandler}/>
            </div>
            <div className='eventcard-info'>
                <div className='eventcard-loc-det'>
                    <span className='ec-gap'></span>
                    <p>Location: {location}</p>
                    <p>Description: {description}</p>
                </div>
                <div className='eventcard-time'>
                    <span className='ec-gap'></span>
                    <p className='eventcard-start'>Start: {startTime.split('T')[1].slice(0, 5)}</p>
                    <p className='eventcard-end'>End: {endTime.split('T')[1].slice(0, 5)}</p>
                </div>
            </div>
            <div className='eventcard-interaction-container'>
                <motion.div className='ec-going-container'
                whileHover={{
                    y: -5,
                    backgroundColor: "rgb(49, 172, 49)"
                }}
                whileTap={{
                    scale:0.95
                }}>
                    <div className='going'>
                        <img src={check} alt="" className='ec-icon'/>
                        <p>I'm going</p>
                    </div>
                </motion.div>
                <motion.div className='ec-notgoing-container'
                whileHover={{
                    y: -5,
                    backgroundColor: "rgb(227, 72, 72)"
                }}
                whileTap={{
                    scale:0.95
                }}>
                    <div className='notgoing'>
                        <img src={close} alt="" className='ec-icon'/>
                        <p>Not going</p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}