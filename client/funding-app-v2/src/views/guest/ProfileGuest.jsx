import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import UserAboutComponent from "../../components/dashboard/UserAboutComponent.jsx";
import EventCardProfile from "../../components/dashboard/EventCardProfile.jsx";
import Starter from "../../components/userComponent/Starter.jsx";
import ProfileCard from "../../components/ProfileCard.jsx";
import {UserProfile} from "../../services/apiService.jsx";
import {Button} from "primereact/button";
import {IoIosArrowDown, IoIosArrowForward} from 'react-icons/io';
import { useSpring, animated } from 'react-spring';

const ProfileGuest = () => {
    const [userData, setUserData] = useState(null);
    const [userEvents, setUserEvents] = useState([]);
    const {idUser} = useParams();
    const [isUserAboutVisible, setIsUserAboutVisible] = useState(false);

    const toggleUserAboutVisibility = () => {
        setIsUserAboutVisible(!isUserAboutVisible);
    };

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

    useEffect(() => {
        const handleResize = () => {
            setIsUserAboutVisible(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const userAboutAnimation = useSpring({
        height: isUserAboutVisible ? 'auto' : 0,
        opacity: isUserAboutVisible ? 1 : 0,
        transform: `scale(${isUserAboutVisible ? 1 : 0.8})`,
        config: {tension: 200, friction: 20},
    });

    const content = (
        <div>
            <ProfileCard user={userData}/>
            <div className="relative flex flex-col p-2 sm:p-0 md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                <div className="md:w-1/3">
                    {userData && (
                        <div>
                            <Button
                                className={`absolute -top-12 sm:-top-32 opacity-80 right-1 md:hidden`}
                                onClick={toggleUserAboutVisibility}
                                outlined severity="info"
                                icon={isUserAboutVisible ? <IoIosArrowDown className="text-xl"/> : <IoIosArrowForward/>}
                            >
                            </Button>
                            <animated.div style={userAboutAnimation}>
                                {isUserAboutVisible && <UserAboutComponent userData={userData}/>}
                            </animated.div>
                        </div>
                    )}
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
        <Starter Content={content}/>
    );
};

export default ProfileGuest;
