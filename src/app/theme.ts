import { createTheme } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface Palette {
    chart: {
      default?: string;
      red?: string;
      orange: string;
      yellow: string;
      green: string;
      blue: string;
      purple: string;
    };
  }
  interface PaletteOptions {
      chart?: {
      default?: string;
      red?: string;
      orange?: string;
      yellow?: string;
      green?: string;
      blue?: string;
      purple?: string;
    };
  }
  interface TypeBackground {
    light: string;
    lightPaper: string;
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#F1F6F9',
    },
    secondary: {
      main: '#212A3E',
    },
    background: {
      default: "#212A3E",
      paper: "#161e38",
      light: '#bcc7d6', // custom light background color
      lightPaper: "#f5f5f5", // custom light paper color
    },
    chart: {
      default:'#cc5a65',
      red: "#f44336",
      orange: "#ff9800",
      yellow: "#ffc107",
      green: "#4caf50",
      blue: "#2196f3",
      purple: "#9c27b0",
    },
  },
});

export { theme }