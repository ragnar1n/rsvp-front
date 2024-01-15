import '../style/style.css'
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ isAuthenticated, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic, then navigate to the login page
        onLogout();
        navigate("/login");
    };

    return (
        <header>

                <div className='title'>Mock RSVP Site</div>
                {isAuthenticated && (
                    <button onClick={handleLogout} className='logout-button'>
                        Logout
                    </button>

                )}



        </header>
    );
};

export default Header;
