import React, {useState, useEffect, useRef} from 'react';

import ProgressBar from '../ProgressBar/ProgressBar';
import './RocketStatus.css';

import rocketImg from '../../img/Rocket.png';

const RocketStatus = ({ workerEnergy, workerEnergyMax, workerEnergyPerTap, workerEnergyPerSecond, levelProgress, levelProgressMax }) => {
    const [energyNow, setEnergyNow] = useState(workerEnergy);
    const [expNow, setExpNow] = useState(levelProgress);
    const lastTapRef = useRef(0);
    const rocketImageRef = useRef(null);

    // Function to handle energy increase
    const increaseEnergy = () => {
        setEnergyNow(prevEnergy => Math.min(prevEnergy + workerEnergyPerSecond, workerEnergyMax));
    };

    // Use useEffect to start the interval when component mounts
    useEffect(() => {
        const energyInterval = setInterval(() => {
            increaseEnergy();
        }, 1000); // Every 1000ms (1 second)

        // Clean up the interval on component unmount
        return () => clearInterval(energyInterval);
    }, []); // Empty dependency array ensures it runs only once on mount

    // Rocket handler
    const handleClick = (event) => {
        // Finger math pt.1 (Ignore double click)
        const now = Date.now();
        if (now - lastTapRef.current < 50) {
            return;
        }
        lastTapRef.current = now;

        // Disable scroll pt.1
        event.preventDefault();

        if (energyNow > 10) {
            // Finger math pt.2
            const touchCount = event.touches.length;

            // Resources math
            setEnergyNow(energyNow - (workerEnergyPerTap * touchCount));
            setExpNow(expNow + (2 * touchCount));

            // Haptic effect
            if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
                window.Telegram.WebApp.HapticFeedback.impactOccurred('soft');
            }

            // Flash effect
            const rocketImageElement = rocketImageRef.current;
            if (rocketImageElement) {
                rocketImageElement.classList.add('flash');
                setTimeout(() => {
                    rocketImageElement.classList.remove('flash');
                }, 100);
            }
        }
    };

    // Disable scroll pt.2
    useEffect(() => {
        const rocketImage = document.querySelector('.rocket-image');

        rocketImage.addEventListener('touchstart', handleClick, { passive: false });

        return () => {
            rocketImage.removeEventListener('touchstart', handleClick);
        };
    }, [energyNow, expNow]);

    return (
        <div className="rocket-status">
            <h2>Постройка ракеты</h2>
            <p>Улучшайте ракету для успешных полетов</p>

            <div className="status-item-block">
                <div className="status-item-text-block">
                    <span className="status-item-text-label">Энергия рабочих</span>
                    <span id="energy" className="status-item-text-label">{energyNow} из {workerEnergyMax} ⚡</span>
                </div>

                <ProgressBar id="energy-bar" value={energyNow} max={workerEnergyMax} color="#27AE60" />
            </div>

            <div className="status-item-block">
                <div className="status-item-text-block">
                    <span className="status-item-text-label">Прогресс уровня</span>
                    <span id="exp" className="status-item-text-label">{expNow} из {levelProgressMax} STAR</span>
                </div>

                <ProgressBar id="exp-bar" value={expNow} max={levelProgressMax} color="#2F80ED" />
            </div>


            <div className="rocket-image" onTouchStart={handleClick} ref={rocketImageRef}>
                <img className="rocket-image" src={rocketImg} alt="Rocket" />
            </div>

        </div>
    );
}

export default RocketStatus;
