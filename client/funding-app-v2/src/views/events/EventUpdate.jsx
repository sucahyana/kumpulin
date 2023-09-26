import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getEventByCode} from '../../services/apiService';

import UpdateEvent from "../../components/Event/Update/UpdateEvent.jsx";
import ParticipantUpdateEvent from "../../components/Event/Update/ParticipantUpdate.jsx";
import {QueryClientProvider, QueryClient} from 'react-query';
import Starter from "../../components/userComponent/Starter.jsx";

const EventUpdate = () => {
    const {eventCode} = useParams();
    const currentUser = useSelector(state => state.user?.data?.user);
    const [eventData, setEventData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const queryClient = new QueryClient();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const {data} = await getEventByCode(eventCode);
                setEventData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventCode]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching event data: {error.message}</p>;
    if (!eventData) return <p>Event not found.</p>;
    if (!currentUser || currentUser.id !== eventData.id_user) return <p>You don't have permission to update this
        event.</p>;


    return (
        <QueryClientProvider client={queryClient}>
            <Starter Content={<ParticipantUpdateEvent {...eventData} />} {...eventData} />

        </QueryClientProvider>
    );
};

export default EventUpdate;
