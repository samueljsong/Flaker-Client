import '../style/UserCard.css'

import plus from '../assets/plus.png'
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export const UserCard = (props) => {

    // statuses: 0 = no request, 1 = request sent, 2 = request retrieved, 3 = friends
    const [status, setStatus] = useState(0);

    const getStatus = async () => {
        fetch(api + 'getStatus', {
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
                    console.log("SUCCESS: retrieved friend status" );
                }
                if(!json.success){
                    console.log("ERROR: failed to retrieve friend status");
                }
            })
    }

    useEffect(() => {
        buttonStatus();
    }, [status])

    let statusbutton = (
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
    const buttonStatus = () => {
        switch (status) {
            case 0: // no request
                statusbutton = (
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
            case 1: // request sent
                statusbutton = (
                    <motion.div className='usercard-button'
                    whileHover={{
                        backgroundColor: "#3b5d6f"
                    }}
                    whileTap={{
                        scale:0.95
                    }}
                    onClick={() => sendRequest()}>
                        <img src={plus} className='usercard-icon' alt="" />
                        remove
                    </motion.div>
                );
            case 2: // request got
                statusbutton = (
                    <motion.div className='usercard-button'
                    whileHover={{
                        backgroundColor: "#3b5d6f"
                    }}
                    whileTap={{
                        scale:0.95
                    }}
                    onClick={() => sendRequest()}>
                        <img src={plus} className='usercard-icon' alt="" />
                        accept
                    </motion.div>
                );
            case 3: // friends
                statusbutton = (
                    <motion.div className='usercard-button'
                    whileHover={{
                        backgroundColor: "#3b5d6f"
                    }}
                    whileTap={{
                        scale:0.95
                    }}
                    onClick={() => sendRequest()}>
                        <img src={plus} className='usercard-icon' alt="" />
                        remove
                    </motion.div>
                )
                
                
        }
    }

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
              username: props.username
            })
        })
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    console.log("SUCCESS: request sent" );
                }
                if(!json.success){
                    setAuth(false);
                    console.log("ERROR: request not sent");
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
                {statusbutton}
            </div>
        </div>
    )
}