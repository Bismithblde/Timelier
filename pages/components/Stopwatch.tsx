import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useStopwatch } from '../contexts/StopwatchContext';

interface StopwatchProps {
  name: string;
  time: number;
  link: string;
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return [hours, minutes, remainingSeconds].map(v => v.toString().padStart(2, '0')).join(':');
};

export default function Stopwatch({ stopwatch }: { stopwatch: StopwatchProps }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        width: '300px',
        flexDirection: 'row',
        gap: 2,
        backgroundColor: '#2d383d',
        borderRadius: 10,
        mt: 2,
      }}>
      <Typography variant="h5">{stopwatch.name}</Typography>
      <Typography variant="h5">{formatTime(stopwatch.time)}</Typography>
    </Box>
  );
}
