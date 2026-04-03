import React from 'react';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Products', path: '/products' },
    { label: 'Inventory', path: '/inventory' },
  ];

  return (
    <Box
      sx={{
        width: 220,
        borderRight: '1px solid #e0e0e0',
        minHeight: 'calc(100vh - 64px)',
        bgcolor: '#fafafa',
      }}
    >
      <List>
        {links.map((link) => (
          <ListItemButton
            key={link.path}
            component={Link}
            to={link.path}
            selected={location.pathname === link.path}
          >
            <ListItemText primary={link.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
