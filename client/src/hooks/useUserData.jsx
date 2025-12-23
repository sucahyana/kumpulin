import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUserData} from "../store/actions/user.js";

function useUserData() {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.data && state.user.data.user);

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    return userData;
}
