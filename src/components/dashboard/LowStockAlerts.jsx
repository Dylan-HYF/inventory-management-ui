import React from 'react';
import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import { ArrowForwardRounded } from '@mui/icons-material';

const LowStockAlerts = ({ alerts = [], onViewAll, onSelectItem }) => (
  <Paper sx={{ p: 3, height: '100%', borderRadius: 3 }}>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h6">Low stock alerts</Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Chip
          label={`${alerts.length} item${alerts.length === 1 ? '' : 's'}`}
          color="warning"
          variant="outlined"
        />
        {onViewAll ? (
          <Button size="small" onClick={onViewAll}>
            View all
          </Button>
        ) : null}
      </Box>
    </Box>

    <Stack spacing={1.5}>
      {alerts.length ? (
        alerts.map((item) => (
          <Box
            key={item.id}
            onClick={() => onSelectItem?.(item)}
            sx={{
              p: 2,
              borderRadius: 2.5,
              bgcolor:
                item.status === 'critical'
                  ? 'rgba(239,68,68,0.08)'
                  : 'rgba(245,158,11,0.10)',
              border: 1,
              borderColor:
                item.status === 'critical' ? 'error.light' : 'warning.light',
              cursor: onSelectItem ? 'pointer' : 'default',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              '&:hover': onSelectItem
                ? {
                    transform: 'translateY(-1px)',
                    boxShadow: 3
                  }
                : undefined
            }}
          >
            <Box display="flex" justifyContent="space-between" gap={2} alignItems="center">
              <Box>
                <Typography fontWeight={700}>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  SKU: {item.sku}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Current stock: <strong>{item.currentStock}</strong> / Reorder point:{' '}
                  {item.reorderPoint}
                </Typography>
              </Box>

              <Stack alignItems="flex-end" spacing={1}>
                <Chip
                  label={item.status === 'critical' ? 'Critical' : 'Low'}
                  color={item.status === 'critical' ? 'error' : 'warning'}
                />
                {onSelectItem ? (
                  <ArrowForwardRounded fontSize="small" color="action" />
                ) : null}
              </Stack>
            </Box>
          </Box>
        ))
      ) : (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2.5,
            bgcolor: 'action.hover'
          }}
        >
          <Typography fontWeight={700}>No alerts right now</Typography>
          <Typography variant="body2" color="text.secondary">
            Stock levels are currently healthy.
          </Typography>
        </Box>
      )}
    </Stack>
  </Paper>
);

export default LowStockAlerts;
