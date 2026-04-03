import React from 'react';
import { Paper, Typography, Divider, Box } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

const InventoryValueSummary = ({ cost, retail }) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Inventory Value Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-around" alignItems="center">
                <Box textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                        Cost Value
                    </Typography>
                    <Typography variant="h4" color="primary">
                        ${cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, color: 'text.secondary' }} />
                <Box textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                        Retail Value
                    </Typography>
                    <Typography variant="h4" color="success.main">
                        ${retail.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Potential Profit: ${(retail - cost).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
            </Box>
        </Paper>
    );
};

export default InventoryValueSummary;