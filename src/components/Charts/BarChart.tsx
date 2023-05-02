import { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IMethaneData } from '../../types/methane';
import { convertToReadableDateFormat } from '../../utils';
import { theme } from '../../../src/app/theme'
import * as MUI from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = (props: { label: IMethaneData[], category: string }) => {

  const { label, category } = props;

  const mappedDataForLabelsByDate = label.map((item) => (
    convertToReadableDateFormat(item.time.interval_start)
  ))

  const averages = label.map((item) => (
    item.value.max
  ))

  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const chartRef = useRef<any>();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const data = {
    labels: mappedDataForLabelsByDate,
    datasets: [
      {
        label: category,
        data: averages,
        backgroundColor: theme.palette.chart.default
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


  return (
    <Bar options={options} data={data} width={chartDimensions.width} height={chartDimensions.height} />
  );
}
