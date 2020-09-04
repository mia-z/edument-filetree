import React from 'react';
import { create } from 'react-test-renderer';
import App from './App';

test('Makes sure the root component renders without crashing', () => {
  const app = () => create(<App />);
  expect(app).toMatchSnapshot(App);
});
