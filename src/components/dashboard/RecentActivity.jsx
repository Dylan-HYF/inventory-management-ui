import React from 'react';
import { Avatar, Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { AddRounded, EditRounded, ReceiptLongRounded } from '@mui/icons-material';

const iconForType = (type) => {
  if (type === 'ADD_STOCK') return <AddRounded />;
  if (type === 'ORDER') return <ReceiptLongRounded />;
  return <EditRounded />;
};

const RecentActivity = ({ activities = [] }) => (
  <Paper sx={{ p: 3, height: '100%' }}>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h6">Recent activity</Typography>
      <Chip label={`${activities.length} events`} variant="outlined" />
    </Box>

    <Stack spacing={1.5}>
      {activities.length ? activities.map((activity) => (
        <Box key={activity.id} sx={{ p: 2, borderRadius: 4, bgcolor: 'action.hover' }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>{iconForType(activity.type)}</Avatar>
            <Box flex={1}>
              <Typography fontWeight={700}>{activity.action}</Typography>
              <Typography variant="body2" color="text.secondary">
                {activity.itemName} {activity.quantity ? `(${activity.quantity > 0 ? '+' : ''}${activity.quantity})` : ''} — by {activity.performedBy}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">{new Date(activity.timestamp).toLocaleString()}</Typography>
          </Stack>
        </Box>
      )) : (
        <Box sx={{ p: 4, textAlign: 'center', borderRadius: 4, bgcolor: 'action.hover' }}>
          <Typography fontWeight={700}>No recent activity</Typography>
          <Typography variant="body2" color="text.secondary">New inventory events will show up here.</Typography>
        </Box>
      )}
    </Stack>
  </Paper>
);

export default RecentActivity;
