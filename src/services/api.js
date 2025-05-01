import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all countries:', error);
        return [];
    }
};

export const fetchCountryByName = async (name) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/name/${name}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching country by name:', error);
        return [];
    }
};

export const fetchCountriesByRegion = async (region) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/region/${region}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries by region:', error);
        return [];
    }
};

export const fetchCountryByCode = async (code) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/alpha/${code}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching country by code:', error);
        return null;
    }
};

export const fetchIndependentCountries = async (status = true) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/independent?status=${status}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching independent countries:', error);
        return [];
    }
};

export const fetchCountriesByCodes = async (codes) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/alpha?codes=${codes}`);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching countries by codes:', error);
        return [];
    }
};


