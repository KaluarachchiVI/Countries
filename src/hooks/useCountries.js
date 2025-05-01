import { useState, useEffect } from 'react';
import {
    fetchAllCountries,
    fetchCountryByName,
    fetchCountriesByRegion,
    fetchIndependentCountries,
} from '../services/api';

export const useCountries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllCountries = async () => {
        setLoading(true);
        try {
            const data = await fetchAllCountries();
            setCountries(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch countries');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const searchCountries = async (name) => {
        if (!name.trim()) {
            await getAllCountries();
            return;
        }

        setLoading(true);
        try {
            const data = await fetchCountryByName(name);
            setCountries(data);
            setError(null);
        } catch (err) {
            setError('Country not found');
            setCountries([]);
        } finally {
            setLoading(false);
        }
    };

    const filterByRegion = async (region) => {
        if (!region) {
            await getAllCountries();
            return;
        }

        setLoading(true);
        try {
            const data = await fetchCountriesByRegion(region);
            setCountries(data);
            setError(null);
        } catch (err) {
            setError('Failed to filter by region');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filterIndependent = async (status = true) => {
        setLoading(true);
        try {
            const data = await fetchIndependentCountries(status);
            setCountries(data);
            setError(null);
        } catch (err) {
            setError('Failed to filter independent countries');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCountries();
    }, []);

    return {
        countries,
        loading,
        error,
        getAllCountries,
        searchCountries,
        filterByRegion,
        filterIndependent,
    };
};