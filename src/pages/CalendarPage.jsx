//dependencies
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

//style
import '../style/CalendarPage.css'

export const CalendarPage = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.auth) {
            navigate('/');
        }
    }, [props.auth])

    return(
        <div></div>
    )
}