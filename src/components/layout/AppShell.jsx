import React, { useContext, useMemo, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  DashboardRounded,
  Inventory2Rounded,
  LocalShippingRounded,
  MenuRounded,
  DarkModeRounded,
  LogoutRounded,
  LightModeRounded
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import ColorModeContext from '../../context/ColorModeContext';

const drawerWidth = 272;

const navigation = [
  { label: 'Dashboard', icon: <DashboardRounded />, path: '/dashboard' },
  { label: 'Inventory SKUs', icon: <Inventory2Rounded />, path: '/skus' },
  { label: 'Shipments', icon: <LocalShippingRounded />, path: '/shipments' }
];

const AppShell = ({ title, subtitle, children, actions }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getCurrentUser();

  const initials = useMemo(() => {
    const value = user?.username || 'Admin';
    return value.slice(0, 2).toUpperCase();
  }, [user]);

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ px: 1, py: 1.5, mb: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 42, height: 42 }}>IM</Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={800}>Inventory Hub</Typography>
          <Typography variant="caption" color="text.secondary">Admin workspace</Typography>
        </Box>
      </Stack>

      <List sx={{ gap: 0.5, display: 'grid' }}>
        {navigation.map((item) => {
          const selected = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          return (
            <ListItemButton
              key={item.path}
              selected={selected}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                borderRadius: 3,
                minHeight: 48,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                  '&:hover': { bgcolor: 'primary.dark' }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ mt: 'auto', p: 1 }}>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 1, py: 1.5, borderRadius: 3, bgcolor: 'action.hover' }}>
          <Avatar>{initials}</Avatar>
          <Box flex={1} minWidth={0}>
            <Typography variant="body2" fontWeight={700} noWrap>{user?.username || 'admin'}</Typography>
            <Typography variant="caption" color="text.secondary">Signed in</Typography>
          </Box>
          <Tooltip title="Logout">
            <IconButton onClick={() => { authService.logout(); navigate('/login'); }}>
              <LogoutRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          borderBottom: 1,
          borderColor: 'divider',
          backdropFilter: 'blur(10px)',
          bgcolor: theme.palette.mode === 'light' ? 'rgba(244,247,251,0.82)' : 'rgba(15,23,42,0.75)'
        }}
      >
        <Toolbar sx={{ minHeight: '72px !important', gap: 1 }}>
          {isMobile && (
            <IconButton onClick={() => setMobileOpen(true)}>
              <MenuRounded />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem', md: '1.6rem' } }}>{title}</Typography>
            {subtitle ? <Typography variant="body2" color="text.secondary">{subtitle}</Typography> : null}
          </Box>
          <Chip label={new Date().toLocaleDateString()} variant="outlined" sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />
          <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
            <IconButton onClick={toggleColorMode}>
              {mode === 'light' ? <DarkModeRounded /> : <LightModeRounded />}
            </IconButton>
          </Tooltip>
          {actions}
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', bgcolor: 'background.paper' } }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar sx={{ minHeight: '72px !important' }} />
        <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AppShell;
