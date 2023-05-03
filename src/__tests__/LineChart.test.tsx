import { render, screen } from '@testing-library/react';
import LineChart from '../components/Charts/LineChart';
import ResizeObserver from 'resize-observer-polyfill';

// Mock the ResizeObserver API for the component
window.ResizeObserver = ResizeObserver;

const mockData = [
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
];

describe('BarChart component', () => {
  it('renders the component', () => {
    render(<LineChart label={mockData} category="Test Category" />);
    const chartElement = screen.getByTestId('line-chart');
    expect(chartElement).toBeInTheDocument();
    expect(chartElement.tagName).toBe('CANVAS');
  });
});
