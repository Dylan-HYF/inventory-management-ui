import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const AddProductDialog = ({ open, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '', sku: '', category: '', sellingPrice: '', 
        costPrice: '', currentStock: '', reorderPoint: '10', location: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
        handleClose();
    };

    const handleClose = () => {
        setFormData({ name: '', sku: '', category: '', sellingPrice: '', costPrice: '', currentStock: '', reorderPoint: '10', location: '' });
        onClose();
    };

    const fields = [
        { name: 'name', label: 'Product Name', type: 'text', required: true },
        { name: 'sku', label: 'SKU', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'sellingPrice', label: 'Selling Price', type: 'number', required: true },
        { name: 'costPrice', label: 'Cost Price', type: 'number' },
        { name: 'currentStock', label: 'Initial Stock', type: 'number', required: true },
        { name: 'reorderPoint', label: 'Reorder Point', type: 'number' },
        { name: 'location', label: 'Location', type: 'text' }
    ];

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Add Product</DialogTitle>
            <DialogContent>
                {fields.map(field => (
                    <TextField
                        key={field.name}
                        fullWidth
                        name={field.name}
                        label={field.label}
                        type={field.type}
                        margin="normal"
                        required={field.required}
                        value={formData[field.name]}
                        onChange={handleChange}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductDialog;