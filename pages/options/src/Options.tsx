import React from 'react';
import { Button, Box, Typography, Paper, TextField, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { useStopwatch } from '../../contexts/StopwatchContext';

export default function Options() {
  const { addStopwatch, stopwatches } = useStopwatch();
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [linkError, setLinkError] = useState('');

  const isValidUrl = (url: string) => {
    const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return pattern.test(url);
  };

  useEffect(() => {
    if (!link) {
      setLinkError('');
    } else if (!isValidUrl(link)) {
      setLinkError('Please enter a valid URL');
    } else if (stopwatches.some(stopwatch => stopwatch.link === link)) {
      setLinkError('This link already exists');
    } else {
      setLinkError('');
    }
  }, [link, stopwatches]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!linkError && name && link) {
      addStopwatch({ name, link, time: 0 });
      setName('');
      setLink('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
        p: 2,
      }}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderRadius: 2,
          width: '100%',
          maxWidth: 400,
        }}>
        <Typography variant="h4" gutterBottom>
          Add Stopwatch
        </Typography>

        <form onSubmit={onSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Stopwatch Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="Enter a name for your stopwatch"
            />
            <TextField
              label="Link"
              variant="outlined"
              fullWidth
              value={link}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
              error={!!linkError}
              helperText={linkError}
              FormHelperTextProps={{ sx: { color: 'error.main' } }}
              placeholder="e.g., www.example.com"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!!linkError || !name || !link}
            sx={{
              marginTop: 2,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
