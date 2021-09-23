import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '~/App';
import {BrowserRouter} from 'react-router-dom';

test('renders Header', () => {
  const {getByText, getAllByText} = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  expect(getAllByText(/ContactsPage/i)[0]).toHaveClass('active');
  expect(getByText(/PreviewComponentsPage/i)).toBeInTheDocument();
});

test('renders Footer', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const allRightsElement = screen.getByText(/all rights reserved/i);
  expect(allRightsElement).toBeInTheDocument();
});
