import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchUserData} from "../../store/actions/user.js";



const withUserData = (WrappedComponent) => {
    return (props) => {
        const dispatch = useDispatch();
        const userData = useSelector(state => state.user.data && state.user.data.user);

        useEffect(() => {
            dispatch(fetchUserData());
        }, [dispatch]);

        return <WrappedComponent userData={userData} {...props} />;
    };
};

export default withUserData;
