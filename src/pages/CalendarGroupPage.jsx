//style
import '../style/CalendarGroupPage.css'

//icons
import searchIcon from '../assets/search.png'

//dependencies
import { motion } from 'framer-motion';

//components
import { GroupCard } from '../components/GroupCard';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../context/ApiContext';
import { CookieContext } from '../context/CookieContext';

//pages
import { CalendarPage } from './CalendarPage';

export const CalendarGroupPage = (props) => {

    const navigate = useNavigate();
    const api = useContext(ApiContext);
    const cookie = useContext(CookieContext);
    const [allGroups, setAllGroups] = useState([]);

    //change to calendar
    const [calendarPage, setCalendarPage] = useState(false);
    const [calendarPageID, setCalendarPageID] = useState();

    const onClickGroupCard = () => {
        setCalendarPage(!calendarPage)
    }

    const calendarID = (group_id) => {
        setCalendarPageID(group_id);
    }


    useEffect(() => {
        fetch(api + 'group/getAllGroups', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                session: cookie.get('session')
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json.allGroups)
                setAllGroups(json.allGroups)
            })
    }, [])

    useEffect(() => {
        if (!props.auth) {
            navigate('/');
        }
    }, [props.auth])


    const onSearchChangeHandler = (e) => {
        
    }
    
    return(
        <>
            {
                calendarPage ? <CalendarPage calendarID={calendarID} onClickGroupCard={onClickGroupCard} auth={props.auth} group_id={calendarPageID}/> 
                :
                <div className='cgp-container'>
                    <div className='cgp-dropdown'></div>

                    <div className='cgp-info'>
                        <motion.h1 className='cgp-title'
                        initial={{opacity: 0, y:20}} 
                        animate={{opacity: 1, y: 0}} 
                        transition={{duration: "0.5", delay: 0.25}}>Select a friend group</motion.h1>
                        <motion.p className='cgp-sub'
                        initial={{opacity: 0, y:20}} 
                        animate={{opacity: 1, y: 0}} 
                        transition={{duration: "0.5", delay: 0.4}}>Search and select a friend group and enter the calendar</motion.p>
                        <motion.div className='cgp-search-container'
                        initial={{opacity: 0, y:20}} 
                        animate={{opacity: 1, y: 0}} 
                        transition={{duration: "0.5", delay: 0.55}}>
                            <img src={searchIcon} className='cgp-search-icon' alt="" />
                            <input type="text" className='cgp-search-input' onChange={onSearchChangeHandler} placeholder='search'/>
                        </motion.div>
                    </div>
                    <motion.div className='cgp-result-container'
                        initial={{opacity: 0, y:20}} 
                        animate={{opacity: 1, y: 0}} 
                        transition={{duration: "0.5", delay: 0.7}}>
                        {
                            allGroups.map(group => {
                                return <motion.div key={group.group_id}
                                            initial={{opacity: 0, y:10}} 
                                            animate={{opacity: 1, y: 0}} 
                                            transition={{duration: "0.2"}}>
                                            <GroupCard calendarID={calendarID} groupCardClick={onClickGroupCard} group_id={group.group_id} name={group.name}/>
                                        </motion.div>
                            })
                        }
                    </motion.div>
                </div>
            }
        </>
    )
}