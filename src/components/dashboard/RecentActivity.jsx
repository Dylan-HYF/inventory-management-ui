import React from 'react';
import { Paper, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Avatar, Box, useTheme, alpha } from '@mui/material';
import { Add, Inventory, LocalShipping, Adjust, CheckCircle, History } from '@mui/icons-material';

const ActivityIcon = ({ type }) => {
    const theme = useTheme();
    
    const getIconConfig = () => {
        switch (type) {
            case 'ADD_STOCK': 
                return { icon: <Add />, color: theme.palette.success.main, bgOpacity: 0.1 };
            case 'NEW_PRODUCT': 
                return { icon: <Inventory />, color: theme.palette.primary.main, bgOpacity: 0.1 };
            case 'TRANSFER': 
                return { icon: <LocalShipping />, color: theme.palette.info.main, bgOpacity: 0.1 };
            case 'ADJUSTMENT': 
                return { icon: <Adjust />, color: theme.palette.warning.main, bgOpacity: 0.1 };
            default: 
                return { icon: <CheckCircle />, color: theme.palette.action.active, bgOpacity: 0.1 };
        }
    };

    const config = getIconConfig();

    return (
        <Avatar sx={{ 
            bgcolor: alpha(config.color, config.bgOpacity),
            color: config.color,
            width: 40,
            height: 40,
        }}>
            {config.icon}
        </Avatar>
    );
};

const ActivityItem = ({ activity }) => {
    const theme = useTheme();
    
    return (
        <ListItem 
            sx={{ 
                mb: 1,
                borderRadius: 1,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    transform: 'translateX(4px)',
                }
            }}
        >
            <ListItemIcon>
                <ActivityIcon type={activity.type} />
            </ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant="subtitle2" fontWeight="bold" color="text.primary">
                        {activity.action}
                    </Typography>
                }
                secondary={
                    <Typography variant="body2" color="text.secondary">
                        {activity.itemName} 
                        {activity.quantity ? ` (Qty: ${activity.quantity})` : ''} 
                        {' '}— by {activity.performedBy}
                    </Typography>
                }
            />
            <Typography variant="caption" color="text.secondary" sx={{ minWidth: 120, textAlign: 'right' }}>
                {new Date(activity.timestamp).toLocaleString()}
            </Typography>
        </ListItem>
    );
};

const RecentActivity = ({ activities }) => {
    const theme = useTheme();
    
    return (
        <Paper sx={{ 
            p: 3,
            backgroundColor: theme.palette.background.paper,
            borderLeft: `4px solid ${theme.palette.info.main}`,
            height: '100%',
        }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" color="text.primary" fontWeight="bold">
                    Recent Activity
                </Typography>
                {activities.length > 0 && (
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        color: 'text.secondary',
                    }}>
                        <History sx={{ fontSize: 16 }} />
                        <Typography variant="caption">
                            Last {activities.length} events
                        </Typography>
                    </Box>
                )}
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            {activities.length > 0 ? (
                <List sx={{ 
                    maxHeight: 500, 
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        bgcolor: alpha(theme.palette.common.black, 0.05),
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        bgcolor: alpha(theme.palette.common.black, 0.2),
                        borderRadius: '4px',
                        '&:hover': {
                            bgcolor: alpha(theme.palette.common.black, 0.3),
                        },
                    },
                }}>
                    {activities.map((activity, index) => (
                        <React.Fragment key={activity.id}>
                            <ActivityItem activity={activity} />
                            {index < activities.length - 1 && (
                                <Divider variant="inset" component="li" sx={{ ml: 7 }} />
                            )}
                        </React.Fragment>
                    ))}
                </List>
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
                            bgcolor: alpha(theme.palette.info.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 1,
                        }}
                    >
                        <History sx={{ fontSize: 32, color: theme.palette.info.main }} />
                    </Box>
                    <Typography variant="h6" color="text.primary">
                        No Recent Activity
                    </Typography>
                    <Typography color="text.secondary" align="center">
                        Activities will appear here as you use the system
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};

export default RecentActivity;