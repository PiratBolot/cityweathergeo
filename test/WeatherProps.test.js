import React from 'react';
import { shallow } from '../enzyme/enzyme';
import { shallowToJson } from 'enzyme-to-json';

import WeatherProps from "../src/components/weatherProps/WeatherProps";
import parsedWeatherProps from "./inputDataExample/parsedWeatherProps";

describe('Weather Properties', () => {
    const parsedWeatherExample = parsedWeatherProps();

    it('should render correctly', () => {
        const output = shallow(
            <WeatherProps parsedWeather={parsedWeatherExample}/>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});

