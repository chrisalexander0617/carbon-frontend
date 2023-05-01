import * as MUI from '@mui/material';
import { useTheme } from '@mui/material'

const BasicLoader = () => {
  const theme = useTheme();

  return (
    <MUI.Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '500px',
      width: '100%',
    }}>
      <MUI.CircularProgress sx={{ color: theme.palette.secondary.main }} />
    </MUI.Box>
  )
}
export default BasicLoader;