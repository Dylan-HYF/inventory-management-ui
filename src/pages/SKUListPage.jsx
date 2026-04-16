import React, { useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Button
} from '@mui/material';
import AdjustIcon from '@mui/icons-material/Edit';

import LoadingSpinner from '../components/common/LoadingSpinner';
import AdjustInventoryDialog from '../components/dashboard/dialogs/AdjustInventoryDialog';

const SKU_DATA = [
    { sku: 'MZ-CX50-001', name: 'Mazda CX-50 Wiper Blades', category: 'Automotive', stock: 15, status: 'In Stock' },
    { sku: 'PS5-CTRL-WHT', name: 'DualSense Wireless Controller', category: 'Gaming', stock: 8, status: 'Low Stock' },
    { sku: 'SNOW-YES-TYP', name: 'Yes Typo Snowboard 155', category: 'Sports', stock: 3, status: 'Low Stock' },
    { sku: 'BOOK-BT-PHO', name: 'Burton Photon Boots', category: 'Sports', stock: 0, status: 'Out of Stock' },
    { sku: 'APP-D14-ULT', name: 'Diablo IV Ultimate Edition', category: 'Gaming', stock: 100, status: 'Digital' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'In Stock': return 'success';
        case 'Low Stock': return 'warning';
        case 'Out of Stock': return 'error';
        case 'Digital': return 'info';
        default: return 'default';
    }
};

const SKUListPage = () => {
    const [selectedSku, setSelectedSku] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAdjustStock = (item) => {
        setSelectedSku(item);
        setIsDialogOpen(true);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Inventory SKU List
            </Typography>

            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="sku inventory table">
                    <TableHead sx={{ backgroundColor: 'background.default' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>SKU</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Stock Level</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {SKU_DATA.map((item) => (
                            <TableRow
                                key={item.sku}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: 'action.hover' } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontFamily: 'monospace', fontWeight: 'medium' }}>
                                    {item.sku}
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell align="center">
                                    <Typography variant="body2" fontWeight={item.stock < 10 ? 'bold' : 'normal'} color={item.stock === 0 ? 'error.main' : 'text.primary'}>
                                        {item.stock}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={item.status}
                                        color={getStatusColor(item.status)}
                                        size="small"
                                        variant={item.stock === 0 ? "filled" : "outlined"}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        startIcon={<AdjustIcon />}
                                        onClick={() => handleAdjustStock(item)}
                                        disableElevation
                                    >
                                        Adjust
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {isDialogOpen && (
                <AdjustInventoryDialog
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    product={selectedSku}
                />
            )}
        </Box>
    );
};

export default SKUListPage;