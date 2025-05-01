import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { ThemeToggle } from './ThemeToggle';
import { UserAuth } from './UserAuth';
import { useTheme } from '@mui/material/styles';

export const Header = () => {
    const theme = useTheme();

    return (
        <AppBar
            position="static"
            sx={{
                background: theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                marginBottom: '2rem',
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        background: theme.palette.mode === 'dark' ? 'linear-gradient(45deg, #00d2ff 30%, #3a7bd5 90%)' : 'linear-gradient(45deg, #1a1a2e 30%, #16213e 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'fadeIn 1s ease-in',
                    }}
                >
                    World Explorer
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ThemeToggle />
                    <UserAuth />
                </Box>
            </Toolbar>
        </AppBar>
    );
};