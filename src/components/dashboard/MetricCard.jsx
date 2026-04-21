import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  LinearProgress,
  Typography,
  alpha,
  useTheme
} from '@mui/material';

const MetricCard = ({
  title,
  value,
  icon,
  color = 'primary',
  subtitle,
  trend,
  onClick
}) => {
  const theme = useTheme();
  const mainColor = theme.palette[color]?.main || theme.palette.primary.main;
  const progressValue = Math.min(typeof value === 'number' ? value : 60, 100);

  const content = (
    <CardContent sx={{ p: 2.5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ lineHeight: 1.1, fontWeight: 800 }}>
            {value}
          </Typography>
        </Box>

        <Avatar
          sx={{
            bgcolor: alpha(mainColor, 0.12),
            color: mainColor,
            width: 48,
            height: 48
          }}
        >
          {icon}
        </Avatar>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progressValue}
        sx={{ height: 7, borderRadius: 2, mb: 1.5 }}
        color={color}
      />

      <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
        <Typography variant="caption" color="text.secondary">
          {subtitle || 'Updated from current data'}
        </Typography>
        {trend ? <Chip size="small" label={trend} color={color} variant="outlined" /> : null}
      </Box>
    </CardContent>
  );

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        '&:hover': onClick
          ? {
              transform: 'translateY(-2px)',
              boxShadow: 6
            }
          : undefined
      }}
    >
      {onClick ? (
        <CardActionArea sx={{ height: '100%', alignItems: 'stretch' }} onClick={onClick}>
          {content}
        </CardActionArea>
      ) : (
        content
      )}
    </Card>
  );
};

export default MetricCard;
