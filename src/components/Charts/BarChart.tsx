import React, { useState, useRef, useEffect } from 'react';
import { letterFrequency } from '@visx/mock-data';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { IMethaneData } from '../../types/methane';
import { fetchMethaneData } from '../../api/methane/index';

interface ICarbonData {
  letter: string,
  frequency: number
}

interface IBarChartProps {
  carbonData?: ICarbonData[] // make this required later on
  width: number;
  height: number;
  margin: { top: number; bottom: number; left: number; right: number };
}

// We'll use some mock data from `@visx/mock-data` for this.
const data = letterFrequency;

// Define the graph dimensions and margins
const BarChart: React.FC<IBarChartProps> = ({ width, height, margin }) => {
  const [methaneData, setMethaneData] = useState<IMethaneData[]>([])
  const [error, setError] = useState<string | null>(null)
  const mounted = useRef(false)

  // Then we'll create some bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // We'll make some helpers to get at the data we want
  const x = (d: { letter: string; frequency: number }) => d.letter;
  const y = (d: { letter: string; frequency: number }) =>
    +d.frequency * 100;

  // And then scale the graph by our data
  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: data.map(x),
    padding: 0.4,
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...data.map(y))],
  });

  // Compose together the scale and accessor functions to get point functions
  const compose = <T extends unknown>(scale: (input: T) => number, accessor: (d: { letter: string; frequency: number }) => T) => (data: { letter: string; frequency: number }) => scale(accessor(data));
  const xPoint = compose<string>(xScale as any, x);
  const yPoint = compose<number>(yScale, y);


  // Finally we'll embed it all in an SVG

  const getMethaneData = async () => {
    try {
      mounted.current = true;
      const result = await fetchMethaneData();
      if (mounted.current) {
        setMethaneData(result);
      }
    } catch (error) {
      console.error("Failed to fetch methane data:", error);
      setError("Failed to fetch methane data");
    }
  }

  useEffect(() => {
    mounted.current = true
    getMethaneData()
    return () => { mounted.current = false };
  }, [])


  console.log("Here is the result from the bar chart", methaneData)

  const mappedData = methaneData.map((item: any, i: number) => (
    {
      letter: item.time.interval_start,
      frequency: item.value.average
    }
  ))

  const testShitData = [
    {
      letter: 'A',
      frequency: 0.3
    },
    {
      letter: 'B',
      frequency: 0.12
    },
    {
      letter: 'C',
      frequency: 0.4
    }
  ]

  console.log('Here is the mapped data', mappedData)

  return (
    <svg width={width} height={height}>
      {testShitData.length > 0 &&
        testShitData.map((d, i) => {
          const barHeight = yMax - yPoint(d);
          return (
            <Group key={`bar-${i}`}>
              <Bar
                x={xPoint(d)}
                y={yMax - barHeight}
                height={barHeight}
                width={xScale.bandwidth()}
                fill="#fc2e1c"
              />
            </Group>
          );
        })}
    </svg>
  );
};

export default BarChart;
