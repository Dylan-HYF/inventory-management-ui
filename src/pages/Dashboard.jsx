import React from 'react';
import { Container, Typography, Button, Box, Paper, AppBar, Toolbar } from '@mui/material';
import { authService } from '../services/authService';

const Dashboard = () => {
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        window.location.href = '/';
    };

    // Redirect to login if not authenticated
    React.useEffect(() => {
        if (!authService.isAuthenticated()) {
            window.location.href = '/';
        }
    }, []);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md">
                <Box sx={{ mt: 4 }}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h4" gutterBottom>
                            Welcome, {user?.username}!
                        </Typography>
                        <Typography variant="body1" paragraph>
                            You have successfully logged in using the Spring Boot JWT Authentication.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Your JWT token is stored in localStorage and will be sent with all API requests.
                        </Typography>
                    </Paper>
                </Box>
            </Container>
        </>
    );
};

export default Dashboard;