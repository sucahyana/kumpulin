import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventDetail from '../../components/Event/EventDetail.jsx';
import EventTabComponent from '../../components/Event/TabsComponent/EventTabComponent.jsx';
import { getEventByCode } from '../../services/apiService';
import { Button } from 'primereact/button';
import Loader from "../../components/Loader.jsx";
import Starter from "../../components/userComponent/Starter.jsx";


const Event = () => {
    const { eventCode } = useParams();
    const [eventData, setEventData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvent = async () => {
        setLoading(true);
        try {
            const { data } = await getEventByCode(eventCode);
            setEventData(data);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [eventCode]);

    const contentStarter = () => (
        <EventDetail Content={<EventTabComponent eventData={eventData} />} eventData={eventData}>
            {loading && <Loader />}
            {error && (
                <div className="flex flex-col items-center justify-center h-screen">
                    <p>Error fetching event data: {error.message}</p>
                    <Button label="Retry" onClick={fetchEvent} />
                </div>
            )}
        </EventDetail>
    );
    return (
        <Starter Content={contentStarter()}/>
    )
};

export default Event;
