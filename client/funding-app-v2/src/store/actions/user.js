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

export const fetchUserDataError = (error) => ({
    type: ActionType.FETCH_USER_DATA_ERROR,
    payload: {error},
})

export const fetchUserData = (token) => async dispatch => {
    try {
        const response = await apiService.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch(setUser(response.data.data));
    } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(fetchUserDataError(error.message || "Failed to fetch user data."));

        // Hanya memanggil resetUser jika kesalahan berkaitan dengan autentikasi
        if (error.response && error.response.status === 401) { // Anggap saja kode status 401 menandakan token tidak valid
            dispatch(resetUser());
        }
    }
};

