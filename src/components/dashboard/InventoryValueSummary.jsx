import React from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';

const money = (value) => `$${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const InventoryValueSummary = ({ cost, retail }) => {
  const profit = retail - cost;
  const margin = retail ? ((profit / retail) * 100) : 0;

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>Inventory value summary</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Quick financial snapshot of current stock on hand.
      </Typography>

      <Stack spacing={2.5}>
        <Box sx={{ p: 2.5, borderRadius: 4, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary">Cost value</Typography>
          <Typography variant="h4">{money(cost)}</Typography>
        </Box>
        <Box sx={{ p: 2.5, borderRadius: 4, bgcolor: 'success.main', color: 'success.contrastText' }}>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>Retail value</Typography>
          <Typography variant="h4">{money(retail)}</Typography>
        </Box>
      </Stack>

      <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">Potential profit</Typography>
          <Typography variant="h6" color={profit >= 0 ? 'success.main' : 'error.main'}>{money(profit)}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">Margin</Typography>
          <Typography variant="h6">{margin.toFixed(1)}%</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default InventoryValueSummary;
