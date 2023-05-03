import * as React from 'react';
import * as MUI from '@mui/material';
import { useTheme } from '@mui/material/styles';
interface IBasicLoaderProps {
  condition?: boolean;
  message: string | null;
}

const BasicLoader: React.FC<IBasicLoaderProps> = ({ message }) => {
  const theme = useTheme();

  console.log('We have a message: ', message);

  return (
    <MUI.Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '500px',
      width: '100%',
    }}>
      {!message && <MUI.CircularProgress sx={{ color: theme.palette.secondary.main }} />}
      <MUI.Typography color={theme.palette.secondary.main}>{message}</MUI.Typography>
    </MUI.Box>
  );
}

export default BasicLoader;