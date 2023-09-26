import ActionType from '../actionType';

const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
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
                isAuthenticated: true,
                token: token,
                data: null,
            };
        case ActionType.RESET_USER:
            localStorage.removeItem('token');
            return initialState;
        default:
            return state;
    }
};

export default reducerUser;
