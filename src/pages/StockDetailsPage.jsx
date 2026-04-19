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
    Category,
    Inventory,
    LocationOn,
    Storefront,
    AttachMoney
} from '@mui/icons-material';
import MetricCard from '../components/dashboard/MetricCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { inventoryAPI } from '../services/inventoryApi';

const MOCK_STOCK_DETAILS = [
    {
        id: 'SKU-1001',
        sku: 'MZ-CX50-001',
        name: 'Mazda CX-50 Wiper Blades',
        category: 'Automotive',
        status: 'In Stock',
        currentStock: 15,
        reorderPoint: 5,
        unitPrice: 34.99,
        location: 'Aisle 4, Shelf B',
        supplier: 'Auto Supply Canada',
        lastRestocked: '2026-03-15',
        history: [
            { date: '2026-04-01', type: 'Sale', quantity: -2, balance: 15 },
            { date: '2026-03-15', type: 'Restock', quantity: 20, balance: 17 },
            { date: '2026-03-10', type: 'Adjustment', quantity: -3, balance: 0 }
        ]
    },
    {
        id: 'SKU-2024',
        sku: 'PS5-CTRL-WHT',
        name: 'DualSense Wireless Controller',
        category: 'Gaming',
        status: 'Low Stock',
        currentStock: 8,
        reorderPoint: 10,
        unitPrice: 89.99,
        location: 'Warehouse A',
        supplier: 'Gaming Distribution Inc.',
        lastRestocked: '2026-02-10',
        history: [
            { date: '2026-04-10', type: 'Sale', quantity: -1, balance: 8 },
            { date: '2026-03-29', type: 'Sale', quantity: -4, balance: 9 }
        ]
    }
];

const normalizeProduct = (product) => ({
    id: product.id || product.productId || product.sku,
    sku: product.sku || product.id,
    name: product.name || product.productName || 'Unnamed product',
    category: product.category || product.categoryName || 'Uncategorized',
    status: product.status || (product.currentStock === 0 ? 'Out of Stock' : 'In Stock'),
    currentStock: product.currentStock ?? product.stock ?? product.quantity ?? 0,
    reorderPoint: product.reorderPoint ?? product.minStockLevel ?? 0,
    unitPrice: product.unitPrice ?? product.sellingPrice ?? product.price ?? 0,
    location: product.location || product.binLocation || 'Not assigned',
    supplier: product.supplier?.name || product.supplierName || 'Not assigned',
    lastRestocked: product.lastRestocked || product.updatedAt || 'Not available',
    history: product.history || product.transactions || []
});

const getStatusColor = (status) => {
    switch (status) {
        case 'In Stock': return 'success';
        case 'Low Stock': return 'warning';
        case 'Out of Stock': return 'error';
        default: return 'info';
    }
};

const StockDetailsPage = () => {
    const { sku } = useParams();
    const navigate = useNavigate();
    const [stock, setStock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notice, setNotice] = useState('');

    const fallbackStock = useMemo(() => (
        MOCK_STOCK_DETAILS.find(item => item.sku === sku) || MOCK_STOCK_DETAILS[0]
    ), [sku]);

    useEffect(() => {
        const fetchStock = async () => {
            setLoading(true);
            try {
                const response = await inventoryAPI.getProductBySku(sku);
                setStock(normalizeProduct(response.data));
                setNotice('');
            } catch (error) {
                setStock(fallbackStock);
                setNotice('Showing sample stock details because the backend endpoint is not available yet.');
            } finally {
                setLoading(false);
            }
        };

        fetchStock();
    }, [fallbackStock, sku]);

    if (loading) return <LoadingSpinner />;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} flexWrap="wrap" mb={3}>
                <Box>
                    <Button startIcon={<ArrowBack />} onClick={() => navigate('/skus')} sx={{ mb: 1 }}>
                        Back to SKUs
                    </Button>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Stock Details
                    </Typography>
                    <Typography color="text.secondary">
                        {stock.name} ({stock.sku})
                    </Typography>
                </Box>
                <Chip label={stock.status} color={getStatusColor(stock.status)} />
            </Box>

            {notice && <Alert severity="info" sx={{ mb: 3 }}>{notice}</Alert>}

            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                    <MetricCard title="Current Stock" value={stock.currentStock} icon={<Inventory />} color="primary" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MetricCard title="Reorder Point" value={stock.reorderPoint} icon={<Storefront />} color="warning" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MetricCard title="Unit Price" value={`$${Number(stock.unitPrice).toFixed(2)}`} icon={<AttachMoney />} color="success" />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            General Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box display="grid" gap={2}>
                            <Box display="flex" gap={1.5}>
                                <Category color="primary" />
                                <Typography><strong>Category:</strong> {stock.category}</Typography>
                            </Box>
                            <Box display="flex" gap={1.5}>
                                <LocationOn color="primary" />
                                <Typography><strong>Location:</strong> {stock.location}</Typography>
                            </Box>
                            <Box display="flex" gap={1.5}>
                                <Storefront color="primary" />
                                <Typography><strong>Supplier:</strong> {stock.supplier}</Typography>
                            </Box>
                            <Box display="flex" gap={1.5}>
                                <Inventory color="primary" />
                                <Typography><strong>Last Restocked:</strong> {stock.lastRestocked}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Transaction History
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="right">Change</TableCell>
                                        <TableCell align="right">Balance</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {stock.history.length > 0 ? stock.history.map((entry, index) => (
                                        <TableRow key={`${entry.date}-${index}`}>
                                            <TableCell>{entry.date}</TableCell>
                                            <TableCell>{entry.type}</TableCell>
                                            <TableCell align="right">{entry.quantity}</TableCell>
                                            <TableCell align="right">{entry.balance}</TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">No transaction history available.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default StockDetailsPage;
