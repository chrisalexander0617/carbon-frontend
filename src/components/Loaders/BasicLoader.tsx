import { Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material'

const BasicLoader = () => {
  const theme = useTheme();

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '500px',
      width: '100%',
    }}>
      <CircularProgress sx={{ color: theme.palette.secondary.main }} />
    </Box>
  )
}
export default BasicLoader;