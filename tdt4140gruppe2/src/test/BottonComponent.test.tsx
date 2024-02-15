//import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ButtonComponent from '../components/ButtonComponent';

describe('ButtonComponent', () => {
  test('renders a button', () => {
    render(<ButtonComponent />);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });
});