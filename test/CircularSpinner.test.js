import React from 'react';
import { shallow } from '../enzyme/enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CircularSpinner from "../src/components/preLoader/spinner/CircularSpinner";

describe('Circular Spinner', () => {
    it('should render correctly', () => {
        const output = shallow(
            <CircularSpinner />
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});