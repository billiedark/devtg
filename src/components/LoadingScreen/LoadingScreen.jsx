// LoadingScreen.js
import React from 'react';
import './LoadingScreen.css';
import Logo from '../../img/logo.webp'; // путь к вашему логотипу

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="logotype">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="text">
                <h1>Вперед к звездам вместе с STARS</h1>
                <p>Пожалуйста, подождите</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
