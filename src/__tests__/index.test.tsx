import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Home from '@/pages/index';

const mockData = [
  {
    no: '1',
    line: '1',
    count: 10,
    stops: [
      'Hjulsta',
      'Tensta centrum',
      'Rinkeby',
      'Duvbo',
      'Solna centrum',
      'Odenplan',
      'Stureplan',
      'Kungsträdgården',
      'Slussen',
      'Gamla stan',
    ],
  },
  {
    no: '2',
    line: '2',
    count: 20,
    stops: [
      'Hjulsta',
      'Tensta centrum',
      'Rinkeby',
      'Duvbo',
      'Solna centrum',
      'Odenplan',
      'Stureplan',
      'Kungsträdgården',
      'Slussen',
      'Gamla stan',
    ],
  },
];
describe('Home', () => {
  it('renders the component', () => {
    render(<Home data={mockData} />);
  });

  it('renders the heading text', () => {
    render(<Home data={mockData} />);
    const heading = screen.getByText('Top 10 Bus Lines');
    expect(heading).toBeInTheDocument();
  });

  it('renders the TableComponent when data exists', () => {
    render(<Home data={mockData} />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});
