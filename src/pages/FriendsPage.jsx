//styles
import '../style/FriendsPage.css'

//dependencies
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

//components
import { UserCard } from '../components/UserCard'

import searchIcon from '../assets/search.png'
import arrow from '../assets/arrow.png'

import { useContext, useState } from 'react'
import { ApiContext } from '../context/ApiContext'
import { CookieContext } from '../context/CookieContext';

export const FriendsPage = (props) => {

    const navigate = useNavigate();

    const api = useContext(ApiContext);
    const cookies = useContext(CookieContext);

    const [search, setSearch] = useState("")
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        if (!props.auth) {
            navigate('/');
        }
    }, [props.auth])

    const onButtonClickHandler = () => {
        navigate('/createGroup')
    }

    const onSearchChangeHandler = (e) => {
        if(e.target.value === ''){
            setAllUsers([]);
            return;
        }
        fetch(api + 'findUsers', {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                search: e.target.value,
                session: cookies.get('session')
            })
        })
            .then(res => res.json())
            .then(json => {
                setAllUsers(json.result)
            })
    }

    return(
        <div className='fp-container'>
            <div className='fp-backdrop'></div>
            <div className='fp-info'>
                <motion.h1 className='fp-title'
                initial={{opacity: 0, y:20}} 
                animate={{opacity: 1, y: 0}} 
                transition={{duration: "0.5", delay: 0.25}}>Find Your Friends</motion.h1>
                <motion.p className='fp-sub'
                initial={{opacity: 0, y:20}} 
                animate={{opacity: 1, y: 0}} 
                transition={{duration: "0.5", delay: 0.4}}>Search for your friends username</motion.p>
                <motion.div className='fp-search-container'
                initial={{opacity: 0, y:20}} 
                animate={{opacity: 1, y: 0}} 
                transition={{duration: "0.5", delay: 0.55}}>
                    <img src={searchIcon} className='fp-search-icon' alt="" />
                    <input type="text" className='fp-search-input' onChange={onSearchChangeHandler} placeholder='search'/>
                </motion.div>
            </div>
            <motion.div className='fp-result-container'
            initial={{opacity: 0, y:20}} 
            animate={{opacity: 1, y: 0}} 
            transition={{duration: "0.5", delay: 0.7}}>
                {
                    allUsers.map(user => {
                        return <motion.div key={user.user_id}
                        initial={{opacity: 0, y:10}} 
                        animate={{opacity: 1, y: 0}} 
                        transition={{duration: "0.3"}}>
                                <UserCard username={user.username} userid={user.user_id}/>
                            </motion.div>
                    })
                }
            </motion.div>
            <motion.div className='fp-gonext'
            initial={{opacity: 0, y:20}} 
            animate={{opacity: 1, y: 0}} 
            transition={{duration: "0.5", delay: 0.85}}>
                <motion.div className='fp-button'
                whileHover={{
                    y: -5
                }}
                whileTap={{
                    scale:0.97
                }}
                onClick={onButtonClickHandler}>
                    <p className='fp-button-text'>Lets create a friend group</p>
                    <img src={arrow} className='fp-arrow' alt="" />
                </motion.div>
            </motion.div>
        </div>
    )
}