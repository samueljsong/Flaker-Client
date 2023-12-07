// style
import '../style/PlanEventCard.css'

//dependencies
import { motion } from 'framer-motion'

//icons
import check from '../assets/check.png'
import close from '../assets/close.png'
import trash from '../assets/trash.png'
import { useContext } from 'react'
import { ApiContext } from '../context/ApiContext'
import { CookieContext } from '../context/CookieContext'

export const PlanEventCard = ({title, location, startTime, endTime, description}) => {

    const api = useContext(ApiContext);
    const cookies = useContext(CookieContext);

    return(
        <div className='planeventcard-container'>
            <div className='eventcard-title'>
                <h2>{title}</h2>
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
            
        </div>
    )
}