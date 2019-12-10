import React from 'react';
import {mount} from '../enzyme/enzyme';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "../src/reducers/Reducers";
import thunk from "redux-thunk";
import toJson from "enzyme-to-json";
import TrackedCity from "../src/components/trackedCitiesPanel/trackedCity/TrackedCity";
import TrackedCitiesPanel from "../src/components/trackedCitiesPanel/TrackedCitiesPanel";

describe('Tracked Cities Panel', () => {
    const initialState = {
        trackedCities: ['Syktyvkar', 'Moscow', 'Kiev'],
        errorMessage: {isError: false, errorMsg: ""},
        geolocation: {}
    };
    let store,wrapper;
    beforeEach(()=>{
        store = createStore(rootReducer, initialState, applyMiddleware(thunk));
        wrapper = mount( <Provider store={store}><TrackedCitiesPanel /></Provider> );
    });
    it('+++capturing Snapshot of TrackedCitiesPanel', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});