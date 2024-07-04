import React, { useState } from 'react';
import './Onboarding.css';
import onboarding1Image from '../../img/onboarding/image1.png' // Update with actual path
import onboarding2Image from '../../img/onboarding/image2.png'; // Update with actual path
import onboarding3Image from '../../img/onboarding/image3.png'; // Update with actual path

const Onboarding = ({ onClose }) => {
    const [step, setStep] = useState(1);

    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            onClose(); // Закрытие онбординга
        }
    };

    return (
        <div className="onboarding-container">
            {step === 1 && (
                <>
                    <div className="onboarding-subtitle">Как заработать монеты</div>
                    <div className="onboarding-title">Нажимайте на ракету пока есть энергия и зарабатывайте STARS</div>
                    <div className="onboarding-image-background" style={{ backgroundImage: `url(${onboarding1Image})` }} />
                    <div className="onboarding-button" onClick={handleNextStep}>
                        <div className="onboarding-button-label">👌 Это понятно, дальше</div>
                    </div>
                </>
            )}
            {step === 2 && (
                <>
                    <div className="onboarding-subtitle">Что дают друзья в игре</div>
                    <div className="onboarding-title">Каждый ваш приглашенный друг, это член вашего экипажа</div>
                    <div className="onboarding-image-background" style={{ backgroundImage: `url(${onboarding2Image})` }} />
                    <div className="onboarding-button" onClick={handleNextStep}>
                        <div className="onboarding-button-label">🤔 А что такое экспедиции?</div>
                    </div>
                </>
            )}
            {step === 3 && (
                <>
                    <div className="onboarding-subtitle">Что дают экспедиции</div>
                    <div className="onboarding-title">По мере роста вашего уровня, вам будут доступны более выгодные экспедиции</div>
                    <div className="onboarding-image-background" style={{ backgroundImage: `url(${onboarding3Image})` }} />
                    <div className="onboarding-button" onClick={handleNextStep}>
                        <div className="onboarding-button-label">❤️ Спасибо, я понял</div>
                    </div>
                </>
            )}
            <div className="onboarding-close-button" onClick={onClose} />
            <div className="onboarding-pages">
                <div className={`onboarding-page-indicator ${step === 1 ? 'active' : ''}`} />
                <div className={`onboarding-page-indicator ${step === 2 ? 'active' : ''}`} />
                <div className={`onboarding-page-indicator ${step === 3 ? 'active' : ''}`} />
            </div>
        </div>
    );
};

export default Onboarding;
