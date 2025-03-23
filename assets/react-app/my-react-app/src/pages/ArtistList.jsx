import React, { useEffect, useState } from 'react';
import { getArtists } from '../services/api';

const ArtistList = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getArtists();
                console.log('Artists data:', data);

                // Handle data according to its structure
                if (Array.isArray(data)) {
                    setArtists(data);
                } else if (data && typeof data === 'object') {
                    // If the response is an object with artist data
                    setArtists([data]);
                } else {
                    console.warn('Unexpected data format:', data);
                    setArtists([]);
                }
            } catch (err) {
                console.error('Error in fetchArtists:', err);
                setError(err.message || 'Failed to load artists');
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    if (loading) return <p>Loading artists...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <div>
            <h1>Artists</h1>
            {artists.length > 0 ? (
                <div className="artist-list">
                    {artists.map((artist) => (
                        <div key={artist.id} className="artist-card">
                            <h2>{artist.name}</h2>
                            <p>{artist.description}</p>
                            {artist.image && <img src={artist.image} alt={artist.name} />}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No artists found matching your search.</p>
            )}
        </div>
    );
};

export default ArtistList;