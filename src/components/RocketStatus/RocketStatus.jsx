import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import './RocketStatus.css';

const RocketStatus = ({ workerEnergy, workerEnergyMax, levelProgress, levelProgressMax }) => {
    return (
        <div className="rocket-status">
            <h2>Постройка ракеты</h2>
            <p>Улучшайте ракету для успешных полетов</p>
            <div className="status-item">
                <span>Энергия рабочих</span>
                <span>{workerEnergy} из {workerEnergyMax} ⚡</span>
                <ProgressBar value={workerEnergy} max={workerEnergyMax} color="green" />
            </div>
            <div className="status-item">
                <span>Прогресс уровня</span>
                <span>{levelProgress} из {levelProgressMax} STAR</span>
                <ProgressBar value={levelProgress} max={levelProgressMax} color="blue" />
            </div>
        </div>
    );
}

export default RocketStatus;
