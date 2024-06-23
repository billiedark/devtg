import React, { useState, useEffect, useRef } from 'react';

import ProgressBar from '../ProgressBar/ProgressBar';
import ProfileCard from "../ProfileCard/ProfileCard";
import Button from "../Button/Button";
import './RocketStatus.css';
import FallingStars from '../FallingStars/FallingStars';

import avatarImg from "../../img/avatar.png";
import { useTelegram } from "../../hooks/useTelegram";

const RocketStatus = ({ workerEnergy, workerEnergyMax, workerEnergyPerTap, workerEnergyPerSecond, balance, level, levelProgressNext, isDev }) => {
    const [energyNow, setEnergyNow] = useState(workerEnergy);
    const [expNow, setExpNow] = useState(1);
    const lastTapRef = useRef(0);
    const [floatingText, setFloatingText] = useState([]);
    let username = 'loading..'

    // Header
    const { tg, user } = useTelegram();
    const [avatarUrl, setAvatarUrl] = useState(`https://dbd20rank.net/static/img/stars_avatars/${user?.id}.jpg`);

    // Name generation
    if (isDev)
        username = "chief baccaraaa";
    else
        username = user?.first_name;

    // Function to handle energy increase
    const increaseEnergy = () => {
        setEnergyNow(prevEnergy => Math.min(prevEnergy + workerEnergyPerSecond, workerEnergyMax));
    };

    // Use useEffect to start the interval when component mounts
    useEffect(() => {
        const energyInterval = setInterval(() => {
            increaseEnergy();
        }, 1000); // Every 1000ms (1 second)

        // Clean up the interval on component unmount
        return () => clearInterval(energyInterval);
    }, []); // Empty dependency array ensures it runs only once on mount

    // Function to add floating text
    const addFloatingText = (x, y) => {
        const id = Date.now();
        setFloatingText(prev => [...prev, { id, x, y }]);

        setTimeout(() => {
            setFloatingText(prev => prev.filter(item => item.id !== id));
        }, 1000); // Remove after 1 second
    };

    // Profile photo handler
    useEffect(() => {
        const checkImage = (url) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
            });
        };

        const verifyAvatarUrl = async () => {
            const isValid = await checkImage(avatarUrl);
            if (!isValid) {
                setAvatarUrl(avatarImg);
            }
        };

        verifyAvatarUrl();
    }, [avatarUrl]);

    // Update Balance
    useEffect(() => {
        if (balance !== undefined && !isNaN(balance)) {
            setExpNow(Number(balance));
        }
    }, [balance]);


    return (
        <div className="rocket-status">
            <ProfileCard
                avatar={avatarUrl}
                name={username}
                level={level}
                balance={expNow}
            />

            <h2>Путешествие</h2>
            <p>Нажимайте на полотно, чтобы ускорить звезды</p>

            <div className="status-item-block">
                <div className="status-item-text-block">
                    <span className="status-item-text-label status-item-label">Энергия рабочих</span>
                    <span id="energy" className="status-item-text-label">{energyNow} из {workerEnergyMax} ⚡</span>
                </div>

                <ProgressBar id="energy-bar" value={energyNow} max={workerEnergyMax} color="#27AE60" />
            </div>

            <div className="status-item-block">
                <div className="status-item-text-block">
                    <span className="status-item-text-label status-item-label">Прогресс уровня</span>
                    <span id="exp" className="status-item-text-label">{expNow} из {levelProgressNext} STAR</span>
                </div>

                <ProgressBar id="exp-bar" value={expNow} max={levelProgressNext} color="#2F80ED" />
            </div>

            <FallingStars />

            {floatingText.map(text => (
                <div
                    key={text.id}
                    className="floating-text"
                    style={{ left: text.x, top: text.y }}
                >
                    +{workerEnergyPerTap}
                </div>
            ))}
        </div>
    );
}

export default RocketStatus;
