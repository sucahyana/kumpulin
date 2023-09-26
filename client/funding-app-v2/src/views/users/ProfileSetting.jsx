import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../store/actions/user';
import apiService from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import UserAboutComponent from "../../components/dashboard/UserAboutComponent.jsx";
import EventCardProfile from "../../components/dashboard/EventCardProfile.jsx";
import Starter from "../../components/userComponent/Starter.jsx";
import SettingTabComponent from "../../components/dashboard/TabsComponent/SettingTabComponent.jsx";
import ProfileCard from "../../components/ProfileCard.jsx";

const Profile = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.user);
    const navigate = useNavigate();

    const handleLogout = async () => {
        dispatch(resetUser());
        await apiService.delete('auth/logout', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        navigate('/login');
    };
    const userEvents = useSelector(state => state.user.data.UserEvents);
    const userData = useSelector(state => state.user.data && state.user.data.user);
    const content = (
        <div>
            <ProfileCard user={userData}/>
            <SettingTabComponent />
        </div>
    );

    return (
        <Starter Content={content} />
    );
};

export default Profile;
