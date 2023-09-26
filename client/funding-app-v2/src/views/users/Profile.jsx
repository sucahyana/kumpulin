import React from 'react';
import { useSelector } from 'react-redux';
import UserAboutComponent from "../../components/dashboard/UserAboutComponent.jsx";
import EventCardProfile from "../../components/dashboard/EventCardProfile.jsx";
import Starter from "../../components/userComponent/Starter.jsx";
import ProfileCard from "../../components/ProfileCard.jsx";

const Profile = () => {
    const userEvents = useSelector(state => state.user.data.UserEvents);
    const userData = useSelector(state => state.user.data && state.user.data.user);
    const Accept = true;
    const content = (
        <div>
            <ProfileCard user={userData}/>
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                <div className="md:w-1/3">
                    <UserAboutComponent userData={userData} showEditButton={Accept}/>
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

export default Profile;
