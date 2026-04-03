import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function PageLayout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fb' }}>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
