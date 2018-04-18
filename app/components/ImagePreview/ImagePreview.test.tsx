import * as React from 'react';
import {mount} from 'enzyme';
import ImagePreview from './';

it('renders an image tag with the correct src attribute', () => {
  const wrapper = mount(<ImagePreview src="/path/to/image/file" />);
  expect(wrapper.find('img').prop('src')).toEqual('/path/to/image/file');
});
