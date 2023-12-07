import '../style/PlanPage.css'

//dependencies
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ApiContext } from '../context/ApiContext';
import { PlanEventCard } from '../components/PlanEventCard';

export const PlanPage = (props) => {

    const api = useContext(ApiContext);
    const navigate = useNavigate();
    const [allEvents, setAllEvents] = useState([]);

    useEffect(() => {
        if (!props.auth) {
            navigate('/');
        }
    }, [props.auth])

    useEffect(() => {
        fetch(api + `event/getAllPlanEvents`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            }
        })
            .then(res => res.json())
            .then(json => {
                setAllEvents(json.result)
            })
    }, [])

    return(
        <div className='pp-container'>
            <div className='pp-backdrop'></div>

            <div className='pp-info-container'>
                <h1 className='pp-title'>Your Plans for Today</h1>
                <div className='pp-event-container'>
                    {
                        allEvents.map(event => {
                            return <PlanEventCard title={event.name} location={event.location} startTime={event.start_time} endTime={event.end_time} description={event.description}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}