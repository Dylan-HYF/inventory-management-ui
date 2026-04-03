import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          Inventory Management System
        </Typography>
        <Button color="inherit" onClick={() => navigate('/login')}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
