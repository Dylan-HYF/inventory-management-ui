import React, { useState, useEffect } from 'react';
import { 
    Container, Grid, AppBar, Toolbar, Typography, Button, Box, 
    Avatar, useTheme, alpha 
} from '@mui/material';
import { 
    Inventory, Warning, RemoveCircle, LocalShipping, 
    Receipt, Logout 
} from '@mui/icons-material';
import { authService } from '../services/authService';
import { useDashboardData } from '../hooks/useDashboardData';
import LoadingSpinner from "../components/common/LoadingSpinner";
import NotificationSnackbar from '../components/common/NotificationSnackBar';
import MetricCard from '../components/dashboard/MetricCard';
import InventoryValueSummary from '../components/dashboard/InventoryValueSummary';
import QuickActions from '../components/dashboard/QuickActions';
import LowStockAlerts from '../components/dashboard/LowStockAlerts';
import RecentActivity from '../components/dashboard/RecentActivity';
import AddProductDialog from '../components/dashboard/dialogs/AddProductDialog';
import ReceiveStockDialog from '../components/dashboard/dialogs/RecieveStockDialog';
import CreatePODialog from '../components/dashboard/dialogs/CreatePODialog';
import AdjustInventoryDialog from '../components/dashboard/dialogs/AdjustInventoryDialog';
import { inventoryAPI } from '../services/inventoryApi';

const Dashboard = () => {
    const user = authService.getCurrentUser();
    const { loading, metrics, inventoryValue, lowStockAlerts, recentActivities, suppliers, refreshData } = useDashboardData();
    const [openDialog, setOpenDialog] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const theme = useTheme();

    // Redirect if not authenticated
    useEffect(() => {
        if (!authService.isAuthenticated()) {
            window.location.href = '/';
        }
    }, []);

    const handleLogout = () => {
        authService.logout();
        window.location.href = '/';
    };

    const handleQuickAction = (action) => {
        setOpenDialog(action);
    };

    const handleDialogClose = () => {
        setOpenDialog(null);
    };

    const handleFormSubmit = async (data, action) => {
        try {
            switch (action) {
                case 'Add Product':
                    await inventoryAPI.addProduct(data);
                    break;
                case 'Receive Stock':
                    await inventoryAPI.receiveStock(data);
                    break;
                case 'Create PO':
                    await inventoryAPI.createPurchaseOrder(data);
                    break;
                case 'Adjust Inventory':
                    await inventoryAPI.adjustInventory(data);
                    break;
                default:
                    break;
            }
            setSnackbar({ open: true, message: `${action} completed successfully!`, severity: 'success' });
            refreshData();
            handleDialogClose();
        } catch (error) {
            setSnackbar({ open: true, message: error.response?.data?.message || 'Error processing request', severity: 'error' });
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <>
            <AppBar 
                position="sticky" 
                elevation={0}
                sx={{ 
                    bgcolor: 'background.paper',
                    borderBottom: 1,
                    borderColor: 'divider',
                    color: 'text.primary'
                }}
            >
                <Toolbar>
                    <Avatar 
                        sx={{ 
                            mr: 2, 
                            bgcolor: 'primary.main',
                            width: 40,
                            height: 40
                        }}
                    >
                        <Inventory />
                    </Avatar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        Inventory Management Dashboard
                    </Typography>
                    <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
                        Welcome, {user?.username}
                    </Typography>
                    <Button 
                        color="inherit" 
                        onClick={handleLogout}
                        startIcon={<Logout />}
                        sx={{ 
                            color: 'text.secondary',
                            '&:hover': {
                                bgcolor: alpha(theme.palette.error.main, 0.04),
                                color: 'error.main'
                            }
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                {/* Key Metrics Cards - Using MUI's semantic colors */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <MetricCard 
                            title="Total SKUs" 
                            value={metrics.totalSKUs} 
                            icon={<Inventory />} 
                            color="primary"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <MetricCard 
                            title="Low Stock Items" 
                            value={metrics.lowStockItems} 
                            icon={<Warning />} 
                            color="warning"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <MetricCard 
                            title="Out of Stock" 
                            value={metrics.outOfStock} 
                            icon={<RemoveCircle />} 
                            color="error"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <MetricCard 
                            title="Incoming Shipments" 
                            value={metrics.incomingShipments} 
                            icon={<LocalShipping />} 
                            color="success"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <MetricCard 
                            title="Pending Orders" 
                            value={metrics.pendingOrders} 
                            icon={<Receipt />} 
                            color="secondary"
                        />
                    </Grid>
                </Grid>

                {/* Inventory Value Summary & Quick Actions */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <InventoryValueSummary 
                            cost={inventoryValue.cost} 
                            retail={inventoryValue.retail} 
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <QuickActions onActionClick={handleQuickAction} />
                    </Grid>
                </Grid>

                {/* Low Stock Alerts & Recent Activity */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <LowStockAlerts alerts={lowStockAlerts} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <RecentActivity activities={recentActivities} />
                    </Grid>
                </Grid>
            </Container>

            {/* Dialogs */}
            <AddProductDialog 
                open={openDialog === 'Add Product'} 
                onClose={handleDialogClose} 
                onSubmit={(data) => handleFormSubmit(data, 'Add Product')} 
            />
            <ReceiveStockDialog 
                open={openDialog === 'Receive Stock'} 
                onClose={handleDialogClose} 
                onSubmit={(data) => handleFormSubmit(data, 'Receive Stock')} 
            />
            <CreatePODialog 
                open={openDialog === 'Create PO'} 
                onClose={handleDialogClose} 
                suppliers={suppliers}
                onSubmit={(data) => handleFormSubmit(data, 'Create PO')} 
            />
            <AdjustInventoryDialog 
                open={openDialog === 'Adjust Inventory'} 
                onClose={handleDialogClose} 
                onSubmit={(data) => handleFormSubmit(data, 'Adjust Inventory')} 
            />

            {/* Notification */}
            <NotificationSnackbar 
                open={snackbar.open} 
                message={snackbar.message} 
                severity={snackbar.severity} 
                onClose={() => setSnackbar({ ...snackbar, open: false })} 
            />
        </>
    );
};

export default Dashboard;