import React, { useEffect, useState, useRef } from 'react';
import { Dashboard2 } from './components/Dashboard/Dashboard2'
import './App.css';

function App() {
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false };
  }, [])

  return (
    <div className="App">
      <Dashboard2 />
    </div>
  );
}

export default App;
