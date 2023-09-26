import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../views/Auth/Home.jsx';
import Login from '../views/Auth/Login';
import Register from '../views/Auth/Register';
import Profile from '../views/users/Profile';
import ProfileSetting from '../views/users/ProfileSetting.jsx';
import RequireAuth from "../middleware/RequireAuth.jsx";
import RedirectIfAuthenticated from "../middleware/RedirectIfAuthenticated.jsx";
import RedirectOwnProfile from "../middleware/RedirectOwnProfile.jsx";
import Event from "../views/events/Event.jsx";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../store/actions/user.js";
import EventUpdate from "../views/events/EventUpdate.jsx";
import ProfileGuest from "../views/guest/ProfileGuest.jsx";
import Search from "../views/Search.jsx";

const AppRoutes = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(fetchUserData());
        }
    }, [dispatch]);


    return (
        <Routes>
            <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/login" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />
            <Route path="/register" element={<RedirectIfAuthenticated><Register /></RedirectIfAuthenticated>} />
            <Route path="/profile/setting" element={<RequireAuth><ProfileSetting /></RequireAuth>} />
            <Route path="/profile/:idUser" element={<RequireAuth><RedirectOwnProfile><ProfileGuest /></RedirectOwnProfile></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/search" element={<RequireAuth><Search /></RequireAuth>} />
            <Route path="/event/:eventCode" element={<RequireAuth><Event /></RequireAuth>} />
            <Route path="/event/:eventCode/update" element={<RequireAuth><EventUpdate /></RequireAuth>} />
        </Routes>
    );
};

export default AppRoutes;
