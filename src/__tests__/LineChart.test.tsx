import { render, screen } from '@testing-library/react';
import LineChart from '../components/Charts/LineChart';
import ResizeObserver from 'resize-observer-polyfill';
import { mockData } from '../data/mockdata';

window.ResizeObserver = ResizeObserver;

describe('BarChart component', () => {
  it('renders the component', () => {
    render(<LineChart label={mockData} category="Test Category" />);
    const chartElement = screen.getByTestId('line-chart');
    expect(chartElement).toBeInTheDocument();
    expect(chartElement.tagName).toBe('CANVAS');
  });
});
