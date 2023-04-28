import React, { useEffect, useState, useRef } from 'react';
import { fetchMethaneData } from './api/methane';
import { IMethaneData } from './types/methane';
import './App.css';

function App() {
  const [data, setData] = useState<IMethaneData[]>([])
  const mounted = useRef(false)

  const fetchData = async () => {
    try {
      mounted.current = true;
      const result = await fetchMethaneData();
      if (mounted.current) {
        console.log(result)
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch methane data:", error);
    }
  }

  useEffect(() => {
    mounted.current = true
    fetchData()
    return () => { mounted.current = false };
  }, [])

  return (
    <div className="App"></div>
  );
}

export default App;
