import React from 'react';
import {mount} from '../enzyme/enzyme';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "../src/reducers/Reducers";
import thunk from "redux-thunk";
import toJson from "enzyme-to-json";
import RemoveCityButton from "../src/components/cityProps/removeCityButton/RemoveCityButton";

describe('Remove City Button', () => {
    const city = "Syktyvkar";
    const initialState = {
        trackedCities: ['Syktyvkar', 'Moscow', 'Kiev'],
        errorMessage: {isError: false, errorMsg: ""},
        geolocation: {}
    };
    let store,wrapper;
    beforeEach(()=>{
        store = createStore(rootReducer, initialState, applyMiddleware(thunk));
        wrapper = mount( <Provider store={store}><RemoveCityButton city={city} /></Provider> );
    });
    it('+++capturing Snapshot of RemoveCityButton', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});