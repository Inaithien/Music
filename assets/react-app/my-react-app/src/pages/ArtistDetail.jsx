import { useState, useEffect } from 'react';
import { getArtist } from '../services/api';

const ArtistDetail = ({ artistId, onBack, onEventClick }) => {
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const data = await getArtist(artistId);
                setArtist(data);
            } catch (error) {
                console.error('Error fetching artist details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtist();
    }, [artistId]);

    if (loading) {
        return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
    }

    if (!artist) {
        return <div className="alert alert-danger">Artist not found</div>;
    }

    return (
        <div>
            <button className="btn btn-outline-secondary mb-4" onClick={onBack}>
                &larr; Back to Artists
            </button>

            <div className="row">
                <div className="col-md-4">
                    <img
                        src={artist.image}
                        alt={artist.name}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-8">
                    <h1>{artist.name}</h1>
                    <p className="lead">{artist.description}</p>

                    <h3 className="mt-4">Events</h3>
                    {artist.events && artist.events.length > 0 ? (
                        <div className="list-group">
                            {artist.events.map(event => (
                                <button
                                    key={event.id}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => onEventClick(event.id)}
                                >
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{event.name}</h5>
                                        <small>
                                            {new Date(event.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </small>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p>No upcoming events for this artist.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArtistDetail;