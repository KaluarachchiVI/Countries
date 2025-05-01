import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Tooltip title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                }}
            >
                {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
        </Tooltip>
    );
};