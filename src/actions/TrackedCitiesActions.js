import * as types from '../constants/ActionTypes';

export function addTrackedCity(cityName) {
    return {
        type: types.ADD_CITY,
        city: cityName
    };
}

export function deleteTrackedCity(cityName) {
    return {
        types: types.DELETE_CITY,
        city: cityName
    };
}