import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AdjustInventoryDialog = ({ open, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        sku: '',
        adjustment: '',
        reason: '',
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
        setFormData({ sku: '', adjustment: '', reason: '', notes: '' });
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Adjust Inventory</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    name="sku"
                    label="SKU"
                    margin="normal"
                    required
                    value={formData.sku}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    name="adjustment"
                    label="Adjustment Quantity"
                    type="number"
                    margin="normal"
                    required
                    value={formData.adjustment}
                    onChange={handleChange}
                    helperText="Use positive for add, negative for remove"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Reason</InputLabel>
                    <Select
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="DAMAGED">Damaged</MenuItem>
                        <MenuItem value="LOST">Lost</MenuItem>
                        <MenuItem value="CYCLE_COUNT">Cycle Count</MenuItem>
                        <MenuItem value="RETURN">Return</MenuItem>
                        <MenuItem value="THEFT">Theft</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    name="notes"
                    label="Notes"
                    multiline
                    rows={3}
                    margin="normal"
                    value={formData.notes}
                    onChange={handleChange}
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

export default AdjustInventoryDialog;