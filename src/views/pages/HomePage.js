import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/style.css';
import Header from "../components/Header";
import FormInput from "../components/FormInput";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [upcomingEvent, setUpcomingEvent] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);

    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDate, setNewEventDate] = useState('');
    const [newEventLocation, setNewEventLocation] = useState('');
    const [newEventDescription, setNewEventDescription] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        } else {
            fetchUpcomingEvent();
        }
    }, [navigate]);

    const fetchUpcomingEvent = async () => {
        try {
            const response = await axios.get('http://localhost:3006/upcoming', {
                headers: {
                    // Include authentication token
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setUpcomingEvent(response.data);
        } catch (error) {
            setErrorMessage('Failed to fetch upcoming events.');
            console.error('Failed to fetch upcoming events:', error);
        }
    };

    const handleCreateEvent = () => {
        setShowCreateEventForm(true);
    };

    const handleCloseCreateEventForm = () => {
        setShowCreateEventForm(false);
    };

    const handleCreateEventSubmit = async (e) => {
        e.preventDefault();

        try {
            const eventData = {
                title: newEventTitle,
                date: newEventDate,
                location: newEventLocation,
                description: newEventDescription,
            };

            await axios.post('http://localhost:3006/create-event', eventData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            fetchUpcomingEvent();
            setShowCreateEventForm(false);
        } catch (error) {
            setErrorMessage('Failed to create an event. Please try again.');
            console.error('Failed to create an event:', error);
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
                <h2>Home Page</h2>

                <div className='event-container'>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {upcomingEvent && (
                        <div className="event-box">
                            <h3>Upcoming Event</h3>
                            <div className="event-details">
                                <div>
                                    <strong>{upcomingEvent.title}</strong>
                                </div>
                                <div>
                                    <strong>Date:</strong> {new Date(upcomingEvent.date).toLocaleDateString('en-GB')}
                                </div>
                                <div>
                                    <strong>Location:</strong> {upcomingEvent.location}
                                </div>
                                <div>
                                    <strong>Description:</strong> <p>{upcomingEvent.description}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button onClick={handleCreateEvent}>Create Event</button>

                {showCreateEventForm && (
                    <div className="event-form-container">
                        <h3>Create New Event</h3>
                        <form onSubmit={handleCreateEventSubmit}>
                            <FormInput
                                type="text"
                                name="newEventTitle"
                                label="Title:"
                                placeholder="Enter event title"
                                onChange={(e) => setNewEventTitle(e.target.value)}
                            />
                            <FormInput
                                type="date"
                                name="newEventDate"
                                label="Date:"
                                placeholder="Select date"
                                onChange={(e) => setNewEventDate(e.target.value)}
                            />
                            <FormInput
                                type="text"
                                name="newEventLocation"
                                label="Location:"
                                placeholder="Enter event location"
                                onChange={(e) => setNewEventLocation(e.target.value)}
                            />
                            <FormInput
                                type="textarea"
                                name="newEventDescription"
                                label="Description:"
                                placeholder="Enter event description"
                                onChange={(e) => setNewEventDescription(e.target.value)}
                            />

                            <button type="submit">Submit</button>
                            <button className='button' type="button" onClick={handleCloseCreateEventForm}>
                                Cancel
                            </button>
                        </form>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
