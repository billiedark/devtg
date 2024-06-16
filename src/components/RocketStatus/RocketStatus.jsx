import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import './RocketStatus.css';

const RocketStatus = ({ workerEnergy, workerEnergyMax, levelProgress, levelProgressMax }) => {
    return (
        <div className="rocket-status">
            <h2>Постройка ракеты</h2>
            <p>Улучшайте ракету для успешных полетов</p>
            <div className="status-item-block">
                <div className="status-item-text-block">
                    <span className="status-item-text-label">Энергия рабочих</span>
                    <span className="status-item-text-label">{workerEnergy} из {workerEnergyMax} ⚡</span>
                </div>

                <ProgressBar value={workerEnergy} max={workerEnergyMax} color="#27AE60" />
            </div>

            <div className="status-item-block">
                <div className="status-item-text-block">
                    <span className="status-item-text-label">Прогресс уровня</span>
                    <span className="status-item-text-label">{levelProgress} из {levelProgressMax} STAR</span>
                </div>

                <ProgressBar value={levelProgress} max={levelProgressMax} color="#2F80ED" />
            </div>

        </div>
    );
}

export default RocketStatus;
