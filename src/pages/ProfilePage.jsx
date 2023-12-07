import '../style/ProfilePage.css'

//profile images
import one from '../assets/profile/1.jpg'
import two from '../assets/profile/2.jpg'
import three from '../assets/profile/3.jpg'
import four from '../assets/profile/4.jpg'
import five from '../assets/profile/5.jpg'
import six from '../assets/profile/6.jpg'
import seven from '../assets/profile/7.jpg'
import eight from '../assets/profile/8.jpg'
import nine from '../assets/profile/9.jpg'
import ten from '../assets/profile/10.jpg'

import { useEffect, useState, useContext } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'

//Context
import { ApiContext } from '../context/ApiContext'
import { CookieContext } from '../context/CookieContext';

//components
import { UserCard } from '../components/UserCard'
import { GroupCard } from '../components/GroupCard'

export const ProfilePage = (props) => {
    const api = useContext(ApiContext);
    const cookies = useContext(CookieContext);

    const [username, setUsername] = useState('');
    const [activeTab, setActiveTab] = useState(true);
    const [friendActive, setFriendActive] = useState('highlight')
    const [groupActive, setGroupActive] = useState('');
    const [requests, setRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const [groups, setGroups] = useState([]);

    const navigate = useNavigate();    

    const [calendarPage, setCalendarPage] = useState(false);
    const [calendarPageID, setCalendarPageID] = useState();

    const onClickGroupCard = () => {
        setCalendarPage(!calendarPage)
    }

    const calendarID = (group_id) => {
        setCalendarPageID(group_id);
    }

    useEffect(() => {
        if (!props.auth) {
            navigate('/');
        }
        getUsername();
        getRequests();
        getFriends();
    }, [props.auth])

    const getUsername = async() => {
        fetch(api + `profile`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                session: cookies.get('session')
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    setUsername(json.result.username);
                }
            })
    }

    const friendTabHandler = () => {
        if (activeTab !== true) {
            setActiveTab(true);
            setFriendActive('highlight');
            setGroupActive('');
            getRequests();
            getFriends();
        }
    }

    const getRequests = () => {
        console.log(cookies.get('session'));
        fetch(api + 'friends/requests', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                session: cookies.get('session')
            })
        })
            .then(res => res.json())
            .then(json => {
                setRequests(json.requests);
            })
    }

    const getFriends = () => {
        console.log(cookies.get('session'));
        fetch(api + 'friends/getAll', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                session: cookies.get('session')
            })
        })
            .then(res => res.json())
            .then(json => {
                setFriends(json.allFriends);
            })
    }

    const groupTabHandler = () => {
        if (activeTab !== false) {
            setActiveTab(false);
            setGroupActive('highlight');
            setFriendActive('');
            getGroups();
        }
    }

    const getGroups = () => {
        fetch(api + 'group/getAllGroups', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                session: cookies.get('session')
            })
        })
            .then(res => res.json())
            .then(json => {
                setGroups(json.allGroups)
            })
    }
    
    return(
        <div className='profile-container'>
            <div className='profile-dropdown'></div>

            <div className='profile-info-container'>
                <div className='profile-info'>
                    <img src={four} alt="" className='profile-image'/>
                    <p className='profile-username'>@{username}</p>
                </div>
                <div className='profile-tabs-container'>
                    <div className={`profile-tab ${friendActive}`} onClick={friendTabHandler}>Friends</div>
                    <span className='profile-gap'></span>
                    <div className={`profile-tab ${groupActive}`} onClick={groupTabHandler}>Groups</div>
                </div>
                <div className='profile-friends-container'>
                    {
                        activeTab ?  <>
                        <div className='profile-incoming'>
                            <div className='profile-incoming-text'>
                                Requests...
                            </div>
                            {
                                requests.map(user => {
                                    return <motion.div key={user.user_id}
                                    initial={{opacity: 0, y:10}} 
                                    animate={{opacity: 1, y: 0}} 
                                    transition={{duration: "0.3"}}>
                                            <UserCard username={user.username} userid={user.user_id}/>
                                        </motion.div>
                                })
                            }
                        </div>
                        <div className='profile-friends'>
                            <div className='profile-friends-text'>
                                Friends...
                            </div>
                            {
                                friends.map(user => {
                                    return <motion.div key={user.user_id}
                                    initial={{opacity: 0, y:10}} 
                                    animate={{opacity: 1, y: 0}} 
                                    transition={{duration: "0.3"}}>
                                            <UserCard username={user.username} userid={user.user_id}/>
                                        </motion.div>
                                })
                            }
                        </div>
                        </>
                        :
                        <>
                        <div className='profile-friends'>
                            <div className='profile-friends-text'>
                            </div>
                            {
                                groups.map(group => {
                                    return <motion.div key={group.group_id}
                                                initial={{opacity: 0, y:10}} 
                                                animate={{opacity: 1, y: 0}} 
                                                transition={{duration: "0.2"}}>
                                                <GroupCard calendarID={calendarID} groupCardClick={onClickGroupCard} group_id={group.group_id} name={group.name}/>
                                            </motion.div>
                                })
                            }
                        </div>
                        </>
                    }
                </div>
            </div>
            
        </div>
    )
}