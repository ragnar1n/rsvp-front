import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/style.css'
import Header from "../components/Header";
import FormInput from "../components/FormInput";
import Footer from "../components/Footer";

const HomePage = () => {
    const [upcomingEvent, setUpcomingEvent] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);

    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDate, setNewEventDate] = useState('');
    const [newEventLocation, setNewEventLocation] = useState('');
    const [newEventOrganizerID, setNewEventOrganizerID] = useState('');
    const [newEventDescription, setNewEventDescription] = useState('');

    useEffect(() => {
        fetchUpcomingEvent();
    }, []);

    const fetchUpcomingEvent = async () => {
        try {
            const response = await axios.get('http://localhost:3006/upcoming', {
                headers: {
                    // Include authentication token if needed
                    // Authorization: `Bearer ${yourAuthToken}`,
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
                organizerID: newEventOrganizerID,
                description: newEventDescription,
            };

            await axios.post('http://localhost:3006/create-event', eventData, {
                headers: {
                    // Include authentication token if needed
                    // Authorization: `Bearer ${yourAuthToken}`,
                },
            });

            // Fetch upcoming event again after creating a new event
            fetchUpcomingEvent();
            setShowCreateEventForm(false);
        } catch (error) {
            setErrorMessage('Failed to create event. Please try again.');
            console.error('Failed to create event:', error);
        }
    };

    return (
        <div>
            <Header isAuthenticated={true} onLogout={() => console.log("Logout")} />
            <main>
                <h2>Home Page</h2>

                <div className='event-container'>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {upcomingEvent && (
                        <div>
                            <h3>Upcoming Event</h3>

                            <p>
                                <strong>{upcomingEvent.title}</strong> - {upcomingEvent.description}
                            </p>
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
                                type="text"
                                name="newEventOrganizerID"
                                label="Organizer ID:"
                                placeholder="Enter organizer ID"
                                onChange={(e) => setNewEventOrganizerID(e.target.value)}
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
            <Footer/>
        </div>

    );
};

export default HomePage;
