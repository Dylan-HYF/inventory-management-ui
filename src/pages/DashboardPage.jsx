import React from 'react';
import { Typography, Box } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography>
        Dashboard route is working.
      </Typography>
    </Box>
  );
}
