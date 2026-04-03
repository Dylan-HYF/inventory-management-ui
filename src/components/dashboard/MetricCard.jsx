import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

const MetricCard = ({ title, value, icon, color }) => {
    return (
        <Card sx={{ 
            height: '100%', 
            bgcolor: color, 
            color: 'white', 
            transition: 'transform 0.2s', 
            '&:hover': { transform: 'scale(1.02)' } 
        }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h3">
                            {value}
                        </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                        {icon}
                    </Avatar>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MetricCard;