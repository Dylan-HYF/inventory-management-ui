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
import { Inventory2Rounded, ArrowForwardRounded } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authService.isAuthenticated()) navigate('/dashboard');
  }, [navigate]);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await authService.login(formData.username, formData.password);
      setSuccess(`Welcome back, ${response.username || formData.username}. Redirecting...`);
      setTimeout(() => navigate('/dashboard'), 900);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', px: 2 }}>
      <Container maxWidth="lg">
        <Paper sx={{ overflow: 'hidden', borderRadius: 6 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' } }}>
            <Box sx={{ p: { xs: 4, md: 6 }, background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12))' }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 4 }}>
                <Box sx={{ width: 50, height: 50, borderRadius: 3, bgcolor: 'primary.main', color: 'white', display: 'grid', placeItems: 'center' }}>
                  <Inventory2Rounded />
                </Box>
                <Box>
                  <Typography variant="h5">Inventory Hub</Typography>
                  <Typography color="text.secondary">Modern stock control workspace</Typography>
                </Box>
              </Stack>

              <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                Manage stock faster with a cleaner dashboard.
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 560, mb: 4 }}>
                Track products, watch low-stock alerts, review incoming shipments, and manage actions from one place.
              </Typography>

              <Stack spacing={2}>
                {[
                  'Low-stock and out-of-stock visibility',
                  'Quick actions for receiving and adjusting inventory',
                  'Clean admin layout with dark mode support'
                ].map((item) => (
                  <Paper key={item} variant="outlined" sx={{ p: 2.5, borderRadius: 4, bgcolor: 'background.paper' }}>
                    <Typography fontWeight={600}>{item}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>

            <Box sx={{ p: { xs: 4, md: 6 }, display: 'grid', alignContent: 'center' }}>
              <Typography variant="h4" sx={{ mb: 1 }}>Sign in</Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>Use your account to continue to the dashboard.</Typography>

              {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}
              {success ? <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert> : null}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField label="Username" name="username" fullWidth margin="normal" autoFocus value={formData.username} onChange={handleChange} disabled={loading} />
                <TextField label="Password" name="password" type="password" fullWidth margin="normal" value={formData.password} onChange={handleChange} disabled={loading} />
                <Button type="submit" fullWidth variant="contained" size="large" endIcon={loading ? null : <ArrowForwardRounded />} sx={{ mt: 3, height: 52 }} disabled={loading}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
                </Button>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <Link component={RouterLink} to="/register" underline="hover">Create one here</Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
