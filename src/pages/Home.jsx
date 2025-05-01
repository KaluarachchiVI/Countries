import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    CircularProgress,
    useTheme,
    useMediaQuery,
    Button
} from '@mui/material';
import { useCountries } from '../hooks/useCountries';
import { Header } from '../components/Header';
import { Search } from '../components/Search';
import { Filter } from '../components/Filter';
import { CountryCard } from '../components/CountryCard';

const Home = () => {
    const {
        countries,
        loading,
        error,
        searchCountries,
        filterByRegion,
        filterIndependent,
        getAllCountries
    } = useCountries();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(/images/world-map-bg.jpg)',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center'
        }}>
            <Header />
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{
                    mb: 4,
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'stretch' : 'center',
                    gap: 2
                }}>
                    <Search onSearch={searchCountries} />
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        width: isMobile ? '100%' : 'auto'
                    }}>
                        <Filter
                            onFilterChange={filterByRegion}
                            onIndependentFilter={filterIndependent}
                        />
                        <Button
                            variant="outlined"
                            onClick={getAllCountries}
                            sx={{
                                whiteSpace: 'nowrap',
                                height: '56px' // Match filter height
                            }}
                        >
                            Reset Filters
                        </Button>
                    </Box>
                </Box>

                {error && (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        my: 10,
                        textAlign: 'center'
                    }}>
                        <Typography variant="h5" color="error" gutterBottom>
                            {error}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={getAllCountries}
                            sx={{ mt: 2 }}
                        >
                            Try Again
                        </Button>
                    </Box>
                )}

                {loading && countries.length === 0 ? (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        my: 10,
                        minHeight: '50vh',
                        alignItems: 'center'
                    }}>
                        <CircularProgress size={80} />
                    </Box>
                ) : (
                    <Grid
                        container
                        spacing={4}
                        justifyContent={countries.length < 3 ? 'center' : 'flex-start'}
                        sx={{
                            py: 2,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {countries.map((country) => (
                            <Grid
                                item
                                key={country.name.common}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <CountryCard country={country} />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {!loading && countries.length === 0 && !error && (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        my: 10,
                        minHeight: '50vh',
                        textAlign: 'center'
                    }}>
                        <Typography
                            variant="h4"
                            sx={{ mb: 2, color: 'text.secondary' }}
                        >
                            No countries found
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{ mb: 3, color: 'text.secondary' }}
                        >
                            Try adjusting your search or filters
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={getAllCountries}
                        >
                            Show All Countries
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Home;