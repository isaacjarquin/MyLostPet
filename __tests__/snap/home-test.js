import 'react-native';
import React from 'react';
import Home from '../../screens/home';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Home />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
