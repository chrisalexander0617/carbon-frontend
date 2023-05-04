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
import BasicLoader from '../../components/Loaders/BasicLoader';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = (props: { label: IMethaneData[], category: string, isLoading: boolean, errorMessage: string | null }) => {
  const { label, category, isLoading, errorMessage } = props;

  const mappedDataForLabelsByDate = label.map((item) => (
    convertToReadableDateFormat(item.time.interval_start)
  ))

  const averages = label.map((item) => (
    item.value.max
  ))

  const options = {
    responsive: true,
    barPercentage: 0.5,

    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
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

  if (isLoading) return <BasicLoader message={errorMessage} height="500px" />;

  return (
    <Bar id="bar-chart" data-testid="bar-chart" options={options}
      data={data}
    />
  );
}

export default BarChart;