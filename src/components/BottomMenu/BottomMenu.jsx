import React, { useState } from 'react';
import './BottomMenu.css';
import { ReactComponent as EarthIcon } from '../../img/menu/earth.svg';
import { ReactComponent as RocketIcon } from '../../img/menu/rocket.svg';
import { ReactComponent as FriendsIcon } from '../../img/menu/friends.svg';
import { ReactComponent as BoxIcon } from '../../img/menu/box.svg';
import { ReactComponent as BulbIcon } from '../../img/menu/bulb.svg';
import { ReactComponent as EarthIconActive } from '../../img/menu/earth_active.svg';
import { ReactComponent as RocketIconActive } from '../../img/menu/rocket_active.svg';
import { ReactComponent as FriendsIconActive } from '../../img/menu/friends_active.svg';
import { ReactComponent as BoxIconActive } from '../../img/menu/box_active.svg';
import { ReactComponent as BulbIconActive } from '../../img/menu/bulb_active.svg';

const menuItems = [
    { name: 'Полет', icon: <EarthIcon />, activeIcon: <EarthIconActive /> },
    { name: 'Экспедиции', icon: <RocketIcon />, activeIcon: <RocketIconActive /> },
    { name: 'Друзья', icon: <FriendsIcon />, activeIcon: <FriendsIconActive /> },
    { name: 'Задания', icon: <BoxIcon />, activeIcon: <BoxIconActive /> },
    { name: 'Улучшения', icon: <BulbIcon />, activeIcon: <BulbIconActive /> },
];

function BottomMenu() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="menu">
            <div className="menu-items">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`menu-item ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        <div className="icon">{index === activeIndex ? item.activeIcon : item.icon}</div>
                        <div className="label">{item.name}</div>
                    </div>
                ))}
            </div>
            <div className="active-line" style={{ left: `${activeIndex * 20}%` }} />
        </div>
    );
}

export default BottomMenu;
