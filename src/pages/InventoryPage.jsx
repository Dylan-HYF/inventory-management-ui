import React from 'react';
import { Typography, Box } from '@mui/material';

export default function InventoryPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Inventory
      </Typography>
      <Typography>
        Inventory route is working.
      </Typography>
    </Box>
  );
}
