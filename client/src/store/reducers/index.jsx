import { combineReducers } from 'redux';
import reducerUser from "./user.js";
import eventReducer from "./eventReducer.js";

const rootReducer = combineReducers({
    user: reducerUser,
    event: eventReducer,
});

export default rootReducer;
