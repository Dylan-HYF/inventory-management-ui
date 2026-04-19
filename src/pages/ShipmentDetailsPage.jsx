import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {
    ArrowBack,
    LocalShipping,
    Event,
    Storefront,
    Warehouse
} from '@mui/icons-material';
import MetricCard from '../components/dashboard/MetricCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { inventoryAPI } from '../services/inventoryApi';

const MOCK_SHIPMENTS = [
    {
        id: 'PO-1007',
        supplier: 'Auto Supply Canada',
        status: 'SHIPPED',
        expectedDate: '2026-04-24',
        destination: 'Main Warehouse',
        trackingNumber: 'TRK-CA-88291',
        totalItems: 55,
        items: [
            { sku: 'MZ-CX50-001', name: 'Mazda CX-50 Wiper Blades', quantity: 25 },
            { sku: 'SNOW-YES-TYP', name: 'Yes Typo Snowboard 155', quantity: 10 },
            { sku: 'BOOK-BT-PHO', name: 'Burton Photon Boots', quantity: 20 }
        ]
    },
    {
        id: 'PO-1011',
        supplier: 'Gaming Distribution Inc.',
        status: 'IN_TRANSIT',
        expectedDate: '2026-04-27',
        destination: 'Warehouse A',
        trackingNumber: 'TRK-GD-44109',
        totalItems: 35,
        items: [
            { sku: 'PS5-CTRL-WHT', name: 'DualSense Wireless Controller', quantity: 30 },
            { sku: 'APP-D14-ULT', name: 'Diablo IV Ultimate Edition', quantity: 5 }
        ]
    }
];

const normalizeShipment = (shipment) => {
    const items = shipment.items || shipment.purchaseOrderItems || shipment.orderItems || [];

    return {
        id: shipment.id || shipment.purchaseOrderId || shipment.orderNumber,
        supplier: shipment.supplier?.name || shipment.supplierName || shipment.supplier || 'Not assigned',
        status: shipment.status || 'SHIPPED',
        expectedDate: shipment.expectedDate || shipment.expectedDeliveryDate || shipment.deliveryDate || 'Not available',
        destination: shipment.destination || shipment.warehouseName || shipment.location || 'Not assigned',
        trackingNumber: shipment.trackingNumber || shipment.tracking || 'Not available',
        totalItems: shipment.totalItems || items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
        items: items.map(item => ({
            sku: item.sku || item.productSku || item.product?.sku || 'N/A',
            name: item.name || item.productName || item.product?.name || 'Unnamed item',
            quantity: item.quantity || item.orderedQuantity || 0
        }))
    };
};

const getStatusColor = (status) => {
    switch (status) {
        case 'DELIVERED': return 'success';
        case 'SHIPPED': return 'primary';
        case 'IN_TRANSIT': return 'info';
        case 'DELAYED': return 'warning';
        default: return 'default';
    }
};

const ShipmentDetailsPage = () => {
    const { shipmentId } = useParams();
    const navigate = useNavigate();
    const [shipments, setShipments] = useState([]);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notice, setNotice] = useState('');

    const fallbackShipment = useMemo(() => (
        MOCK_SHIPMENTS.find(item => item.id === shipmentId) || MOCK_SHIPMENTS[0]
    ), [shipmentId]);

    useEffect(() => {
        const fetchShipmentData = async () => {
            setLoading(true);
            try {
                if (shipmentId) {
                    const response = await inventoryAPI.getShipmentById(shipmentId);
                    const normalized = normalizeShipment(response.data);
                    setShipments([normalized]);
                    setSelectedShipment(normalized);
                } else {
                    const response = await inventoryAPI.getIncomingShipments();
                    const normalized = response.data.map(normalizeShipment);
                    setShipments(normalized);
                    setSelectedShipment(normalized[0] || null);
                }
                setNotice('');
            } catch (error) {
                setShipments(MOCK_SHIPMENTS);
                setSelectedShipment(fallbackShipment);
                setNotice('Showing sample shipment details because the backend endpoint is not available yet.');
            } finally {
                setLoading(false);
            }
        };

        fetchShipmentData();
    }, [fallbackShipment, shipmentId]);

    if (loading) return <LoadingSpinner />;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} flexWrap="wrap" mb={3}>
                <Box>
                    <Button startIcon={<ArrowBack />} onClick={() => navigate('/dashboard')} sx={{ mb: 1 }}>
                        Back to Dashboard
                    </Button>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Shipment Details
                    </Typography>
                    <Typography color="text.secondary">
                        Incoming shipments and purchase order delivery information
                    </Typography>
                </Box>
                {selectedShipment && (
                    <Chip label={selectedShipment.status} color={getStatusColor(selectedShipment.status)} />
                )}
            </Box>

            {notice && <Alert severity="info" sx={{ mb: 3 }}>{notice}</Alert>}

            {selectedShipment ? (
                <>
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} md={3}>
                            <MetricCard title="Shipment" value={selectedShipment.id} icon={<LocalShipping />} color="primary" />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <MetricCard title="Total Items" value={selectedShipment.totalItems} icon={<Warehouse />} color="success" />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <MetricCard title="Expected" value={selectedShipment.expectedDate} icon={<Event />} color="warning" />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <MetricCard title="Supplier" value={selectedShipment.supplier} icon={<Storefront />} color="info" />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 3, height: '100%' }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Incoming Shipments
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Box display="grid" gap={1.5}>
                                    {shipments.map(shipment => (
                                        <Button
                                            key={shipment.id}
                                            variant={selectedShipment.id === shipment.id ? 'contained' : 'outlined'}
                                            onClick={() => setSelectedShipment(shipment)}
                                            sx={{ justifyContent: 'space-between' }}
                                        >
                                            <span>{shipment.id}</span>
                                            <span>{shipment.status}</span>
                                        </Button>
                                    ))}
                                </Box>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Paper sx={{ p: 3, mb: 3 }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Delivery Information
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography><strong>Tracking Number:</strong> {selectedShipment.trackingNumber}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography><strong>Destination:</strong> {selectedShipment.destination}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography><strong>Supplier:</strong> {selectedShipment.supplier}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography><strong>Expected Date:</strong> {selectedShipment.expectedDate}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>

                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Shipment Items
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>SKU</TableCell>
                                                <TableCell>Product</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {selectedShipment.items.map((item, index) => (
                                                <TableRow key={`${item.sku}-${index}`}>
                                                    <TableCell sx={{ fontFamily: 'monospace' }}>{item.sku}</TableCell>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell align="right">{item.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </>
            ) : (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6">No incoming shipments found.</Typography>
                </Paper>
            )}
        </Container>
    );
};

export default ShipmentDetailsPage;
