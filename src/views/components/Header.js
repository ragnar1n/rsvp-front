import '../style/style.css'
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {

        navigate("/login");
    };

    return (
        <header>
                <div className='title'>Mock RSVP Site</div>
        </header>
    );
};

export default Header;
