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
            console.log("Reducer received step one data:", action.payload);
            return {
                ...state,
                stepOne: {
                    ...state.stepOne,
                    ...action.payload
                },
            };

        case ActionTypes.UPDATE_STEP_TWO:
            console.log("Reducer received step two data:", action.payload);
            return {
                ...state,
                stepTwo: {
                    ...state.stepTwo,
                    ...action.payload
                },
            };

        case ActionTypes.UPDATE_STEP_THREE:
            console.log("Reducer received step three data:", action.payload);
            return {
                ...state,
                stepThree: {
                    ...state.stepThree,
                    ...action.payload
                },
            };

        case ActionTypes.CREATE_EVENT:
            console.log("Reducer received events data:", action.payload);
            return {
                ...state,
                eventData: action.payload
            };

        default:
            return state;
    }
};

export default eventReducer;
