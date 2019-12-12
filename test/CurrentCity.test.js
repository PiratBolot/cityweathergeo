import React from 'react';
import {shallow} from '../enzyme/enzyme';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "../src/reducers/Reducers";
import thunk from "redux-thunk";
import toJson from "enzyme-to-json";
import CurrentCity from "../src/components/currentCity/CurrentCity";

describe('Current City', () => {
    const initialState = {
        trackedCities: ['Syktyvkar', 'Moscow', 'Kiev'],
        errorMessage: {isError: false, errorMsg: ""},
        geolocation: {}
    };
    let store, wrapper;
    beforeEach(()=>{
        store = createStore(rootReducer, initialState, applyMiddleware(thunk));
        wrapper = shallow(<CurrentCity store={store}/>);
    })
    it('+++capturing Snapshot of CurrentCity', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});