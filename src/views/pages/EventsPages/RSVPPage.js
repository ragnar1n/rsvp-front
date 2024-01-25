import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import '../../style/style.css';
import './events.css'

const RSVPPage = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const { eventID } = useParams();

    const handleRSVP = async () => {
        try {
            const resp = await axios.post(`http://localhost:3006/rsvp/${eventID}`, {
                name,
                phoneNumber,
                email,
                response,
                additionalInfo,
            });

            console.log(resp.data);

            navigate('/login');
        } catch (error) {
            setErrorMessage('Failed to submit RSVP.');
            console.error('Failed to submit RSVP:', error);
        }
    };

    return (
        <div>
            <Header />
            <main>
                <div className="event-form-container">
                    <h3>RSVP for Event</h3>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <form>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />

                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="response">Response:</label>
                        <select id="response" value={response} onChange={(e) => setResponse(e.target.value)}>
                            <option value="Interested">Interested</option>
                            <option value="Attending">Attending</option>
                        </select>

                        <label htmlFor="additionalInfo">Additional Info:</label>
                        <textarea
                            id="additionalInfo"
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                        />
                        <button type="button" onClick={handleRSVP}>
                            Submit RSVP
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default RSVPPage;
