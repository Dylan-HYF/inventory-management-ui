import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CreatePODialog = ({ open, onClose, onSubmit, suppliers }) => {
    const [formData, setFormData] = useState({
        supplier: '',
        items: '',
        expectedDate: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
        handleClose();
    };

    const handleClose = () => {
        setFormData({ supplier: '', items: '', expectedDate: '' });
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Create Purchase Order</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Supplier</InputLabel>
                    <Select
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleChange}
                        required
                    >
                        {suppliers?.map(supplier => (
                            <MenuItem key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    name="expectedDate"
                    label="Expected Delivery Date"
                    type="date"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={formData.expectedDate}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    name="items"
                    label="Items (JSON format)"
                    multiline
                    rows={4}
                    margin="normal"
                    placeholder='[{"sku": "ITEM-001", "quantity": 10, "price": 25.99}]'
                    value={formData.items}
                    onChange={handleChange}
                    helperText='Example: [{"sku": "ITEM-001", "quantity": 10, "price": 25.99}]'
                />
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

export default CreatePODialog;