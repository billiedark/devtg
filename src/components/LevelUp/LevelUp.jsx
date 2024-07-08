import React from 'react';
import './LevelUp.css';
import levelUpImage from '../../img/level-up.png';

const LevelUp = () => {
    return (
        <div className="level-up">
            <div className="back" />
            <div className="frame">
                <div className="title">Вы <div className="blue-text">повысили</div> свой уровень!</div>
                <div className="subtitle">
                    + 500 к лимиту энергии<br />
                    + 1 к добыче за клик<br />
                    + Улучшена ракета<br />
                    + Новые экспедиции
                </div>
                <img src={levelUpImage} alt="Level Up Character" className="character-image" />
            </div>
        </div>
    );
};

export default LevelUp;
