import React, {useState} from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import './RocketStatus.css';

import rocketImg from '../../img/Rocket.png';


const RocketStatus = ({ workerEnergy, workerEnergyMax, levelProgress, levelProgressMax }) => {
    const [energyFinished, setEnergyFinished] = useState(false); // Состояние для проверки окончания энергии
    const [experienceAdded, setExperienceAdded] = useState(false); // Состояние для проверки добавления опыта

    // Функция обработчика клика по изображени
    const handleClick = () => {
        if (workerEnergy > 10) {
            workerEnergy -= 5;
            levelProgress += 1;
            document.getElementById('energy').textContent = workerEnergy + " из " + workerEnergyMax +" ⚡";
            document.getElementById('exp').textContent = levelProgress + " из " + levelProgressMax +" STAR";

            // document.getElementById('energy-bar').value = levelProgress;
        }
        // Прибавляем опыт
    };

    return (
        <div className="rocket-status">
            <h2>Постройка ракеты</h2>
            <p>Улучшайте ракету для успешных полетов</p>

            <div className="status-item-block">
                <div className="status-item-text-block">
                    <span className="status-item-text-label">Энергия рабочих</span>
                    <span id="energy" className="status-item-text-label">{workerEnergy} из {workerEnergyMax} ⚡</span>
                </div>

                <ProgressBar id="energy-bar" value={workerEnergy} max={workerEnergyMax} color="#27AE60" />
            </div>

            <div className="status-item-block">
                <div className="status-item-text-block">
                    <span className="status-item-text-label">Прогресс уровня</span>
                    <span id="exp" className="status-item-text-label">{levelProgress} из {levelProgressMax} STAR</span>
                </div>

                <ProgressBar id="exp-bar" value={levelProgress} max={levelProgressMax} color="#2F80ED" />
            </div>

            <img onClick={handleClick} className="rocket-image" src={rocketImg} alt=""/>

        </div>
    );
}

export default RocketStatus;
