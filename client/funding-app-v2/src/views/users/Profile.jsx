import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserAboutComponent from "../../components/dashboard/UserAboutComponent.jsx";
import EventCardProfile from "../../components/dashboard/EventCardProfile.jsx";
import Starter from "../../components/userComponent/Starter.jsx";
import ProfileCard from "../../components/ProfileCard.jsx";
import { Button } from "primereact/button";
import { useSpring, animated } from 'react-spring';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';

const Profile = () => {
    const userEvents = useSelector(state => state.user?.data?.UserEvents);
    const userData = useSelector(state => state.user?.data?.user);
    const Accept = true;
    const [isUserAboutVisible, setIsUserAboutVisible] = useState(false);

    const toggleUserAboutVisibility = () => {
        setIsUserAboutVisible(!isUserAboutVisible);
    };

    const userAboutAnimation = useSpring({
        height: isUserAboutVisible ? 'auto' : 0,
        opacity: isUserAboutVisible ? 1 : 0,
        transform: `scale(${isUserAboutVisible ? 1 : 0.8})`,
        config: { tension: 200, friction: 20 },
    });

    useEffect(() => {
        const handleResize = () => {
            setIsUserAboutVisible(window.innerWidth > 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const content = (
        <div>
            {userData && <ProfileCard user={userData} />}
            <div className="relative flex flex-col p-2 sm:p-0 md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                <div className="md:w-1/3">
                    {userData && (
                        <div>
                            <Button
                                className={`absolute -top-12 sm:-top-32 opacity-80 right-1 md:hidden`}
                                onClick={toggleUserAboutVisibility}
                                outlined severity="info"
                                icon={isUserAboutVisible ? <IoIosArrowDown className="text-xl" /> : <IoIosArrowForward />}
                            >
                            </Button>
                            <animated.div style={userAboutAnimation}>
                                <UserAboutComponent userData={userData} showEditButton={Accept} />
                            </animated.div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col md:w-2/3 space-y-6">
                    {userEvents && userEvents.map(event => (
                        <EventCardProfile key={event.id} event={event} userData={userData} />
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
