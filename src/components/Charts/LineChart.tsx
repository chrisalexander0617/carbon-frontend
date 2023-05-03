import { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { IMethaneData } from '../../types/methane';
import { convertToReadableDateFormat } from '../../utils';
import { theme } from "../../../src/app/theme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  pointRadius: 5,
  hoverRadius: 10,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false
    },
  },
};


const LineChart = (props: { label: IMethaneData[], category: string }) => {

  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const chartRef = useRef<any>();

  const { label, category } = props;

  const mappedDataForLabelsByDate = label.map((item) => (
    convertToReadableDateFormat(item.time.interval_start)
  ))

  const averages = label.map((item) => (
    item.value.max
  ))

  const data = {
    labels: mappedDataForLabelsByDate,
    datasets: [
      {
        label: category,
        data: averages,
        backgroundColor: '#46abc2',
        borderColor: theme.palette.secondary.main,
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current?.chartInstance;
    if (chart) {
      const updateChartDimensions = () => {
        const width = chartRef.current.offsetWidth;
        const height = chartRef.current.offsetHeight;
        setChartDimensions({ width, height });
      };
      window.addEventListener('resize', updateChartDimensions);
      return () => window.removeEventListener('resize', updateChartDimensions);
    }
  }, [chartRef]);


  return <Line id="line-chart" data-testid="line-chart" options={options} data={data} />;
}

export default LineChart