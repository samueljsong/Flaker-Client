//dependencies
import { useNavigate } from 'react-router-dom'

//style
import '../style/CalendarPage.css'

export const CalendarPage = (props) => {
    const navigate = useNavigate();

    if (!props.auth) {
        navigate('/');
    }

    return(
        <div></div>
    )
}