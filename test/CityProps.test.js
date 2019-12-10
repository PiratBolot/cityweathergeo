import React from 'react';
import { shallow } from '../enzyme/enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CityProps from "../src/components/cityProps/CityProps";
import apiResponseExample from "./inputDataExample/apiResponseExample";

describe('City Properties', () => {
    const apiResponse = apiResponseExample();

    it('should render Current City properties correctly', () => {
        const cityName = "Syktyvkar";
        const output = shallow(
            <CityProps isCurrentCity={true} city={cityName} data={apiResponse}/>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });

    it('should render Tracked City properties correctly', () => {
        const cityName = "Moscow";
        const output = shallow(
            <CityProps isCurrentCity={false} city={cityName} data={apiResponse} />
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});