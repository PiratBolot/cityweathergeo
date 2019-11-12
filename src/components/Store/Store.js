import {createStore} from 'redux'
import {CityReducer} from './trackedCities/CityReducer';

const _loadState = () => JSON.parse(localStorage.state || "[]");
const _storeState = (state) => localStorage.state = JSON.stringify(state);

let persistentState = _loadState();
const Store = createStore(CityReducer);
Store.subscribe(() => {
    _storeState(Store.getState());
});

export default Store;