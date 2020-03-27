import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  
});

test('renders save to reload', () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/save to reload/i);
  expect(textElement).toBeInTheDocument();
});
