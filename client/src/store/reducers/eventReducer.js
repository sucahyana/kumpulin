import ActionTypes from "../actionType.js";

const initialState = {
    stepOne: {
        title: '',
        description: '',
        category: '',
    },
    stepTwo: {
        maxParticipants: 0,
        amountPerson: 0,
        startDate: '',
        endDate: '',
    },
    stepThree: {
        media: [],
    },
    currentStep: 1,
    eventData: {}
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_CURRENT_STEP:
            return { ...state, currentStep: action.payload };

        case ActionTypes.INCREMENT_STEP:
            return { ...state, currentStep: state.currentStep + 1 };

        case ActionTypes.UPDATE_STEP_ONE:
            return {
                ...state,
                stepOne: {
                    ...state.stepOne,
                    ...action.payload
                },
            };

        case ActionTypes.UPDATE_STEP_TWO:
            return {
                ...state,
                stepTwo: {
                    ...state.stepTwo,
                    ...action.payload
                },
            };

        case ActionTypes.UPDATE_STEP_THREE:
            return {
                ...state,
                stepThree: {
                    ...state.stepThree,
                    ...action.payload
                },
            };

        case ActionTypes.CREATE_EVENT:
            return {
                ...state,
                eventData: action.payload
            };

        default:
            return state;
    }
};

export default eventReducer;
