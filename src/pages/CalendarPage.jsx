//dependencies
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

//libraries
import Calendar from 'react-calendar';


//style
import '../style/CalendarPage.css'
import '../style/Calendar.css'

export const CalendarPage = (props) => {
    const navigate = useNavigate();
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        if (!props.auth) {
            navigate('/');
        }
    }, [props.auth])

    return(
        <div className='cp-container'>
            <div className='cp-dropdown'></div>
            <div className='cp-calendar-container'>
                <Calendar calendarType='gregory' onChange={onChange} value={value} />
            </div>
        </div>
    )
}