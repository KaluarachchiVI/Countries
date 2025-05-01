import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    Box,
    Skeleton,
    useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const CountryCard = ({ country, loading }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    if (loading) {
        return (
            <Card sx={{
                width: 300,
                height: 400,
                m: 1,
                borderRadius: 4,
                boxShadow: theme.shadows[3]
            }}>
                <Skeleton variant="rectangular" width="100%" height={160} />
                <CardContent>
                    <Skeleton width="60%" height={40} />
                    <Skeleton width="80%" height={30} sx={{ mt: 1 }} />
                    <Skeleton width="80%" height={30} sx={{ mt: 1 }} />
                    <Skeleton width="80%" height={30} sx={{ mt: 1 }} />
                </CardContent>
            </Card>
        );
    }

    if (!country) return null;

    const { name, flags, population, region, capital, languages, cca3 } = country;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
        >
            <Card
                sx={{
                    width: 300,
                    height: 400,
                    m: 1,
                    borderRadius: 4,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: theme.shadows[3],
                    '&:hover': {
                        boxShadow: theme.shadows[6],
                        transform: 'translateY(-5px)'
                    },
                    display: 'flex',
                    flexDirection: 'column'
                }}
                onClick={() => navigate(`/country/${cca3}`)}
            >
                <CardMedia
                    component="img"
                    height="160"
                    image={flags.svg || flags.png}
                    alt={`Flag of ${name.common}`}
                    sx={{
                        objectFit: 'cover',
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12
                    }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            fontWeight: 'bold',
                            minHeight: '64px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {name.common}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        mb: 2
                    }}>
                        <Typography variant="body2">
                            <strong>Capital:</strong> {capital ? capital.join(', ') : 'N/A'}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Region:</strong> {region}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Population:</strong> {population.toLocaleString()}
                        </Typography>
                    </Box>
                    {languages && (
                        <Box sx={{ mt: 'auto' }}>
                            <Typography variant="caption" color="text.secondary">
                                <strong>Languages:</strong>
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 0.5,
                                mt: 1
                            }}>
                                {Object.values(languages).slice(0, 3).map((lang) => (
                                    <Chip
                                        key={lang}
                                        label={lang}
                                        size="small"
                                        sx={{
                                            backgroundColor: 'primary.light',
                                            color: 'white',
                                            fontSize: '0.7rem'
                                        }}
                                    />
                                ))}
                                {Object.values(languages).length > 3 && (
                                    <Chip
                                        label={`+${Object.values(languages).length - 3}`}
                                        size="small"
                                        sx={{
                                            backgroundColor: 'grey.300',
                                            fontSize: '0.7rem'
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};