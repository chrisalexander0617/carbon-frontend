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

const LineChart = (props: { label: ICarbonMonoxideData[], category: string }) => {
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


  return <Line id="line-chart" data-testid="line-chart" options={options} data={data} />;
}

export default LineChart