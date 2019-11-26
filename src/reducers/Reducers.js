import {combineReducers} from 'redux'
import * as actionTypes from '../constants/ActionTypes';
import * as errorMessageTypes from '../constants/ErrorMessageTypes'

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

const errorMessage = (state = {}, action = {}) => {
    switch (action.type) {
        case errorMessageTypes.NO_ERROR:
            return Object.assign({}, state, action.data);
        case errorMessageTypes.UPDATE_ERROR:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }

};

const geolocation = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.GET_GEOLOCATION:
            return {...state, currentPosition: action.currentPosition};
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    trackedCities,
    errorMessage,
    geolocation
});

export default rootReducer;