import {applyMiddleware, createStore} from 'redux'
import {CityReducer} from './trackedCities/CityReducer';
import globalReducer from "./Reducers";
import thunk from "redux-thunk";

const _loadState = () => JSON.parse(localStorage.state || "[]");
const _storeState = (state) => localStorage.state = JSON.stringify(state);

let persistentState = _loadState();

let initialState = {
    ErrorReducer: null,
    CityReducer: persistentState
};

export default function configureStore(CityReducer) {
    let store = createStore(
        globalReducer,
        initialState,
        applyMiddleware(thunk)
    );
    store.subscribe(() => {
        _storeState(store.getState().CityReducer)
    });
    return store;
};
