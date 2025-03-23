const API_URL = 'http://127.0.0.1:8000/api';

// Helper function for API requests
const fetchAPI = async (endpoint) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching from ${endpoint}:`, error);
        throw error;
    }
};

export const getArtists = async () => {
    return fetchAPI('/artists');
};

export const getArtist = async (id) => {
    return fetchAPI(`/artists/${id}`);
};

export const getEvents = async () => {
    return fetchAPI('/events');
};

export const getEvent = async (id) => {
    return fetchAPI(`/events/${id}`);
};