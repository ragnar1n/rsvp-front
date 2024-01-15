import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../src/views/pages/LoginPage";
import RegistrationPage from "../src/views/pages/RegistrationPage";
import EventsPage from "../src/views/pages/EventsPage";
import HomePage from "../src/views/pages/HomePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
