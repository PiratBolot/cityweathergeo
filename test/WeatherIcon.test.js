import React from 'react';
import { shallow } from '../enzyme/enzyme';
import { shallowToJson } from 'enzyme-to-json';

import WeatherIcon from "../src/components/cityProps/weatherIcon/WeatherIcon";

describe('Weather Icon', () => {
    const iconCode = "04n";

    it('should render correctly', () => {
        const output = shallow(
            <WeatherIcon icon={iconCode}/>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});