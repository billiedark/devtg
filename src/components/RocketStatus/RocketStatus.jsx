import React, {useState} from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import './RocketStatus.css';

import rocketImg from '../../img/Rocket.png';
import constructionGif from '../../img/building.gif';
import constructionSound from '../../audio/builder.mp3';


const RocketStatus = ({ workerEnergy, workerEnergyMax, levelProgress, levelProgressMax }) => {
    const [energyNow, setEnergyNow] = useState(workerEnergy);
    const [expNow, setExpNow] = useState(levelProgress);

    // Функция обработчика клика по изображени
    const handleClick = (e) => {
        if (energyNow > 10) {
            console.log(energyNow);
            setEnergyNow(energyNow - 10);
            setExpNow(expNow + 2)

            // Создаем .gif анимацию
            const gif = new Image();
            gif.src = constructionGif;
            gif.classList.add('gif-animation');

            // Рассчитываем позицию .gif анимации относительно клика
            const rect = e.currentTarget.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;

            gif.style.left = `${offsetX}px`;
            gif.style.top = `${offsetY}px`;

            e.currentTarget.appendChild(gif);

            // Воспроизводим звук
            const audio = new Audio(constructionSound);
            audio.play();

            // Удаляем .gif и звук через некоторое время
            setTimeout(() => {
                gif.remove();
            }, 750); // Предполагаемая длительность .gif анимации
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
