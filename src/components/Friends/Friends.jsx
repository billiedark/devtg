import React from 'react';
import './Friends.css';
import Button from '../../components/Button/Button';

import avatarImg from '../../img/friend-avatar.webp';

const Friends = () => {
    const friendsList = [
        { id: 1, name: 'Ilya G', status: 'Online', level: 'Level 2', score: '1,200' },
        { id: 2, name: 'Jane D', status: 'Offline', level: 'Level 3', score: '2,300' },
        { id: 3, name: 'John S', status: 'Online', level: 'Level 1', score: '900' },
    ];

    return (
        <div className="outer-container">
            <div className="friends-container">
                <div className="friends-button-place">
                    <Button
                    isDisabled={false}
                    label={'👨‍🔬 Отправить приглашение'}/>
                </div>


                <div className="friend-info-earn">👨🏻 с Telegram Premium принесет 25 000 STAR <br/>
                    🧑🏻 без Telegram Premium принесет 10 000 STAR <br/>
                    а также 1 члена экипажа для экспедиций
                </div>

                <div className="additional-titles">
                    <div className="title">Ваши друзья</div>
                    <div className="subtitle">И бонусы за их участие</div>
                </div>

                <div className="invited-earned-container">
                    <div className="invited">
                        <div className="subtitle-left">👨‍🔬 Приглашено друзей</div>
                        <div className="subtitle-right">3 друга</div>
                    </div>
                    <div className="earned">
                        <div className="subtitle-left">✨ Заработано с друзей</div>
                        <div className="subtitle-right">13 000 STAR</div>
                    </div>
                </div>

                <div className="friends-list">
                    {friendsList.map(friend => (
                        <div className="friend" key={friend.id}>
                            <div className="friend-left">
                                <div className="friend-avatar">
                                    <img src={avatarImg} alt={`${friend.name}`} />
                                </div>
                                <div className="friend-info">
                                    <div className="friend-name">{friend.name}</div>
                                    <div className="friend-status">{friend.status}</div>
                                </div>
                            </div>
                            <div className="friend-right">
                                <div className="friend-level">{friend.level}</div>
                                <div className="friend-score">{friend.score}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Friends;
