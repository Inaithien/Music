import React from 'react';

const Navigation = ({ activePage, setActivePage }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <span className="navbar-brand">Music Events</span>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button
                                className={`nav-link btn ${activePage === 'artists' ? 'active' : ''}`}
                                onClick={() => setActivePage('artists')}
                            >
                                Artists
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link btn ${activePage === 'events' ? 'active' : ''}`}
                                onClick={() => setActivePage('events')}
                            >
                                Events
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;