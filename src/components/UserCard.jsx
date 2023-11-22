import '../style/UserCard.css'

import plus from '../assets/plus.png'

export const UserCard = (props) => {

    return (
        <div className='usercard-container'>
            <div className='usercard-profilepic'></div>
            <div className='usercard-username'>
                @{props.username}
            </div>
            <div className='usercard-button-container'>
                <div className='usercard-button'>
                    <img src={plus} className='usercard-icon' alt="" />
                    add
                </div>
            </div>
        </div>
    )
}