import React from 'react';
import { Link } from 'react-router-dom';
import '../style/style.css';
import './components.css'

const Footer = () => {
    return (
        <footer className="footer-container">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/events">Events</Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
