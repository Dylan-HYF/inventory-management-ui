import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { PersonAddAlt1Rounded } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authService.isAuthenticated()) navigate('/dashboard');
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setSubmitError('');
  };

  const validateForm = () => {
    const next = {};
    if (formData.username.trim().length < 3) next.username = 'Username must be at least 3 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Enter a valid email address';
    if (formData.password.length < 6) next.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) next.confirmPassword = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setSubmitError('');
    setSuccess('');
    try {
      const response = await authService.register({ username: formData.username, email: formData.email, password: formData.password });
      setSuccess(response.message || 'Registration successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setSubmitError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: { xs: 4, md: 5 }, borderRadius: 6 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: 'secondary.main', color: 'white', display: 'grid', placeItems: 'center' }}>
              <PersonAddAlt1Rounded />
            </Box>
            <Box>
              <Typography variant="h4">Create account</Typography>
              <Typography color="text.secondary">Set up access to the inventory workspace.</Typography>
            </Box>
          </Stack>

          {submitError ? <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert> : null}
          {success ? <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert> : null}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField label="Username" name="username" fullWidth margin="normal" value={formData.username} onChange={handleChange} error={!!errors.username} helperText={errors.username} />
            <TextField label="Email" name="email" fullWidth margin="normal" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
            <TextField label="Password" name="password" type="password" fullWidth margin="normal" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />
            <TextField label="Confirm password" name="confirmPassword" type="password" fullWidth margin="normal" value={formData.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword} />
            <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3, height: 52 }} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create account'}
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" underline="hover">Sign in</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
