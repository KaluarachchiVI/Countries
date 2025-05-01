import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSearch}
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: 600,
                margin: '0 auto 2rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '50px',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
                },
            }}
        >
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClear} edge="end">
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    sx: {
                        '& fieldset': { border: 'none' },
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '50px',
                    },
                }}
            />
        </Paper>
    );
};