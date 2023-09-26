import ActionType from '../actionType'
import apiService from "../../services/apiService.jsx";

export const setAuth = ({token}) => ({
    type: ActionType.SET_AUTH,
    payload: {token},
})

export const setUser = (data) => ({
    type: ActionType.SET_USER,
    payload: {data},
})

export const resetUser = () => ({
    type: ActionType.RESET_USER,
})

export const fetchUserData = () => async dispatch => {
    try {
        const response = await apiService.get('/user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        dispatch(setUser(response.data.data));
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};
