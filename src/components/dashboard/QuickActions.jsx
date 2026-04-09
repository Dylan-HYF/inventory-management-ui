import React from 'react';
import { Paper, Typography, Divider, Grid, Button, useTheme, alpha } from '@mui/material';
import { Add, LocalShipping, Receipt, Adjust } from '@mui/icons-material';

const QuickActions = ({ onActionClick }) => {
    const theme = useTheme();
    
    const actions = [
        { name: 'Add Product', icon: <Add />, color: 'primary' },
        { name: 'Receive Stock', icon: <LocalShipping />, color: 'success' },
        { name: 'Create PO', icon: <Receipt />, color: 'warning' },
        { name: 'Adjust Inventory', icon: <Adjust />, color: 'info' }
    ];

    const getButtonStyle = (colorName) => {
        const getColor = () => {
            switch (colorName) {
                case 'primary': return theme.palette.primary.main;
                case 'success': return theme.palette.success.main;
                case 'warning': return theme.palette.warning.main;
                case 'info': return theme.palette.info.main;
                default: return theme.palette.primary.main;
            }
        };
        
        const mainColor = getColor();
        
        return {
            backgroundColor: alpha(mainColor, 0.1),
            color: mainColor,
            border: `1px solid ${alpha(mainColor, 0.3)}`,
            '&:hover': {
                backgroundColor: alpha(mainColor, 0.2),
                border: `1px solid ${mainColor}`,
                transform: 'translateY(-2px)',
            }
        };
    };

    return (
        <Paper sx={{ 
            p: 3,
            backgroundColor: theme.palette.background.paper,
            borderLeft: `4px solid ${theme.palette.primary.main}`,
        }}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight="bold">
                Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
                {actions.map((action) => (
                    <Grid item xs={6} sm={3} key={action.name}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={action.icon}
                            onClick={() => onActionClick(action.name)}
                            sx={{ 
                                height: 80, 
                                flexDirection: 'column',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                ...getButtonStyle(action.color),
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            {action.name}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default QuickActions;