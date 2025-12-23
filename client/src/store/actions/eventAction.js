import ActionTypes from "../actionType.js";


export const setCurrentStep = (step) => ({
    type: ActionTypes.SET_CURRENT_STEP,
    payload: step,
});


export const incrementStep = () => ({
    type: ActionTypes.INCREMENT_STEP,
});

export const updateStepOne = (data) => ({
    type: ActionTypes.UPDATE_STEP_ONE,
    payload: data,
});

export const updateStepTwo = (data) => ({
    type: ActionTypes.UPDATE_STEP_TWO,
    payload: data,
});

export const updateStepThree = (data) => ({
    type: ActionTypes.UPDATE_STEP_THREE,
    payload: data,
});
export const createEvent = (eventData) => ({
    type: ActionTypes.CREATE_EVENT,
    payload: eventData
});