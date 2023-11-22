//styles
import '../style/FriendsPage.css'

//dependencies
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'

//components
import { UserCard } from '../components/UserCard'

import searchIcon from '../assets/search.png'
import arrow from '../assets/arrow.png'

import { useContext, useState } from 'react'
import { ApiContext } from '../context/ApiContext'

export const FriendsPage = () => {

    const api = useContext(ApiContext);

    const [search, setSearch] = useState("")
    const [allUsers, setAllUsers] = useState([])

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
                search: e.target.value
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
                        transition={{duration: "0.2"}}>
                                <UserCard username={user.username}/>
                            </motion.div>
                    })
                }
            </motion.div>
            <motion.div className='fp-gonext'
            initial={{opacity: 0, y:20}} 
            animate={{opacity: 1, y: 0}} 
            transition={{duration: "0.5", delay: 0.85}}>
                <Link to={'/createGroup'} className='fp-link'>
                    <p>Let's make a group now</p>
                    <img src={arrow} alt="" className='fp-arrow'/>
                </Link>
            </motion.div>
        </div>
    )
}