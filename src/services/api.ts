import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://3.7.81.243/projects/plie-api/public/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = async (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await AsyncStorage.setItem('authToken', token);
    } else {
        delete api.defaults.headers.common['Authorization'];
        await AsyncStorage.removeItem('authToken');
    }
};

export const checkAuthToken = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return true;
    }
    return false;
};

export const login = async (email: string, password: string) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const response = await api.post('/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw error;
    }
};

export const getEvents = async () => {
    try {
        const response = await api.post('/events-listing');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw error;
    }
};

export default api;
