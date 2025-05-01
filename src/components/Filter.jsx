import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid, ButtonGroup, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import PublicIcon from '@mui/icons-material/Public';

import StarBorderIcon from '@mui/icons-material/StarBorder';
// Add this import at the top of the file
import { Box } from '@mui/material';

const regions = [
    { value: '', label: 'All Regions' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Americas', label: 'Americas' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' },
];

export const Filter = ({ onFilterChange, onIndependentFilter }) => {
    const [region, setRegion] = React.useState('');

    const handleRegionChange = (event) => {
        const selectedRegion = event.target.value;
        setRegion(selectedRegion);
        onFilterChange(selectedRegion);
    };

    return (
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                    <InputLabel id="region-filter-label">
                        <Box display="flex" alignItems="center">
                            <PublicIcon sx={{ mr: 1 }} /> Filter by Region
                        </Box>
                    </InputLabel>
                    <Select
                        labelId="region-filter-label"
                        id="region-filter"
                        value={region}
                        label="Filter by Region"
                        onChange={handleRegionChange}
                        sx={{
                            '& .MuiSelect-select': {
                                display: 'flex',
                                alignItems: 'center',
                            },
                        }}
                    >
                        {regions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
                    <Button
                        onClick={() => onIndependentFilter(true)}
                        startIcon={<StarBorderIcon />}
                        sx={{
                            textTransform: 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        Independent
                    </Button>
                    <Button
                        onClick={() => onIndependentFilter(false)}
                        startIcon={<FilterListIcon />}
                        sx={{
                            textTransform: 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        Non-Independent
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
};