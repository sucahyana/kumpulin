import ActionType from '../actionType';

const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
    data: {
        user: null
    },
};

const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                data: action.payload.data,
            };

        case ActionType.SET_AUTH:
            const { token } = action.payload;

            if (token) {
                localStorage.setItem('token', token);
            }

            return {
                ...state,
                isAuthenticated: !!token,
                token: token,
            };

        case ActionType.RESET_USER:
            localStorage.removeItem('token');
            return {
                ...initialState,
                token: null
            };

        default:
            return state;
    }
};

export default reducerUser;
