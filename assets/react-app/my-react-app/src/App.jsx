import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import ArtistList from './pages/ArtistList';
import ArtistDetail from './pages/ArtistDetail';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';

function App() {
    const [activePage, setActivePage] = useState('artists');
    const [selectedArtistId, setSelectedArtistId] = useState(null);
    const [selectedEventId, setSelectedEventId] = useState(null);

    // Reset selection when changing main pages
    useEffect(() => {
        setSelectedArtistId(null);
        setSelectedEventId(null);
    }, [activePage]);

    const renderActivePage = () => {
        if (activePage === 'artists') {
            return selectedArtistId
                ? <ArtistDetail
                    artistId={selectedArtistId}
                    onBack={() => setSelectedArtistId(null)}
                    onEventClick={(eventId) => {
                        setActivePage('events');
                        setSelectedEventId(eventId);
                    }}
                />
                : <ArtistList onArtistClick={setSelectedArtistId} />;
        }

        if (activePage === 'events') {
            return selectedEventId
                ? <EventDetail
                    eventId={selectedEventId}
                    onBack={() => setSelectedEventId(null)}
                    onArtistClick={(artistId) => {
                        setActivePage('artists');
                        setSelectedArtistId(artistId);
                    }}
                />
                : <EventList onEventClick={setSelectedEventId} />;
        }

        return <div>Page not found</div>;
    };

    return (
        <div className="App">
            <Navigation activePage={activePage} setActivePage={setActivePage} />
            <div className="container mt-4">
                {renderActivePage()}
            </div>
        </div>
    );
}

export default App;