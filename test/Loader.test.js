import React from 'react';
import { shallow } from '../enzyme/enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Loader from "../src/components/preLoader/Loader";

describe('Pre-Loader', () => {
    it('should render correctly', () => {
        const output = shallow(
            <Loader />
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});