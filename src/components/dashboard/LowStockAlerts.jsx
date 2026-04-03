import React from 'react';
import { Paper, Typography, Divider, Box, Chip } from '@mui/material';

const LowStockAlertItem = ({ item }) => (
    <Paper sx={{ 
        p: 2, 
        mb: 1, 
        bgcolor: item.status === 'critical' ? '#ffebee' : '#fff9c4', 
        transition: '0.2s', 
        '&:hover': { transform: 'translateX(5px)' } 
    }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    SKU: {item.sku}
                </Typography>
                <Typography variant="body2">
                    Current Stock: <strong style={{ color: item.status === 'critical' ? 'red' : 'orange' }}>
                        {item.currentStock}
                    </strong> / Reorder Point: {item.reorderPoint}
                </Typography>
            </Box>
            <Chip
                label={item.status === 'critical' ? 'CRITICAL' : 'LOW'}
                color={item.status === 'critical' ? 'error' : 'warning'}
                size="small"
            />
        </Box>
    </Paper>
);

const LowStockAlerts = ({ alerts }) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Low Stock Alerts
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {alerts.length > 0 ? (
                alerts.map(alert => <LowStockAlertItem key={alert.id} item={alert} />)
            ) : (
                <Typography color="text.secondary" align="center">
                    No low stock items
                </Typography>
            )}
        </Paper>
    );
};

export default LowStockAlerts;