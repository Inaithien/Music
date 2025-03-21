import { useState, useEffect } from 'react';
import { getArtists } from '../services/api';

const ArtistList = ({ onArtistClick }) => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const data = await getArtists();
                setArtists(data);
            } catch (error) {
                console.error('Error fetching artists:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const filteredAndSortedArtists = artists
        .filter(artist =>
            artist.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return sortOrder === 'asc'
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        });

    if (loading) {
        return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
    }

    return (
        <div>
            <h1>Artists</h1>

            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search artists..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-6 text-end">
                    <button className="btn btn-outline-secondary" onClick={toggleSortOrder}>
                        Sort by Name {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
            </div>

            <div className="row">
                {filteredAndSortedArtists.length > 0 ? (
                    filteredAndSortedArtists.map(artist => (
                        <div className="col-md-4 mb-4" key={artist.id}>
                            <div className="card h-100">
                                <img
                                    src={artist.image}
                                    className="card-img-top"
                                    alt={artist.name}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{artist.name}</h5>
                                    <p className="card-text">
                                        {artist.description.length > 100
                                            ? `${artist.description.substring(0, 100)}...`
                                            : artist.description}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() => onArtistClick(artist.id)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No artists found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtistList;