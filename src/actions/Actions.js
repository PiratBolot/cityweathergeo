import * as actionTypes from '../constants/ActionTypes';
import * as errorTypes from '../constants/ErrorMessageTypes';

function addCity(city) {
    return {
        type: actionTypes.ADD_CITY,
        city
    };
}

export function addTrackedCity(city) {
    return function (dispatch, getState) {
        if (getState().trackedCities.indexOf(city) !== -1) {
            return false;
        }
        dispatch(addCity(city));
        return true;
    }
}

function deleteCity(city) {
    return {
        type: actionTypes.DELETE_CITY,
        city
    };
}

export function deleteTrackedCity(city) {
    return function (dispatch, getState) {
        return dispatch(deleteCity(city));
    };
}

function setError(msg) {
    return {
        type: errorTypes.UPDATE_ERROR,
        data: {
            isError: true,
            errorMsg: msg
        }
    }
}

export function setErrorState(msg) {
    return function (dispatch, getState) {
        dispatch(setError(msg));
    };
}

function setNoError() {
    return {
        type: errorTypes.NO_ERROR,
        data: {
            isError: false,
            errorMsg: ""
        }
    }
}

export function setSuccessState() {
    return function (dispatch, getState) {
        dispatch(setNoError());
    };
}