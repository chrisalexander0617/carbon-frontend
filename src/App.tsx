import { useEffect, useRef } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './components/Dashboard/Dashboard'
import { GlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { theme } from '../src/app/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        // Set the background color to theme.palette.secondary.main
        body: {
          backgroundColor: theme.palette.primary.main,
        },
      }} />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
