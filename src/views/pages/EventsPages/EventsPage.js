import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/style.css';
import './events.css'
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        } else {
            fetchEvents();
        }
    }, [navigate]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3006/events', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setEvents(response.data.events);
        } catch (error) {
            setErrorMessage('Failed to fetch events.');
            console.error('Failed to fetch events:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <Header />
            <main>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
                <h2>Events</h2>
                <div className='event-container'>
                    <ul>
                        {events.map((event) => (
                            <li key={event.idEvent}>
                                <strong>{event.title}</strong>
                                <p>Date: {new Date(event.date).toLocaleDateString('en-GB')}</p>
                                <p>Location: {event.location}</p>
                                <Link to={`/events/${event.idEvent}`}>Details</Link>
                            </li>
                        ))}
                    </ul>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EventsPage;
