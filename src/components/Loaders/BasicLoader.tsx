import { Box, CircularProgress } from '@mui/material';

const BasicLoader = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '500px',
      width: '100%',
    }}>
      <CircularProgress />
    </Box>
  )
}
export default BasicLoader;