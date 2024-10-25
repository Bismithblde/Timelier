import React from 'react';
import { Button, Box } from '@mui/material';
import StopwatchList from '../../components/StopwatchList';
export default function Popup() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '500px', width: '500px' }}>
      <StopwatchList />
    </Box>
  );
}
