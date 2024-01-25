import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FormInput from '../../components/FormInput'; // Assuming you have a FormInput component
import '../../style/style.css';
import './events.css'

const EventDetailsPage = () => {
    const [eventDetails, setEventDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [newMod, setNewMod] = useState('');
    const [moderator, setModerator] = useState('');
    const [isAddModeratorForm, setIsAddModeratorForm] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedEventTitle, setUpdatedEventTitle] = useState(''); // Add state for updated event title
    const [updatedEventDate, setUpdatedEventDate] = useState(''); // Add state for updated event date
    const [updatedEventLocation, setUpdatedEventLocation] = useState(''); // Add state for updated event location
    const [updatedEventDescription, setUpdatedEventDescription] = useState('');


    const navigate = useNavigate();
    const { eventID } = useParams();

    const fetchEventDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.get(`http://localhost:3006/events/${eventID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEventDetails(response.data);
        } catch (error) {
            setErrorMessage('Failed to fetch event details.');
            console.error('Failed to fetch event details:', error);
        }
    };

    const handleEditEvent = async () => {
        setIsEditMode(true);
        setUpdatedEventTitle(eventDetails.title);
        setUpdatedEventDate(eventDetails.date);
        setUpdatedEventLocation(eventDetails.location);
        setUpdatedEventDescription(eventDetails.description);
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
    };

    const handleUpdateEvent = async () => {
        try {
            const token = localStorage.getItem('token');
            const updatedEventData = {
                title: updatedEventTitle,
                date: updatedEventDate,
                location: updatedEventLocation,
                description: updatedEventDescription,
            };

            console.log(updatedEventData);
            const response = await axios.patch(
                `http://localhost:3006/events/${eventID}`,
                updatedEventData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);

            fetchEventDetails();

            setIsEditMode(false);
        } catch (error) {
            console.error('Failed to update event:', error);
            setErrorMessage('Failed to update event.');
        }
    };


    const handleToggleForm = (isAddForm) => {
        setIsAddModeratorForm(isAddForm);
        setNewMod('');
        setModerator('');
    };

    const handleModeratorAction = async () => {
        try {
            const token = localStorage.getItem('token');
            let response;

            if (isAddModeratorForm) {
                response = await axios.post(`http://localhost:3006/events/${eventID}/addmoderator`, { newMod }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                response = await axios.delete(`http://localhost:3006/events/${eventID}/removemoderator`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: { moderator },
                });
            }

            console.log(response.data);

            fetchEventDetails();

            setIsAddModeratorForm(false);
        } catch (error) {
            console.error(`Failed to ${isAddModeratorForm ? 'add' : 'remove'} moderator:`, error);
            setErrorMessage(`Failed to ${isAddModeratorForm ? 'add' : 'remove'} moderator.`);
        }
    };

    const handleDeleteEvent = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:3006/events/${eventID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);

            navigate('/events');
        } catch (error) {
            console.error('Failed to delete event:', error);
            setErrorMessage('Failed to delete event.');
        }
    };

    useEffect(() => {
        fetchEventDetails();
    }, [eventID, navigate]);

    if (!eventDetails) {
        return (
            <div>
                <Header />
                <p>Loading...</p>
                <Footer />
            </div>
        );
    }

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
                <h2>Event Details</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div className='event-container'>
                    <h3>{eventDetails.title}</h3>
                    <p>Date: {new Date(eventDetails.date).toLocaleDateString('en-GB')}</p>
                    <p>Location: {eventDetails.location}</p>
                    <p>Host: {eventDetails.host}</p>
                    <p className="event-details">{eventDetails.description}</p>
                    <div className="button-container">
                        <button className="edit-button" onClick={handleEditEvent}>Edit Event</button>
                        <button className="delete-button" onClick={handleDeleteEvent}>Delete Event</button>
                        <button className="moderator-button" onClick={() => handleToggleForm(!isAddModeratorForm)}>
                            {isAddModeratorForm ? 'Add Moderator' : 'Remove Moderator'}
                        </button>
                    </div>

                    {isEditMode && (
                        <form  className="event-form-container" onSubmit={(e) => { e.preventDefault(); handleUpdateEvent() }}>
                            <FormInput
                                type="text"
                                name="updatedEventTitle"
                                label="Title:"
                                value={updatedEventTitle}
                                onChange={(e) => setUpdatedEventTitle(e.target.value)}
                            />
                            <FormInput
                                type="date"
                                name="updatedEventDate"
                                label="Date:"
                                value={updatedEventDate}
                                onChange={(e) => setUpdatedEventDate(e.target.value)}
                            />
                            <FormInput
                                type="text"
                                name="updatedEventLocation"
                                label="Location:"
                                value={updatedEventLocation}
                                onChange={(e) => setUpdatedEventLocation(e.target.value)}
                            />
                            <FormInput
                                type="textarea"
                                name="updatedEventDescription"
                                label="Description:"
                                value={updatedEventDescription}
                                onChange={(e) => setUpdatedEventDescription(e.target.value)}
                            />
                            <button className="edit-button" type="submit">Update Event</button>
                            <button type="button" onClick={handleCancelEdit}>Cancel</button>
                        </form>
                    )}

                    {(isAddModeratorForm || !isAddModeratorForm) && (
                        <form onSubmit={(e) => { e.preventDefault(); handleModeratorAction() }}>
                            <FormInput
                                type="text"
                                name={isAddModeratorForm ? "newMod" : "moderator"}
                                label={isAddModeratorForm ? "New Moderator:" : "Moderator to Remove:"}
                                placeholder={`Enter ${isAddModeratorForm ? 'new moderator username or email' : 'moderator username or email'}`}
                                onChange={(e) => (isAddModeratorForm ? setNewMod(e.target.value) : setModerator(e.target.value))}
                            />
                            <button className="moderator-button" type="submit">{isAddModeratorForm ? 'Add' : 'Remove'}</button>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EventDetailsPage;