import React from 'react';
import { Paper, Typography, Divider, Box, Chip, useTheme, alpha } from '@mui/material';
import { Warning, Error } from '@mui/icons-material';

const LowStockAlertItem = ({ item }) => {
    const theme = useTheme();

    const getStatusColors = () => {
        if (item.status === 'critical') {
            return {
                bgColor: alpha(theme.palette.error.main, 0.08),
                borderColor: theme.palette.error.main,
                textColor: theme.palette.error.main,
                stockColor: theme.palette.error.main,
            };
        }
        return {
            bgColor: alpha(theme.palette.warning.main, 0.08),
            borderColor: theme.palette.warning.main,
            textColor: theme.palette.warning.main,
            stockColor: theme.palette.warning.dark,
        };
    };

    const colors = getStatusColors();

    return (
        <Paper sx={{
            p: 2,
            mb: 1.5,
            bgcolor: colors.bgColor,
            borderLeft: `4px solid ${colors.borderColor}`,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
                transform: 'translateX(4px)',
                boxShadow: theme.shadows[2],
            }
        }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
                <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                        {item.status === 'critical' ? (
                            <Error sx={{ fontSize: 20, color: colors.textColor }} />
                        ) : (
                            <Warning sx={{ fontSize: 20, color: colors.textColor }} />
                        )}
                        <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                            {item.name}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        SKU: {item.sku}
                    </Typography>
                    <Typography variant="body2">
                        Current Stock: {' '}
                        <strong style={{ color: colors.stockColor, fontSize: '1.1rem' }}>
                            {item.currentStock}
                        </strong>
                        {' '} / Reorder Point: {item.reorderPoint}
                    </Typography>
                </Box>
                <Chip
                    label={item.status === 'critical' ? 'CRITICAL' : 'LOW STOCK'}
                    color={item.status === 'critical' ? 'error' : 'warning'}
                    size="small"
                    sx={{
                        fontWeight: 600,
                        '& .MuiChip-label': { px: 1.5 }
                    }}
                />
            </Box>
        </Paper>
    );
};

const LowStockAlerts = ({ alerts }) => {
    const theme = useTheme();

    return (
        <Paper sx={{
            p: 3,
            backgroundColor: theme.palette.background.paper,
            borderLeft: `4px solid ${theme.palette.warning.main}`,
            minHeight: 240,
        }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" color="text.primary" fontWeight="bold">
                    Low Stock Alerts
                </Typography>
                {alerts.length > 0 && (
                    <Chip
                        label={`${alerts.length} item${alerts.length !== 1 ? 's' : ''}`}
                        color="warning"
                        size="small"
                        variant="outlined"
                    />
                )}
            </Box>
            <Divider sx={{ mb: 2 }} />

            {alerts.length > 0 ? (
                <Box sx={{ maxHeight: 500, overflow: 'auto', pr: 0.5 }}>
                    {alerts.map(alert => <LowStockAlertItem key={alert.id} item={alert} />)}
                </Box>
            ) : (
                <Box
                    sx={{
                        py: 8,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.success.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 1,
                        }}
                    >
                        <Warning sx={{ fontSize: 32, color: theme.palette.success.main }} />
                    </Box>
                    <Typography variant="h6" color="text.primary">
                        All Stock Levels Healthy
                    </Typography>
                    <Typography color="text.secondary" align="center">
                        No items are currently below their reorder point
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};

export default LowStockAlerts;