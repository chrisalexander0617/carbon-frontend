import * as React from 'react';
import * as MUI from '@mui/material';
import { useTheme } from '@mui/material/styles';
interface IBasicLoaderProps {
  message: string | null;
  height: string
}

const BasicLoader: React.FC<IBasicLoaderProps> = ({ message, height }) => {
  const theme = useTheme();

  return (
    <MUI.Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: height,
      width: '100%',
    }}>
      {!message && <MUI.CircularProgress sx={{ color: theme.palette.secondary.main }} />}
      <MUI.Typography variant="h3" color={theme.palette.messages.warning}>{message}</MUI.Typography>
    </MUI.Box>
  );
}

export default BasicLoader;