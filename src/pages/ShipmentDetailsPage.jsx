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
import { MOCK_SHIPMENTS } from '../data/mockData';

const ShipmentDetailsPage = () => {
  const navigate = useNavigate();
  const { shipmentId } = useParams();
  const [shipments, setShipments] = useState(MOCK_SHIPMENTS);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await inventoryAPI.getIncomingShipments();
        setShipments(response.data?.length ? response.data : MOCK_SHIPMENTS);
      } catch {
        setShipments(MOCK_SHIPMENTS);
      }
    };
    load();
  }, []);

  const selectedShipment = useMemo(() => {
    if (shipmentId) {
      return (
        shipments.find((item) => String(item.shipmentId) === String(shipmentId)) ||
        shipments[0]
      );
    }
    return shipments[0];
  }, [shipmentId, shipments]);

  return (
    <AppShell
      title="Shipments"
      subtitle="Track incoming deliveries and inspect what is arriving next."
    >
      <Stack spacing={3}>
        {shipmentId ? (
          <Button
            onClick={() => navigate('/shipments')}
            startIcon={<ArrowBackRounded />}
            sx={{ alignSelf: 'flex-start' }}
          >
            Back to shipments
          </Button>
        ) : null}

        <Grid container spacing={2.5}>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              {shipments.map((shipment) => {
                const selected = selectedShipment?.shipmentId === shipment.shipmentId;

                return (
                  <Paper
                    key={shipment.shipmentId}
                    onClick={() => navigate(`/shipments/${shipment.shipmentId}`)}
                    sx={{
                      p: 2.25,
                      borderRadius: 3,
                      cursor: 'pointer',
                      border: 1,
                      borderColor: selected ? 'primary.main' : 'divider',
                      boxShadow: selected ? 4 : 1,
                      transition: 'all 0.18s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: 4,
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={1}
                      alignItems="flex-start"
                    >
                      <Box>
                        <Typography fontWeight={800}>{shipment.shipmentId}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {shipment.supplierName}
                        </Typography>
                      </Box>

                      <Chip
                        label={shipment.status}
                        color={
                          shipment.status === 'Delayed'
                            ? 'error'
                            : shipment.status === 'In Transit'
                            ? 'success'
                            : 'warning'
                        }
                        size="small"
                      />
                    </Stack>

                    <Box
                      sx={{
                        mt: 2,
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 1.5
                      }}
                    >
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Expected
                        </Typography>
                        <Typography>{shipment.expectedDate}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Items
                        </Typography>
                        <Typography>{shipment.totalItems}</Typography>
                      </Box>
                    </Box>
                  </Paper>
                );
              })}
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            {selectedShipment ? (
              <Stack spacing={2.5}>
                <Paper sx={{ p: 3, borderRadius: 3 }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Box>
                      <Typography variant="h4" fontWeight={800}>
                        {selectedShipment.shipmentId}
                      </Typography>
                      <Typography color="text.secondary">
                        Supplier: {selectedShipment.supplierName}
                      </Typography>
                    </Box>

                    <Chip
                      label={selectedShipment.status}
                      color={
                        selectedShipment.status === 'Delayed'
                          ? 'error'
                          : selectedShipment.status === 'In Transit'
                          ? 'success'
                          : 'warning'
                      }
                    />
                  </Stack>

                  <Box
                    sx={{
                      mt: 3,
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                      gap: 2
                    }}
                  >
                    {[
                      ['Expected date', selectedShipment.expectedDate],
                      ['Total items', selectedShipment.totalItems],
                      ['Priority', selectedShipment.priority]
                    ].map(([label, value]) => (
                      <Box
                        key={label}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'action.hover'
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {label}
                        </Typography>
                        <Typography variant="h6" fontWeight={800}>
                          {value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>

                <Paper sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Shipment items
                  </Typography>

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>SKU</TableCell>
                          <TableCell>Product</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedShipment.items.map((item, index) => (
                          <TableRow key={`${item.sku}-${index}`} hover>
                            <TableCell sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                              {item.sku}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Stack>
            ) : null}
          </Grid>
        </Grid>
      </Stack>
    </AppShell>
  );
};

export default ShipmentDetailsPage;
