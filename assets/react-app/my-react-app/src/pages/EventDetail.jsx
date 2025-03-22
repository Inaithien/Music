import { useState, useEffect } from 'react';
import { getEvent } from '../services/api';

const EventDetail = ({ eventId, onBack, onArtistClick }) => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEvent(eventId);
                setEvent(data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (loading) {
        return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
    }

    if (!event) {
        return <div className="alert alert-danger">Event not found</div>;
    }

    return (
        <div>
            <button className="btn btn-outline-secondary mb-4" onClick={onBack}>
                &larr; Back to Events
            </button>

            <div className="card">
                <div className="card-header">
                    <h1>{event.name}</h1>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Event Details</h3>
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</p>

                            <h3 className="mt-4">Artist</h3>
                            <div className="d-flex align-items-center mb-3">
                                <div
                                    className="rounded-circle me-3"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        backgroundImage: `url(${event.artist.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                ></div>
                                <div>
                                    <h4>{event.artist.name}</h4>
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => onArtistClick(event.artist.id)}
                                    >
                                        View artist profile
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <h3>Participants ({event.participants ? event.participants.length : 0})</h3>
                            {event.participants && event.participants.length > 0 ? (
                                <ul className="list-group">
                                    {event.participants.map(participant => (
                                        <li key={participant.id} className="list-group-item">
                                            {participant.email}
                                            {participant.id === event.creator.id && (
                                                <span className="badge bg-primary ms-2">Organizer</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No participants yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;