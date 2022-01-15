import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Post from '../pages/post';

test('renders content', () => {
  render(<Post />);
  screen.debug();
  const title = screen.getByText(/Ver lista/i);
  expect(title).toBeInTheDocument();
});
