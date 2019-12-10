import React from 'react';
import {mount} from '../enzyme/enzyme';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "../src/reducers/Reducers";
import thunk from "redux-thunk";
import toJson from "enzyme-to-json";
import ErrorLine from "../src/components/errorLine/ErrorLine";

describe('Error Line', () => {
    const initialState = {
        trackedCities: ['Syktyvkar', 'Moscow', 'Kiev'],
        errorMessage: {isError: true, errorMsg: "Tests crushed"},
        geolocation: {}
    };
    let store,wrapper;
    beforeEach(()=>{
        store = createStore(rootReducer, initialState, applyMiddleware(thunk));
        wrapper = mount( <Provider store={store}><ErrorLine /></Provider> );
    })
    it('+++capturing Snapshot of ErrorLine', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});