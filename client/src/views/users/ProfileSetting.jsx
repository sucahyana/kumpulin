import React from 'react';
import { useSelector } from 'react-redux';

import Starter from "../../components/userComponent/Starter.jsx";
import SettingTabComponent from "../../components/dashboard/TabsComponent/SettingTabComponent.jsx";
import ProfileCard from "../../components/ProfileCard.jsx";

const Profile = () => {
    const userData = useSelector(state => state.user?.data?.user);

    const content = (
        <div>
            {userData && <ProfileCard user={userData} />}
            <SettingTabComponent />
        </div>
    );

    return (
        <Starter Content={content} />
    );
};

export default Profile;
