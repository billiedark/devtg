import React, {useState, useEffect} from 'react';

import ProgressBar from '../ProgressBar/ProgressBar';
import './RocketStatus.css';

import rocketImg from '../../img/Rocket.png';

const RocketStatus = ({ workerEnergy, workerEnergyMax, workerEnergyPerTap, workerEnergyPerSecond, levelProgress, levelProgressMax }) => {
    const [energyNow, setEnergyNow] = useState(workerEnergy);
    const [expNow, setExpNow] = useState(levelProgress);

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

    // Функция обработчика клика по изображени
    const handleClick = () => {
        if (energyNow > 10) {
            setEnergyNow(energyNow - workerEnergyPerTap);
            setExpNow(expNow + 2)
        }
    };

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

            <div className="rocket-image" onClick={handleClick}>
                <img className="rocket-image" src={rocketImg} alt="Rocket" />
            </div>

        </div>
    );
}

export default RocketStatus;
