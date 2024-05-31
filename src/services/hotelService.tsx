import axios from 'axios';

const API_URL = 'https://localhost:7288/api/Hotel';

export const getHotels = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching hotels:', error);
        throw error;
    }
};
