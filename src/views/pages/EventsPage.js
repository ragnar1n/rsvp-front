import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/style.css'
import Header from "../components/Header";
import Footer from "../components/Footer";

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3006/events', {
                headers: {
                    // Include authentication token if needed
                    // Authorization: `Bearer ${yourAuthToken}`,
                },
            });

            setEvents(response.data.events);
        } catch (error) {
            setErrorMessage('Failed to fetch events.');
            console.error('Failed to fetch events:', error);
        }
    };

    return (
        <div>
            <Header isAuthenticated={true} onLogout={() => console.log("Logout")} />
            <main>
                <h2>Events</h2>
                <div className='event-container'>
                    <ul>
                        {events.map((event) => (
                            <li key={event.id}>
                                <strong>{event.title}</strong> - {event.description}
                            </li>
                        ))}
                    </ul>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
            </main>
            <Footer/>
        </div>

    );
};

export default EventsPage;
