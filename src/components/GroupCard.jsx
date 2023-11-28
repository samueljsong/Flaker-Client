import '../style/GroupCard.css'

//dependencies
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'


export const GroupCard = (props) => {
    const navigate = useNavigate()

    const onFriendGroupClick = () => {
        navigate('/calendar')
    }

    return (
        <motion.div className='groupcard-container'
            whileHover={{
                y: -5
            }}
            whileTap={{
                scale: 0.95
            }}
            onClick={onFriendGroupClick}>
                <h1>{props.name}</h1>
        </motion.div>
    )
}