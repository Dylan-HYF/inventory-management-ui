import React from 'react';
import { Paper, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import { Add, Inventory, LocalShipping, Adjust, CheckCircle } from '@mui/icons-material';

const ActivityIcon = ({ type }) => {
    const getIcon = () => {
        switch (type) {
            case 'ADD_STOCK': return <Add color="success" />;
            case 'NEW_PRODUCT': return <Inventory color="primary" />;
            case 'TRANSFER': return <LocalShipping color="info" />;
            case 'ADJUSTMENT': return <Adjust color="warning" />;
            default: return <CheckCircle color="action" />;
        }
    };

    return (
        <Avatar sx={{ bgcolor: 'transparent' }}>
            {getIcon()}
        </Avatar>
    );
};

const ActivityItem = ({ activity }) => (
    <ListItem>
        <ListItemIcon>
            <ActivityIcon type={activity.type} />
        </ListItemIcon>
        <ListItemText
            primary={activity.action}
            secondary={`${activity.itemName} ${activity.quantity ? `(Qty: ${activity.quantity})` : ''} - by ${activity.performedBy}`}
        />
        <Typography variant="caption" color="text.secondary">
            {new Date(activity.timestamp).toLocaleString()}
        </Typography>
    </ListItem>
);

const RecentActivity = ({ activities }) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Recent Activity
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                {activities.length > 0 ? (
                    activities.map(activity => <ActivityItem key={activity.id} activity={activity} />)
                ) : (
                    <Typography color="text.secondary" align="center">
                        No recent activities
                    </Typography>
                )}
            </List>
        </Paper>
    );
};

export default RecentActivity;