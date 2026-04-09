import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, useTheme, alpha } from '@mui/material';

const MetricCard = ({ title, value, icon, color = 'primary' }) => {
    const theme = useTheme();
    
    const getColor = () => {
        switch (color) {
            case 'primary': return theme.palette.primary.main;
            case 'secondary': return theme.palette.secondary.main;
            case 'success': return theme.palette.success.main;
            case 'warning': return theme.palette.warning.main;
            case 'error': return theme.palette.error.main;
            case 'info': return theme.palette.info.main;
            default: return theme.palette.primary.main;
        }
    };

    const mainColor = getColor();

    return (
        <Card sx={{ 
            height: '100%',
            backgroundColor: theme.palette.background.paper,
            transition: 'transform 0.2s, box-shadow 0.2s',
            borderLeft: `4px solid ${mainColor}`,
            '&:hover': { 
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4],
            } 
        }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h3" component="div" fontWeight="bold" color="text.primary">
                            {value}
                        </Typography>
                    </Box>
                    <Avatar sx={{ 
                        bgcolor: alpha(mainColor, 0.1),
                        color: mainColor,
                        width: 56,
                        height: 56,
                    }}>
                        {icon}
                    </Avatar>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MetricCard;