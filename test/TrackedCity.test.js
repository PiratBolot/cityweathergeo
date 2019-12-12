import React from 'react';
import {shallow} from '../enzyme/enzyme';
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../src/reducers/Reducers";
import thunk from "redux-thunk";
import toJson from "enzyme-to-json";
import TrackedCity from "../src/components/trackedCitiesPanel/trackedCity/TrackedCity";

describe('Tracked City', () => {
    const city = "Syktyvkar";
    const initialState = {
        trackedCities: ['Syktyvkar', 'Moscow', 'Kiev'],
        errorMessage: {isError: false, errorMsg: ""},
        geolocation: {}
    };
    let store,wrapper;
    beforeEach(()=>{
        store = createStore(rootReducer, initialState, applyMiddleware(thunk));
        wrapper = shallow(<TrackedCity city={city} store={store} />);
    });
    it('+++capturing Snapshot of TrackedCity', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});