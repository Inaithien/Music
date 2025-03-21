const API_URL = '/api';

export const getArtists = async () => {
    const response = await fetch(`${API_URL}/artists`);
    return response.json();
};

export const getArtist = async (id) => {
    const response = await fetch(`${API_URL}/artists/${id}`);
    return response.json();
};

export const getEvents = async () => {
    const response = await fetch(`${API_URL}/events`);
    return response.json();
};

export const getEvent = async (id) => {
    const response = await fetch(`${API_URL}/events/${id}`);
    return response.json();
};