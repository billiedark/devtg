import React from 'react';
import './ProfileCard.css'; // Предположим, что стили будут в отдельном файле

const ProfileCard = ({ avatar, name, level, balance }) => {
    return (
        <div className="profile-card">
            <img src={avatar} alt="Avatar" className="avatar" />
            <div className="profile-info">
                <div className="name">{name}</div>
                <div className="level">Уровень {level}</div>
            </div>
            <div className="balance">
                {balance} STAR
                <div className="balance-text">Баланс</div>
            </div>
        </div>
    );
}

export default ProfileCard;
