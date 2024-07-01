import React, { useState } from 'react';
import { NavLink, useNavigate  } from 'react-router-dom';
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
    { name: 'Полет', icon: <EarthIcon />, activeIcon: <EarthIconActive />, path: '/' },
    { name: 'Экспедиции', icon: <RocketIcon />, activeIcon: <RocketIconActive />, path: '/expeditions' },
    { name: 'Друзья', icon: <FriendsIcon />, activeIcon: <FriendsIconActive />, path: '/friends' },
    { name: 'Задания', icon: <BoxIcon />, activeIcon: <BoxIconActive />, path: '/tasks' },
    { name: 'Улучшения', icon: <BulbIcon />, activeIcon: <BulbIconActive />, path: '/upgrades' },
];

function BottomMenu() {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    // Функция для обработки клика на элемент меню
    const handleMenuItemClick = (index, path) => {
        // Haptic effect
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
        }

        setActiveIndex(index);
        navigate(path); // Переход на указанный путь с использованием роутера
    };

    return (
        <div className="menu">
            <div className="menu-items">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`menu-item ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => handleMenuItemClick(index, item.path)}
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
