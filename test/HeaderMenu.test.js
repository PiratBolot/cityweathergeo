import React from 'react';
import {mount} from '../enzyme/enzyme';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "../src/reducers/Reducers";
import thunk from "redux-thunk";
import toJson from "enzyme-to-json";
import HeaderMenu from "../src/components/headerMenu/HeaderMenu";

describe('Header Menu', () => {
    const initialState = {
        trackedCities: ['Syktyvkar', 'Moscow', 'Kiev'],
        errorMessage: {isError: false, errorMsg: ""},
        geolocation: {}
    };
    let store,wrapper;
    beforeEach(()=>{
        store = createStore(rootReducer, initialState, applyMiddleware(thunk));
        wrapper = mount( <Provider store={store}><HeaderMenu /></Provider> );
    })
    it('+++capturing Snapshot of HeaderMenu', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});