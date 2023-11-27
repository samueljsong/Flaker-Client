import '../style/UserCard.css'

//icons
import plus from '../assets/plus.png'
import close from '../assets/close.png'
import send from '../assets/sent.png'
import check from '../assets/check.png'

import { motion } from "framer-motion"
import { useEffect, useState, useContext } from "react"

//Context
import { ApiContext } from '../context/ApiContext'
import { CookieContext } from '../context/CookieContext';

export const UserCard = (props) => {
    const api = useContext(ApiContext);
    const cookies = useContext(CookieContext);

    // statuses: 0 = no request, 1 = request sent, 2 = request retrieved, 3 = friends
    const [status, setStatus] = useState(0);
    const [statusbtn, setStatusBtn] = useState(<motion.div className='usercard-button'
    whileHover={{
        backgroundColor: "#3b5d6f"
    }}
    whileTap={{
        scale:0.95
    }}
    onClick={() => sendRequest()}>
        <img src={plus} className='usercard-icon' alt="" />
        add
    </motion.div>)

    const getStatus = async () => {
        fetch(api + 'getStatus', {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              session: cookies.get('session'),
              userid: props.userid
            })
        })
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    console.log("SUCCESS: retrieved friend status" );
                    console.log(json.status);
                    setStatus(json.status);
                }
                if(!json.success){
                    console.log("ERROR: failed to retrieve friend status");
                }
            })
    }

    useEffect(() => {
        getStatus();
    }, [])

    useEffect(() => {
        console.log("change button");
        switch (status) {
            case 0: // no request
                setStatusBtn(
                    <motion.div className='usercard-button'
                    whileHover={{
                        backgroundColor: "#3b5d6f"
                    }}
                    whileTap={{
                        scale:0.95
                    }}
                    onClick={() => sendRequest()}>
                        <img src={plus} className='usercard-icon' alt="" />
                        add
                    </motion.div>
                );
                break;
            case 1: // request sent
                setStatusBtn(
                    <motion.div className='usercard-button'
                    whileHover={{
                        backgroundColor: "#f94449"
                    }}
                    whileTap={{
                        scale:0.95
                    }}
                    style={{
                        borderColor: "#f94449"
                    }}
                    onClick={() => removeRequest()}>
                        <img src={close} className='usercard-icon' alt="" />
                        cancel
                    </motion.div>
                );
                break;
            case 2: // request got
                setStatusBtn(
                    <motion.div className='usercard-button'
                    whileHover={{
                        backgroundColor: "#3b5d6f"
                    }}
                    whileTap={{
                        scale:0.95
                    }}
                    onClick={() => acceptRequest()}>
                        <img src={check} className='usercard-icon' alt="" />
                        accept
                    </motion.div>
                );
                break;
            case 3: // friends
                setStatusBtn(
                    <motion.div className='usercard-button'
                    whileHover={{
                        backgroundColor: "#f94449"
                    }}
                    whileTap={{
                        scale:0.95
                    }}
                    style={{
                        borderColor: "#f94449"
                    }}
                    onClick={() => sendRequest()}>
                        <img src={close} className='usercard-icon' alt="" />
                        remove
                    </motion.div>
                )
                break;
        }
    }, [status])

    const sendRequest = async () => {
        console.log("sending request")
        fetch(api + 'sendRequest', {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              session: cookies.get('session'),
              userid: props.userid
            })
        })
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    console.log("SUCCESS: request sent" );
                    setStatus(1);
                }
                if(!json.success){
                    setAuth(false);
                    console.log("ERROR: request not sent");
                }
            })
    }

    const acceptRequest = async () => {
        console.log("accepting request")
        fetch(api + 'acceptRequest', {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              session: cookies.get('session'),
              userid: props.userid
            })
        })
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    console.log("SUCCESS: request accepted" );
                    setStatus(3);
                }
                if(!json.success){
                    setAuth(false);
                    console.log("ERROR: request not accepted");
                }
            })
    }

    const removeRequest = async () => {
        console.log("removing request")
        fetch(api + 'removeRequest', {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              session: cookies.get('session'),
              username: props.username
            })
        })
            .then(res => res.json())
                .then(json => {
                    if(json.success){
                        console.log("SUCCESS: request removed" );
                    }
                    if(!json.success){
                        setAuth(false);
                        console.log("ERROR: failed to remove request");
                    }
                })
    }

    return (
        <div className='usercard-container'>
            <div className='usercard-profilepic'></div>
            <div className='usercard-username'>
                @{props.username}
            </div>
            <div className='usercard-button-container'>
                {statusbtn}
            </div>
        </div>
    )
}