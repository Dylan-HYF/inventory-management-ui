import React, { useMemo, useState } from 'react';
import { Box, Button, Chip, Grid, Paper, Stack, Typography } from '@mui/material';
import {
  AddRounded,
  Inventory2Rounded,
  LocalShippingRounded,
  RemoveCircleRounded,
  WarningAmberRounded,
  ReceiptLongRounded
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import LoadingSpinner from '../components/common/LoadingSpinner';
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
import { useDashboardData } from '../hooks/useDashboardData';
import { inventoryAPI } from '../services/inventoryApi';

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    loading,
    metrics,
    inventoryValue,
    lowStockAlerts,
    recentActivities,
    suppliers,
    refreshData
  } = useDashboardData();

  const [openDialog, setOpenDialog] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const stockHealth = useMemo(() => {
    const healthyCount = Math.max(
      metrics.totalSKUs - metrics.lowStockItems - metrics.outOfStock,
      0
    );
    const percentage = metrics.totalSKUs
      ? Math.round((healthyCount / metrics.totalSKUs) * 100)
      : 0;
    return { healthyCount, percentage };
  }, [metrics]);

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

      setSnackbar({
        open: true,
        message: `${action} completed successfully.`,
        severity: 'success'
      });
      setOpenDialog(null);
      refreshData();
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          `${action} could not be completed, so mock dashboard data stays visible.`,
        severity: 'warning'
      });
      setOpenDialog(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <AppShell
      title="Dashboard"
      subtitle="A cleaner overview of stock, value, orders, and warehouse activity."
      actions={
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          onClick={() => setOpenDialog('Add Product')}
        >
          New product
        </Button>
      }
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            spacing={2}
          >
            <Box>
              <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 800 }}>
                Inventory Management Dashboard
              </Typography>
              <Typography color="text.secondary">
                Monitor your warehouse performance with faster actions and clearer priorities.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip color="success" label={`${stockHealth.percentage}% stock healthy`} />
              <Chip variant="outlined" label={`${metrics.totalSKUs} active SKUs`} />
            </Stack>
          </Stack>
        </Paper>

        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6} lg={2.4}>
            <MetricCard
              title="Total SKUs"
              value={metrics.totalSKUs}
              icon={<Inventory2Rounded />}
              color="primary"
              subtitle="Browse all products"
              onClick={() => navigate('/skus')}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={2.4}>
            <MetricCard
              title="Low Stock Items"
              value={metrics.lowStockItems}
              icon={<WarningAmberRounded />}
              color="warning"
              subtitle="Click to review low stock"
              onClick={() => navigate('/skus?status=Low%20Stock')}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={2.4}>
            <MetricCard
              title="Out of Stock"
              value={metrics.outOfStock}
              icon={<RemoveCircleRounded />}
              color="error"
              subtitle="Click to review empty items"
              onClick={() => navigate('/skus?status=Out%20of%20Stock')}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={2.4}>
            <MetricCard
              title="Incoming Shipments"
              value={metrics.incomingShipments}
              icon={<LocalShippingRounded />}
              color="success"
              subtitle="Open shipment tracker"
              onClick={() => navigate('/shipments')}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={2.4}>
            <MetricCard
              title="Pending Orders"
              value={metrics.pendingOrders}
              icon={<ReceiptLongRounded />}
              color="secondary"
              subtitle="Purchase activity overview"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2.5}>
          <Grid item xs={12} lg={6}>
            <InventoryValueSummary inventoryValue={inventoryValue} />
          </Grid>

          <Grid item xs={12} lg={6}>
            <QuickActions
              onAddProduct={() => setOpenDialog('Add Product')}
              onReceiveStock={() => setOpenDialog('Receive Stock')}
              onCreatePO={() => setOpenDialog('Create PO')}
              onAdjustInventory={() => setOpenDialog('Adjust Inventory')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2.5}>
          <Grid item xs={12} lg={5}>
            <LowStockAlerts
              alerts={lowStockAlerts}
              onViewAll={() => navigate('/skus?status=Low%20Stock')}
              onSelectItem={(item) => navigate(`/skus/${item.sku}`)}
            />
          </Grid>

          <Grid item xs={12} lg={7}>
            <RecentActivity activities={recentActivities} />
          </Grid>
        </Grid>
      </Stack>

      <AddProductDialog
        open={openDialog === 'Add Product'}
        onClose={() => setOpenDialog(null)}
        onSubmit={(data) => handleFormSubmit(data, 'Add Product')}
        suppliers={suppliers}
      />

      <ReceiveStockDialog
        open={openDialog === 'Receive Stock'}
        onClose={() => setOpenDialog(null)}
        onSubmit={(data) => handleFormSubmit(data, 'Receive Stock')}
      />

      <CreatePODialog
        open={openDialog === 'Create PO'}
        onClose={() => setOpenDialog(null)}
        onSubmit={(data) => handleFormSubmit(data, 'Create PO')}
        suppliers={suppliers}
      />

      <AdjustInventoryDialog
        open={openDialog === 'Adjust Inventory'}
        onClose={() => setOpenDialog(null)}
        onSubmit={(data) => handleFormSubmit(data, 'Adjust Inventory')}
      />

      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </AppShell>
  );
};

export default Dashboard;
