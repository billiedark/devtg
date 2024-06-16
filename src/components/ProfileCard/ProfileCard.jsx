import React from 'react';
import './ProfileCard.css';
import { truncate } from '../truncate';

const ProfileCard = ({ avatar, name, level, balance }) => {
    const truncatedName = truncate(name, 20);

    return (
        <div className="profile-card">
            <img src={avatar} alt="Avatar" className="avatar" />
            <div className="profile-info">
                <div className="name">{truncatedName}</div>
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
