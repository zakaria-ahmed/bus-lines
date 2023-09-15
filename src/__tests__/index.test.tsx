/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Home from '@/pages/index';

describe('Home', () => {
  it('renders the component', () => {
    render(<Home />);
  });

  it('renders the heading text', () => {
    render(<Home />);
    const heading = screen.getByText('Top 10 Bus Lines');
    expect(heading).toBeInTheDocument();
  });

  it('renders the TableComponent when data exists', () => {
    render(<Home />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});
