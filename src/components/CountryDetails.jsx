import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Chip,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LanguageIcon from '@mui/icons-material/Language';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { fetchCountryByCode, fetchCountriesByCodes } from '../services/api';
import { motion } from 'framer-motion';

const CountryDetails = () => {
    const { countryCode } = useParams();
    const navigate = useNavigate();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [borderCountries, setBorderCountries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch main country data
                const countryData = await fetchCountryByCode(countryCode);

                if (!countryData) {
                    setError('Country not found');
                    return;
                }

                setCountry(countryData);

                // Fetch border countries if they exist
                if (countryData.borders && countryData.borders.length > 0) {
                    const bordersData = await fetchCountriesByCodes(countryData.borders.join(','));
                    setBorderCountries(bordersData);
                }
            } catch (err) {
                console.error('Error fetching country details:', err);
                setError('Failed to fetch country details');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [countryCode]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress size={80} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', mt: 10 }}>
                <Typography variant="h5" color="error">{error}</Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                    sx={{ mt: 2 }}
                    startIcon={<ArrowBackIcon />}
                >
                    Back to Countries
                </Button>
            </Box>
        );
    }

    if (!country) return null;

    const {
        name,
        flags,
        capital,
        region,
        subregion,
        population,
        languages,
        currencies,
        borders,
        independent,
        unMember,
        tld,
        timezones,
    } = country;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 3 }}
                >
                    Back
                </Button>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                height="400"
                                image={flags?.svg || flags?.png || ''}
                                alt={`Flag of ${name?.common || 'country'}`}
                                sx={{ objectFit: 'cover' }}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 3, height: '100%', borderRadius: 4, boxShadow: 3 }}>
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                                {name?.common || 'Unknown Country'}
                            </Typography>
                            <Typography variant="h6" gutterBottom color="text.secondary">
                                {name?.official || ''}
                            </Typography>

                            <Divider sx={{ my: 3 }} />

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <List dense>
                                        <ListItem>
                                            <ListItemIcon>
                                                <LocationCityIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Capital"
                                                secondary={capital ? capital.join(', ') : 'N/A'}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PublicIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Region"
                                                secondary={`${region || 'N/A'}${subregion ? ` (${subregion})` : ''}`}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PeopleIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Population"
                                                secondary={population ? population.toLocaleString() : 'N/A'}
                                            />
                                        </ListItem>
                                        {tld && (
                                            <ListItem>
                                                <ListItemIcon>
                                                    <LanguageIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Top Level Domain"
                                                    secondary={Array.isArray(tld) ? tld.join(', ') : tld}
                                                />
                                            </ListItem>
                                        )}
                                    </List>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <List dense>
                                        {languages && (
                                            <ListItem>
                                                <ListItemIcon>
                                                    <LanguageIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Languages"
                                                    secondary={Object.values(languages).join(', ')}
                                                />
                                            </ListItem>
                                        )}
                                        {currencies && (
                                            <ListItem>
                                                <ListItemIcon>
                                                    <MonetizationOnIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Currencies"
                                                    secondary={Object.values(currencies)
                                                        .map(currency => `${currency.name} (${currency.symbol || 'N/A'})`)
                                                        .join(', ')}
                                                />
                                            </ListItem>
                                        )}
                                        {timezones && (
                                            <ListItem>
                                                <ListItemIcon>
                                                    <PublicIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Timezones"
                                                    secondary={Array.isArray(timezones) ? timezones.join(', ') : timezones}
                                                />
                                            </ListItem>
                                        )}
                                        <ListItem>
                                            <ListItemText
                                                primary="Status"
                                                secondary={
                                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                                        {independent && (
                                                            <Chip label="Independent" color="success" size="small" />
                                                        )}
                                                        {unMember && (
                                                            <Chip label="UN Member" color="info" size="small" />
                                                        )}
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>

                            {borderCountries.length > 0 && (
                                <>
                                    <Divider sx={{ my: 3 }} />
                                    <Typography variant="h6" gutterBottom>
                                        Bordering Countries
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {borderCountries.map((borderCountry) => (
                                            <Chip
                                                key={borderCountry.cca3}
                                                label={borderCountry.name?.common || borderCountry.cca3}
                                                onClick={() => navigate(`/country/${borderCountry.cca3}`)}
                                                sx={{ cursor: 'pointer' }}
                                            />
                                        ))}
                                    </Box>
                                </>
                            )}
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
    );
};

export default CountryDetails;