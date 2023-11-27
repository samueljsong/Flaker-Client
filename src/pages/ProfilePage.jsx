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

import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'

//components
import { UserCard } from '../components/UserCard'

export const ProfilePage = (props) => {

    const [username, setUsername] = useState('');
    const [activeTab, setActiveTab] = useState('f');
    const [friends, setFriends] = useState([{username: 'test'}]);

    const navigate = useNavigate();

    

    useEffect(() => {
        if (!props.auth) {
            navigate('/');
        }
    }, [props.auth])
    
    return(
        <div className='profile-container'>
            <div className='profile-dropdown'></div>

            <div className='profile-info-container'>
                <div className='profile-info'>
                    <img src={four} alt="" className='profile-image'/>
                    <p className='profile-username'>@asdfasdf{}</p>
                </div>
                <div className='profile-tabs-container'>
                    <div className='profile-tab'>Friends</div>
                    <span className='profile-gap'></span>
                    <div className='profile-tab'>Groups</div>
                </div>
                <div className='profile-friends-container'>
                    <div className='profile-incoming'>
                        <div className='profile-incoming-text'>
                            <p>Incoming friend reqeusts...</p>
                        </div>
                    </div>
                    <div className='profile-friends'>
                        <div className='profile-friends-text'>
                            <p>Friends list...</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}