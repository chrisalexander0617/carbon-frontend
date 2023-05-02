import { render, screen } from '@testing-library/react';
import BarChart from '../components/Charts/BarChart';
import ResizeObserver from 'resize-observer-polyfill';

window.ResizeObserver = ResizeObserver;

const barChartData = [
  {
    time: {
      interval_start: "2021-01-01T00:00:00Z",
      max: "2021-01-29T21:51:19.181000Z",
      min: "2021-01-01T22:12:39.599000Z"
    },
    value: {
      average: 1872.0090903185924,
      count: 2289,
      max: 1955.212646484375,
      min: 1793.67919921875,
      "standard deviation": 18.866792864032956
    }
  }
]

describe('BarChart component', () => {
  const mockCategory = 'Test Category';

  beforeAll(() => {
  });

  it('renders the component', () => {
    window.ResizeObserver = ResizeObserver;

    const { getByTestId } = render(<BarChart label={barChartData} category={mockCategory} />);
    expect(getByTestId('bar-chart')).toBeInTheDocument();
  });

  screen.debug()
});
