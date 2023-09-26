import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserAboutComponent from "../../components/dashboard/UserAboutComponent.jsx";
import EventCardProfile from "../../components/dashboard/EventCardProfile.jsx";
import Starter from "../../components/userComponent/Starter.jsx";
import ProfileCard from "../../components/ProfileCard.jsx";
import { UserProfile } from "../../services/apiService.jsx";

const ProfileGuest = () => {
    const [userData, setUserData] = useState(null);
    const [userEvents, setUserEvents] = useState([]);
    const { idUser } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserProfile(idUser);
                if (response.success) {
                    setUserData(response.data.User);
                    setUserEvents(response.data.UserEvents);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchData();
    }, [idUser]);

    const content = (
        <div>
            <ProfileCard user={userData} />
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                <div className="md:w-1/3">
                    {userData && <UserAboutComponent userData={userData}/>}
                </div>
                <div className="flex flex-col md:w-2/3 space-y-6">
                    {userEvents && userEvents.map(event => (
                        <EventCardProfile key={event.id} event={event} userData={userData}/>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <Starter Content={content} />
    );
};

export default ProfileGuest;
