import '../style/PlanPage.css'

//dependencies
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const PlanPage = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!props.auth) {
            navigate('/');
        }
    }, [props.auth])

    return(
        <div className='pp-container'>
            <div className='pp-backdrop'></div>

        </div>
    )
}