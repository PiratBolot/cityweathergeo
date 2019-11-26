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

function setUpdateErrorState(msg) {
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
        dispatch(setUpdateErrorState(msg));
    };
}

function resetErrorState() {
    return {
        type: errorTypes.NO_ERROR,
        data: {
            isError: false,
            errorMsg: ""
        }
    }
}

export function resetError() {
    return function (dispatch, getState) {
        dispatch(resetErrorState());
    };
}

function setGeolocation(position) {
    return {
        type: actionTypes.GET_GEOLOCATION,
        currentPosition: position
    }
}

export function getGeolocation() {
    return dispatch =>
        new Promise(
            (resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            dispatch(resetError());
                            dispatch(setGeolocation(position.coords));
                        },
                        (e) => {
                            dispatch(setErrorState(e.message));
                            dispatch(setGeolocation({latitude: 61.666668, longitude: 50.816666}));
                        },
                        {enableHighAccuracy: false, timeout: 20000, maximumAge: 0}
                    );
                } else {
                    dispatch(setErrorState("Геолокация не поддерживается вашим браузером"));
                }
            }
        )
}