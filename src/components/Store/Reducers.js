import { combineReducers } from 'redux'
import ErrorReducer from "./errors/ErrorReducer";
import {CityReducer} from "./trackedCities/CityReducer";

const globalReducer = combineReducers({
    ErrorReducer,
    CityReducer
});

export default globalReducer;