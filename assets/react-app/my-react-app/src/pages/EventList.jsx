import { useState, useEffect } from 'react';
import { getEvents } from '../services/api';

const EventList = ({ onEventClick }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const toggleSortOrder = (field) => {
        if (field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const filteredAndSortedEvents = events
        .filter(event =>
            event.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortField === 'name') {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                return sortOrder === 'asc'
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA);
            } else if (sortField === 'date') {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return sortOrder === 'asc'
                    ? dateA - dateB
                    : dateB - dateA;
            }
            return 0;
        });

    if (loading) {
        return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
    }

    return (
        <div>
            <h1>Events</h1>

            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-6 text-end">
                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => toggleSortOrder('name')}
                    >
                        Sort by Name {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => toggleSortOrder('date')}
                    >
                        Sort by Date {sortField === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </button>
                </div>
            </div>

            <div className="row">
                {filteredAndSortedEvents.length > 0 ? (
                    filteredAndSortedEvents.map(event => (
                        <div className="col-md-4 mb-4" key={event.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{event.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        {new Date(event.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </h6>
                                    <div className="d-flex align-items-center mb-3">
                                        <div
                                            className="rounded-circle me-2"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                backgroundImage: `url(${event.artist.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        ></div>
                                        <span>{event.artist.name}</span>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() => onEventClick(event.id)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No events found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventList;