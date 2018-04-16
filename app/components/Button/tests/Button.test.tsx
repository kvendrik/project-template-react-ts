import * as React from 'react';
import {mount} from 'enzyme';
import Button from '../';

it('renders children', () => {
  const wrapper = mount(<Button>Click me!</Button>);
  expect(wrapper.text()).toEqual('Click me!');
});
