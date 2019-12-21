import {applyMiddleware, createStore} from 'redux'
import rootReducer from "../reducers/Reducers";
import thunk from "redux-thunk";

let initialState = {
    trackedCities: [],
    errorMessage: {isError: false, errorMsg: ""},
    geolocation: {}
};

export default function configureStore() {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
};
