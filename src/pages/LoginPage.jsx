//Dependencies
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

//Context
import { ApiContext } from '../context/ApiContext'
import { CookieContext } from '../context/CookieContext';

//styles
import '../style/LoginPage.css'
import '../style/Animations.css'


export const LoginPage = () => {
    const navigateTo = useNavigate();

    const api = useContext(ApiContext)
    const cookies = useContext(CookieContext)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const login = async (e) => {
        e.preventDefault();
        fetch(api + 'login', {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    console.log("SUCCESS: User logged in");
                    navigateTo('/start');
                }
                if(!json.success){
                    alert(json.message);
                }
            })
    }

    return(
        <>
            <div className='login-dropdown'></div>
            <div className='login-container'>
                <form className='login-form' onSubmit={login}>
                    <h1>Login to your account</h1>
                    <span className='login-line'></span>
                    <span className='login-spacing'></span>
                    <motion.div className='login-input-container'
                        initial={{opacity: 0, y:20, x:3}} 
                        animate={{opacity: 1, y: 0, x:0}} 
                        transition={{duration: "0.5", delay: 0.25}}>
                        <label htmlFor="login-email">Username</label>
                        <input className='login-input' name='login-email' id='login-email' type="text" onChange={onUsernameChange} required/>
                    </motion.div>
                    <motion.div className='login-input-container'
                        initial={{opacity: 0, y:20, x:3}} 
                        animate={{opacity: 1, y: 0, x:0}} 
                        transition={{duration: "0.5", delay: 0.4}}>
                        <label htmlFor="login-password">Password</label>
                        <input className='login-input' name='login-password' id='login-password' type="password" onChange={onPasswordChange} required/>
                    </motion.div>
                    <span className='login-spacing'></span>
                    <motion.button className='login-button'
                        initial={{opacity: 0, y:20, x:3}} 
                        animate={{opacity: 1, y: 0, x:0}} 
                        transition={{duration: "0.5", delay: 0.55}}>
                        <p>Login</p>
                    </motion.button>
                    <motion.div className='login-to-signup'
                        initial={{opacity: 0, y:20, x:3}} 
                        animate={{opacity: 1, y: 0, x:0}} 
                        transition={{duration: "0.5", delay: 0.7}}>
                        <p className='login-smallfont'>Don't have an account?</p>
                        <Link to={'/signup'} className='login-link login-smallfont'>Signup to Flaker</Link>
                    </motion.div>
                </form>
            </div>
        </>
    )
}