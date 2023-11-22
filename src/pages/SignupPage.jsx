//Dependencies
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

//Context
import { ApiContext } from '../context/ApiContext'

//dependencies
import { useEffect } from 'react';

//styles
import '../style/SIgnupPage.css'

export const SignupPage = (props) => {
    const navigate = useNavigate();

    const api = useContext(ApiContext)

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (props.auth) {
            navigate('/start');
        }
    }, [props.auth])
    
    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const signUp = async (e) => {
        e.preventDefault();
        console.log("signing up")
        fetch(api + 'signup',{
            mode:"cors",
            method:"POST",
            headers: {"Content-Type" : "application/json"},
            body:JSON.stringify({
                email:email,
                username: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    navigate('/login')
                }else{
                    alert("There was an error in creating an account")
                }
            });
    }

    return(

        <>
            <div className='signup-dropdown'></div>
            <div className='signup-container'>
                <form className='signup-form' onSubmit={signUp}>
                    <h1>Signup to Flaker</h1>
                    <span className='signup-line'></span>
                    <span className='signup-spacing'></span>
                    <motion.div className='signup-input-container'
                        initial={{opacity: 0, y:20, x:3}} 
                        animate={{opacity: 1, y: 0, x:0}} 
                        transition={{duration: "0.5", delay: 0.25}}>
                        <label htmlFor="signup-email">Email</label>
                        <input className='signup-input' name='signup-email' id='signup-email' type="email" onChange={onEmailChange} required/>
                    </motion.div>
                    <motion.div className='signup-input-container'
                        initial={{opacity: 0, y:20, x:3}} 
                        animate={{opacity: 1, y: 0, x:0}} 
                        transition={{duration: "0.5", delay: 0.4}}>
                        <label htmlFor="signup-username">Username</label>
                        <input className='signup-input' name='signup-username' id='signup-username' type="text" onChange={onUsernameChange} max={15}  required/>
                    </motion.div>
                    <motion.div className='signup-input-container'
                        initial={{opacity: 0, y:20, x:3}} 
                        animate={{opacity: 1, y: 0, x:0}} 
                        transition={{duration: "0.5", delay: 0.55}}>
                        <label htmlFor="signup-password">Password</label>
                        <input className='signup-input' name='signup-password' id='signup-password' type="password" onChange={onPasswordChange}  required/>
                    </motion.div>
                    <span className='signup-spacing'></span>
                    <motion.button className='signup-button'
                        initial={{opacity: 0, y:20, x:3}} 
                        animate={{opacity: 1, y: 0, x:0}} 
                        transition={{duration: "0.5", delay: 0.7}}>
                        <h4>Create Account</h4>
                    </motion.button>
                    <motion.div className='signup-to-login'
                        initial={{opacity: 0, y:20, x:3}} 
                        animate={{opacity: 1, y: 0, x:0}} 
                        transition={{duration: "0.5", delay: 0.85}}>
                        <p className='signup-smallfont'>Have an account?</p>
                        <Link to={'/login'} className='signup-link signup-smallfont'>Login to Flaker</Link>
                    </motion.div>
                </form>
            </div>
        </>
    )
}