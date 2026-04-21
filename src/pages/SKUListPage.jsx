import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Chip,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button
} from '@mui/material';
import { SearchRounded, VisibilityRounded } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import { inventoryAPI } from '../services/inventoryApi';
import { MOCK_PRODUCTS } from '../data/mockData';

const statusColor = (status) => {
  const s = String(status).toLowerCase();
  if (s.includes('out')) return 'error';
  if (s.includes('low') || s.includes('critical')) return 'warning';
  return 'success';
};

const normalizeStatus = (row) => {
  const stock = row.currentStock ?? row.stock ?? row.quantity ?? 0;
  const reorderPoint = row.reorderPoint ?? 0;

  if (stock === 0) return 'Out of Stock';
  if (stock <= Math.max(1, Math.floor(reorderPoint / 2))) return 'Critical';
  if (stock <= reorderPoint) return 'Low Stock';
  return 'In Stock';
};

const SKUListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState(MOCK_PRODUCTS);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlStatus = params.get('status');
    if (urlStatus) setStatus(urlStatus);
  }, [location.search]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await inventoryAPI.getProducts();
        setRows(response.data?.length ? response.data : MOCK_PRODUCTS);
      } catch {
        setRows(MOCK_PRODUCTS);
      }
    };
    load();
  }, []);

  const normalizedRows = useMemo(
    () =>
      rows.map((row) => ({
        ...row,
        currentStock: row.currentStock ?? row.stock ?? row.quantity ?? 0,
        reorderPoint: row.reorderPoint ?? 0,
        status: normalizeStatus(row)
      })),
    [rows]
  );

  const filteredRows = useMemo(
    () =>
      normalizedRows.filter((row) => {
        const matchesQuery = `${row.sku} ${row.name} ${row.category} ${row.location || ''}`
          .toLowerCase()
          .includes(query.toLowerCase());

        let matchesStatus = true;

        if (status === 'Low Stock') {
          matchesStatus = row.status === 'Low Stock' || row.status === 'Critical';
        } else if (status !== 'All') {
          matchesStatus = row.status === status;
        }

        return matchesQuery && matchesStatus;
      }),
    [normalizedRows, query, status]
  );

  return (
    <AppShell
      title="Inventory SKUs"
      subtitle="Search, filter, and review stock levels with cleaner table controls."
    >
      <Stack spacing={3}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="space-between"
          >
            <TextField
              placeholder="Search by SKU, name, or category"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ minWidth: { xs: '100%', md: 360 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ minWidth: 220 }}
            >
              {['All', 'In Stock', 'Low Stock', 'Out of Stock', 'Critical'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Paper>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            overflow: 'hidden'
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SKU</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="center">Stock</TableCell>
                <TableCell align="center">Reorder point</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.sku} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                    {row.sku}
                  </TableCell>

                  <TableCell>
                    <Typography fontWeight={700}>{row.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.location || 'Warehouse floor'}
                    </Typography>
                  </TableCell>

                  <TableCell>{row.category}</TableCell>
                  <TableCell align="center">{row.currentStock}</TableCell>
                  <TableCell align="center">{row.reorderPoint}</TableCell>

                  <TableCell align="center">
                    <Chip
                      label={row.status}
                      color={statusColor(row.status)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      startIcon={<VisibilityRounded />}
                      onClick={() => navigate(`/skus/${row.sku}`)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {!filteredRows.length ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography>No products match your filters.</Typography>
            </Box>
          ) : null}
        </TableContainer>
      </Stack>
    </AppShell>
  );
};

export default SKUListPage;
