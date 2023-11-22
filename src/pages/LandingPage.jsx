//style
import '../style/LandingPage.css'

//dependencies
import { motion } from "framer-motion"
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

export const LandingPage = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.auth) {
            navigate('/start');
        }
    }, [])

    return (
        <>
            <div className='lp-dropdown'></div>
            <div className='lp-container'>
                <div className='lp-info-container'>
                    <motion.div 
                        initial={{opacity: 0, y:20, x:3}} 
                        animate={{opacity: 1, y: 0, x:0}} 
                        transition={{duration: "0.5", delay: 0.25}}
                        className='lp-title-container'>
                        <span><h1 className='lp-title'>Connect,</h1></span>
                        <span><h1 className='lp-title'>Plan,</h1></span>
                        <span><h1 className='lp-title'>Meet.</h1></span>    
                    </motion.div>   
                    <motion.h4 
                        initial={{opacity: 0, y:20, x:3}} 
                        animate={{opacity: 1, y: 0, x:0}} 
                        transition={{duration: "0.5", delay: 0.4}}
                        className='lp-quote'>
                        Don't be a flaker, "A person who bails out on a commitment at the very last minute."
                    </motion.h4>
                    <span className='lp-spacing'></span>
                    <motion.div
                        initial={{opacity: 0, y:20, x:3}} 
                        animate={{opacity: 1, y: 0, x:0}} 
                        transition={{duration: "0.5", delay: 0.55}}>
                        <Link 
                            className='lp-discover' to={"/signup"}>Connect Now
                        </Link>
                    </motion.div>
                    <span className='lp-spacing'></span>
                </div>
            </div>
        </>
    )
}