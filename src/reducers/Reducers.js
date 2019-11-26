import {combineReducers} from 'redux'
import * as actionTypes from '../constants/ActionTypes';

const trackedCities = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_CITY:
            return state.concat([action.city]);
        case actionTypes.DELETE_CITY:
            return state.filter(el => el !== action.city);
        default:
            return state;
    }
};

const errorMessage = (state, action = {}) => {
    return Object.assign({}, state, action.data);
};

const rootReducer = combineReducers({
    trackedCities,
    errorMessage
});

export default rootReducer;