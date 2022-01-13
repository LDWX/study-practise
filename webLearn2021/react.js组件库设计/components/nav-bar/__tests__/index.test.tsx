import React from 'react';
import renderer from 'react-test-renderer';
import NavBar from '../';

test('NavBar 测试', () => {
  const component = renderer.create(<NavBar title="hello jest" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
