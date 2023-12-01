import '../style/GroupCard.css'

//dependencies
import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiContext } from '../context/ApiContext'
import { CookieContext } from '../context/CookieContext'


export const GroupCard = (props) => {
    const navigate = useNavigate()
    const api = useContext(ApiContext)
    const cookies = useContext(CookieContext)

    const [totalMembers, setTotalMembers] = useState(0);

    const onFriendGroupClick = () => {
        props.calendarID(props.group_id)
        props.groupCardClick()
        console.log(props.group_id)
    }

    useEffect(() => {
        fetch(api + 'group/getAllMembers', {
            method: "POST",
            mode:"cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                session: cookies.get('session'),
                group_id: props.group_id
            })
        })
            .then(res => res.json())
            .then(json => {
                setTotalMembers(json.allMembers)
            })
    }, [])



    return (
        <motion.div className='groupcard-container'
            whileHover={{
                y: -5
            }}
            whileTap={{
                scale: 0.95
            }}
            onClick={onFriendGroupClick}>
                <div className='groupcard-profile'></div>
                <p className='groupcard-name'>@{props.name}</p>
                <div className='groupcard-total-members-container'>
                    <div className='groupcard-total-members'>
                        {totalMembers} Friends
                    </div>
                </div>
        </motion.div>
    )
}