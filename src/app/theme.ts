import { createTheme } from "@mui/material/styles";
import { blue, blueGrey, cyan } from "@mui/material/colors";
import { Palette } from "@mui/material/styles/createPalette";
import { TypeBackground } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles" {
  interface Palette {
    chart: {
      red: string;
      orange: string;
      yellow: string;
      green: string;
      blue: string;
      purple: string;
    };
  }
  interface PaletteOptions {
    chart?: {
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
      main: '#252f3d',
    },
    secondary: {
      main: '#bcc7d6',
    },
    background: {
      default: "#263238",
      paper: "#37474f",
      light: "#ffffff", // custom light background color
      lightPaper: "#f5f5f5", // custom light paper color
    },
    chart: {
      red: "#f44336",
      orange: "#ff9800",
      yellow: "#ffc107",
      green: "#4caf50",
      blue: "#2196f3",
      purple: "#9c27b0",
    },
  },
});


export default theme
