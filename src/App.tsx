import React, { useEffect, useState, useRef } from 'react';
import { fetchMethaneData } from './api/methane';
import { fetchCountriesData } from './api/countries';
import { IMethaneData } from './types/methane';
import { ICountriesData } from './types/countries';
import './App.css';

function App() {
  const [methaneData, setMethaneData] = useState<IMethaneData[]>([])
  const [countriesData, setCountriesData] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const mounted = useRef(false)

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

  const getCountriesData = async () => {
    try {
      mounted.current = true;
      const result = await fetchCountriesData();
      if (mounted.current) {
        console.log(result)
        setCountriesData(result);
      }
    } catch (error) {
      console.error("Failed to fetch methane data:", error);
    }
  }


  useEffect(() => {
    mounted.current = true
    getMethaneData()
    getCountriesData()
    return () => { mounted.current = false };
  }, [])

  return (
    <div className="App">
      {methaneData.map((item: IMethaneData, i: number) => (
        <div key={i}>
          <p>Date: {item.time.interval_start}</p>
          <p>Value: {item.value.average}</p>
        </div>
      ))}
      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}
      {countriesData.map((item: string, i: number) => (
        <div key={i}>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
