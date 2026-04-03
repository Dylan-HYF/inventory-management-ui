import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const ReceiveStockDialog = ({ open, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        sku: '',
        quantity: '',
        supplier: '',
        notes: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
        handleClose();
    };

    const handleClose = () => {
        setFormData({ sku: '', quantity: '', supplier: '', notes: '' });
        onClose();
    };

    const fields = [
        { name: 'sku', label: 'SKU', type: 'text', required: true },
        { name: 'quantity', label: 'Quantity', type: 'number', required: true },
        { name: 'supplier', label: 'Supplier', type: 'text', required: true },
        { name: 'notes', label: 'Notes', type: 'text', multiline: true, rows: 3 }
    ];

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Receive Stock</DialogTitle>
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
                        multiline={field.multiline}
                        rows={field.rows}
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

export default ReceiveStockDialog;