import React from 'react';
import { Paper, Typography, Divider, Box, useTheme, alpha } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

const InventoryValueSummary = ({ cost, retail }) => {
    const theme = useTheme();
    const profit = retail - cost;
    const profitMargin = (profit / retail) * 100;

    return (
        <Paper sx={{ 
            p: 3,
            backgroundColor: theme.palette.background.paper,
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            height: '100%',
        }}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight="bold">
                Inventory Value Summary
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box display="flex" justifyContent="space-around" alignItems="center" flexWrap="wrap" gap={2}>
                <Box textAlign="center" flex={1}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Cost Value
                    </Typography>
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                        }}
                    >
                        ${cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                </Box>
                
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                    }}
                >
                    <TrendingUp sx={{ fontSize: 32 }} />
                </Box>
                
                <Box textAlign="center" flex={1}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Retail Value
                    </Typography>
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            color: theme.palette.success.main,
                            fontWeight: 600,
                        }}
                    >
                        ${retail.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                </Box>
            </Box>
            
            <Box sx={{ 
                mt: 3, 
                pt: 2, 
                textAlign: 'center',
                borderTop: `1px solid ${theme.palette.divider}`,
            }}>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Potential Profit
                </Typography>
                <Typography 
                    variant="h5" 
                    sx={{ 
                        color: profit >= 0 ? theme.palette.success.main : theme.palette.error.main,
                        fontWeight: 600,
                    }}
                >
                    ${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Profit Margin: {profitMargin.toFixed(2)}%
                </Typography>
            </Box>
        </Paper>
    );
};

export default InventoryValueSummary;