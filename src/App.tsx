import React, { useEffect, useState, useRef } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import { Dashboard2 } from './components/Dashboard/Dashboard2'
import './App.css';
import { changeBodyBackgroundColor } from '../src/utils/index'
import theme from '../src/app/theme';
function App() {
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true;
    changeBodyBackgroundColor(theme.palette.primary.main)
    return () => { mounted.current = false };
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard2 />
    </ThemeProvider>

  );
}

export default App;
