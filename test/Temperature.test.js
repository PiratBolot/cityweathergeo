import React from 'react';
import { shallow } from '../enzyme/enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Temperature from "../src/components/cityProps/temperature/Temperature";

describe('Temperature', () => {
    const temperature = 276.15;

    it('should render correctly', () => {
        const output = shallow(
            <Temperature temp={temperature} />
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});