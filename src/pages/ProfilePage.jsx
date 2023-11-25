import '../style/ProfilePage.css'

import { useEffect } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'

export const ProfilePage = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!props.auth) {
            navigate('/');
        }
    }, [props.auth])
    
    return(
        <div className='profile-container'>
            
        </div>
    )
}