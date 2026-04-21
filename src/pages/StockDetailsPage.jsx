import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { ArrowBackRounded } from '@mui/icons-material';
import AppShell from '../components/layout/AppShell';
import { inventoryAPI } from '../services/inventoryApi';
import { MOCK_PRODUCTS } from '../data/mockData';

const statusColor = (status) => {
  const s = String(status).toLowerCase();
  if (s.includes('out')) return 'error';
  if (s.includes('low') || s.includes('critical')) return 'warning';
  return 'success';
};

const StockDetailsPage = () => {
  const { sku } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const fallbackProduct = useMemo(() => MOCK_PRODUCTS.find((item) => item.sku === sku) || MOCK_PRODUCTS[0], [sku]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await inventoryAPI.getProductBySku(sku);
        setProduct(response.data || fallbackProduct);
      } catch {
        setProduct(fallbackProduct);
      }
    };
    load();
  }, [sku, fallbackProduct]);

  const current = product || fallbackProduct;

  return (
    <AppShell title={`SKU Details — ${current.sku}`} subtitle="Product profile, stock health, and recent inventory history.">
      <Stack spacing={3}>
        <Button onClick={() => navigate('/skus')} startIcon={<ArrowBackRounded />} sx={{ alignSelf: 'flex-start' }}>Back to SKU list</Button>

        <Grid container spacing={2.5}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, borderRadius: 5, height: '100%' }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography variant="h4" sx={{ mb: 1 }}>{current.name}</Typography>
                  <Typography color="text.secondary">Supplier: {current.supplierName || current.supplier || 'Not assigned'}</Typography>
                </Box>
                <Chip label={current.status || (current.currentStock === 0 ? 'Out of Stock' : 'In Stock')} color={statusColor(current.status)} />
              </Stack>

              <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
                {[
                  ['Category', current.category],
                  ['Location', current.location || 'Warehouse floor'],
                  ['Current stock', current.currentStock],
                  ['Reorder point', current.reorderPoint],
                  ['Cost price', `$${Number(current.costPrice || 0).toFixed(2)}`],
                  ['Selling price', `$${Number(current.sellingPrice || current.unitPrice || 0).toFixed(2)}`]
                ].map(([label, value]) => (
                  <Box key={label} sx={{ p: 2.5, borderRadius: 4, bgcolor: 'action.hover' }}>
                    <Typography variant="body2" color="text.secondary">{label}</Typography>
                    <Typography variant="h6">{value}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, borderRadius: 5, height: '100%' }}>
              <Typography variant="h6" gutterBottom>Stock recommendation</Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Simple frontend decision support using the current stock and reorder point.
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ p: 2.5, borderRadius: 4, bgcolor: current.currentStock <= current.reorderPoint ? 'warning.main' : 'success.main', color: 'white' }}>
                  <Typography variant="body2" sx={{ opacity: 0.85 }}>Suggested action</Typography>
                  <Typography variant="h6">{current.currentStock <= current.reorderPoint ? 'Reorder soon' : 'Stock level is stable'}</Typography>
                </Box>
                <Box sx={{ p: 2.5, borderRadius: 4, bgcolor: 'action.hover' }}>
                  <Typography variant="body2" color="text.secondary">Days since update</Typography>
                  <Typography variant="h6">{Math.max(1, Math.ceil((Date.now() - new Date(current.updatedAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24)))}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, borderRadius: 5 }}>
          <Typography variant="h6" gutterBottom>Stock history</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(current.history || []).map((entry, index) => (
                  <TableRow key={`${entry.date}-${index}`} hover>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.type}</TableCell>
                    <TableCell align="right">{entry.quantity > 0 ? `+${entry.quantity}` : entry.quantity}</TableCell>
                    <TableCell align="right">{entry.balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Stack>
    </AppShell>
  );
};

export default StockDetailsPage;
