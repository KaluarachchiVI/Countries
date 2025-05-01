import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,

    Typography,
    Button,
    Card,
    CardMedia,

    Grid,
    Chip,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LanguageIcon from '@mui/icons-material/Language';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { fetchCountryByCode } from '../services/api';
import { motion } from 'framer-motion';

const CountryDetails = () => {
    const { countryCode } = useParams(); // Changed from name to countryCode
    const navigate = useNavigate();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [borderCountries, setBorderCountries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchCountryByCode(countryCode);
                if (data && data.length > 0) {
                    setCountry(data[0]);

                    // Fetch border countries if they exist
                    if (data[0].borders && data[0].borders.length > 0) {
                        const borderCodes = data[0].borders.join(',');
                        const bordersData = await fetchCountryByCode(borderCodes);
                        setBorderCountries(bordersData);
                    }
                } else {
                    setError('Country not found');
                }
            } catch (err) {
                setError('Failed to fetch country details');
                console.error(err);
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
                    onClick={() => navigate(-1)} // Go back to previous page
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
                                image={flags.svg || flags.png}
                                alt={`Flag of ${name.common}`}
                                sx={{ objectFit: 'cover' }}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 3, height: '100%', borderRadius: 4, boxShadow: 3 }}>
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                                {name.common}
                            </Typography>
                            <Typography variant="h6" gutterBottom color="text.secondary">
                                {name.official}
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
                                                secondary={`${region}${subregion ? ` (${subregion})` : ''}`}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PeopleIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Population"
                                                secondary={population.toLocaleString()}
                                            />
                                        </ListItem>
                                        {tld && (
                                            <ListItem>
                                                <ListItemIcon>
                                                    <LanguageIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Top Level Domain"
                                                    secondary={tld.join(', ')}
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
                                                    secondary={timezones.join(', ')}
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
                                                label={borderCountry.name.common}
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