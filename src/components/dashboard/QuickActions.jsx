import React from 'react';
import { Paper, Typography, Divider, Grid, Button } from '@mui/material';
import { Add, LocalShipping, Receipt, Adjust } from '@mui/icons-material';

const QuickActions = ({ onActionClick }) => {
    const actions = [
        { name: 'Add Product', icon: <Add />, color: 'primary' },
        { name: 'Receive Stock', icon: <LocalShipping />, color: 'success' },
        { name: 'Create PO', icon: <Receipt />, color: 'warning' },
        { name: 'Adjust Inventory', icon: <Adjust />, color: 'info' }
    ];

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
                {actions.map((action) => (
                    <Grid item xs={6} sm={3} key={action.name}>
                        <Button
                            fullWidth
                            variant="contained"
                            color={action.color}
                            startIcon={action.icon}
                            onClick={() => onActionClick(action.name)}
                            sx={{ height: 80, flexDirection: 'column' }}
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