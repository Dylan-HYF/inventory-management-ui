import React from 'react';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { AddRounded, EditRounded, LocalShippingRounded, ReceiptLongRounded } from '@mui/icons-material';

const actions = [
  { name: 'Add Product', icon: <AddRounded />, color: 'primary.main', text: 'Create a new SKU quickly' },
  { name: 'Receive Stock', icon: <LocalShippingRounded />, color: 'success.main', text: 'Record delivered inventory' },
  { name: 'Create PO', icon: <ReceiptLongRounded />, color: 'warning.main', text: 'Draft a new purchase order' },
  { name: 'Adjust Inventory', icon: <EditRounded />, color: 'info.main', text: 'Fix counts and corrections' }
];

const QuickActions = ({ onActionClick }) => (
  <Paper sx={{ p: 3, height: '100%' }}>
    <Typography variant="h6" gutterBottom>Quick actions</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      Shortcuts for the most common inventory tasks.
    </Typography>

    <Grid container spacing={2}>
      {actions.map((action) => (
        <Grid item xs={12} sm={6} key={action.name}>
          <Button onClick={() => onActionClick(action.name)} variant="outlined" fullWidth sx={{ justifyContent: 'flex-start', textAlign: 'left', p: 2, borderRadius: 4, minHeight: 96 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ width: 44, height: 44, borderRadius: 3, bgcolor: `${action.color}`, color: '#fff', display: 'grid', placeItems: 'center' }}>{action.icon}</Box>
              <Box>
                <Typography fontWeight={700}>{action.name}</Typography>
                <Typography variant="body2" color="text.secondary">{action.text}</Typography>
              </Box>
            </Stack>
          </Button>
        </Grid>
      ))}
    </Grid>
  </Paper>
);

export default QuickActions;
