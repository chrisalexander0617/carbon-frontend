import { render, screen } from '@testing-library/react';
import BarChart from '../components/Charts/BarChart';
import ResizeObserver from 'resize-observer-polyfill';
import { mockData } from '../data/mockdata';

window.ResizeObserver = ResizeObserver;

describe('BarChart component', () => {
  it('renders the component', () => {
    render(<BarChart label={mockData} category="Test Category" />);
    const chartElement = screen.getByTestId('bar-chart');
    expect(chartElement).toBeInTheDocument();
    expect(chartElement.tagName).toBe('CANVAS');
  });
});
