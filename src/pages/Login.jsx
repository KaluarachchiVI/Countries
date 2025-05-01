import React from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Divider,
    Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would handle authentication here
        navigate('/');
    };

    return (
        <Container maxWidth="xs" sx={{ py: 8 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        borderRadius: 4,
                        background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 60, height: 60 }}>
                            <LockOutlinedIcon fontSize="large" />
                        </Avatar>
                        <Typography component="h1" variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Sign In
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    </Box>

                    <Divider sx={{ my: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            OR CONTINUE WITH
                        </Typography>
                    </Divider>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            Google
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<FacebookIcon />}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            Facebook
                        </Button>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default Login; 