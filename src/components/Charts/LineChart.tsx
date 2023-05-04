import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ICarbonMonoxideData } from '../../types/carbonmonoxide';
import { convertToReadableDateFormat } from '../../utils';
import { theme } from "../../../src/app/theme";
import BasicLoader from '../../components/Loaders/BasicLoader';

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

const LineChart = (props: {
  label: ICarbonMonoxideData[],
  category: string,
  isLoading: boolean,
  errorMessage:
  string | null
}) => {
  const { label, category, isLoading, errorMessage } = props;

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

  if (isLoading) return (
    <span data-testid="line-chart">
      <BasicLoader
        message={errorMessage}
        height="500px"
      />
    </span>
  );

  return (
    <Line
      id="line-chart"
      data-testid="line-chart"
      options={options}
      data={data}
    />
  );
}

export default LineChart