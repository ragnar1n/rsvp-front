import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/pages/AuthPages/LoginPage";
import RegistrationPage from "./views/pages/AuthPages/RegistrationPage";
import EventsPage from "./views/pages/EventsPages/EventsPage";
import HomePage from "./views/pages/HomePage/HomePage";
import EventDetailsPage from "./views/pages/EventsPages/EventDetailsPage";
import RSVPPage from "./views/pages/EventsPages/RSVPPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/events/:eventID" element={<EventDetailsPage/>}/>
                <Route path="/rsvp/:eventID" element={<RSVPPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
