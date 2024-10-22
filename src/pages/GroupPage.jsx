//style
import '../style/GroupPage.css'

//dependencies
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { setCardPicture } from '../util/picture'

//components
import { UserCard } from '../components/UserCard'
import { FriendCard } from '../components/FriendCard';
import { CreateGroupModal } from '../components/CreateGroupModal';

import searchIcon from '../assets/search.png'
import arrow from '../assets/arrow.png'

import { useContext, useState } from 'react'
import { ApiContext } from '../context/ApiContext'
import { CookieContext } from '../context/CookieContext';

export const GroupPage = (props) => {

    const navigate = useNavigate();
    const api = useContext(ApiContext);
    const cookies = useContext(CookieContext);

    const [search, setSearch] = useState("")
    const [allFriends, setAllFriends] = useState([])
    
    const [group, setGroup] = useState([]);

    const addFriendToGroup = (id) => {
        setGroup([...group, id]);
    }

    const removeFromGroup = (id) => {
        const newList = group.filter((num) => num !== id)
        setGroup(newList)
    }

    //Create group modal
    const [createGroup, setCreateGroup] = useState(false);
    const onCreateGroupClickHandler = () => {
        setCreateGroup(!createGroup)
    }

    useEffect(() => {
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
                setAllFriends(json.allFriends)
            })
    },[])

    useEffect(() => {
        if (!props.auth) {
            navigate('/');
        }
    }, [props.auth])

    const onSearchChangeHandler = (e) => {
        
    }

    return(
        <div className='gp-container'>
            <div className='gp-backdrop'></div>
            <div className='gp-info'>
                <motion.h1 className='gp-title'
                initial={{opacity: 0, y:20}} 
                animate={{opacity: 1, y: 0}} 
                transition={{duration: "0.5", delay: 0.25}}>Create a friend group</motion.h1>
                <motion.p className='gp-sub'
                initial={{opacity: 0, y:20}} 
                animate={{opacity: 1, y: 0}} 
                transition={{duration: "0.5", delay: 0.4}}>Search and add the friends you want to make a group with</motion.p>
                <motion.div className='gp-search-container'
                initial={{opacity: 0, y:20}} 
                animate={{opacity: 1, y: 0}} 
                transition={{duration: "0.5", delay: 0.55}}>
                    <img src={searchIcon} className='gp-search-icon' alt="" />
                    <input type="text" className='gp-search-input' onChange={onSearchChangeHandler} placeholder='search'/>
                </motion.div>
            </div>
            <motion.div className='gp-result-container'
                initial={{opacity: 0, y:20}} 
                animate={{opacity: 1, y: 0}} 
                transition={{duration: "0.5", delay: 0.7}}>
                {
                    allFriends.map(user => {
                        return <motion.div key={user.user_id}
                        initial={{opacity: 0, y:10}} 
                        animate={{opacity: 1, y: 0}} 
                        transition={{duration: "0.2"}}>
                                <FriendCard removeFromGroup={removeFromGroup} addToGroup={addFriendToGroup} username={user.username} userid={user.user_id} user_pic={user.user_pic}/>
                            </motion.div>
                    })
                }
            </motion.div>
            <motion.div className='gp-gonext'
                onClick={onCreateGroupClickHandler}
                initial={{opacity: 0, y:20}} 
                animate={{opacity: 1, y: 0}} 
                transition={{duration: "0.5", delay: 0.85}}>
                <motion.div className='gp-button'
                    whileHover={{
                        y: -5,
                        backgroundColor: "#74634c",
                    }}
                    whileTap={{
                        scale:0.97
                    }}>
                        <p className='gp-button-text'>Create Group</p>
                </motion.div>
            </motion.div>

            {
                createGroup ? <CreateGroupModal closeModal={onCreateGroupClickHandler} group={group}/> : <></>
            }

        </div>
    )
}