import React, {useState, useEffect, useRef} from 'react';

import ProgressBar from '../ProgressBar/ProgressBar';
import ProfileCard from "../ProfileCard/ProfileCard";
import Button from "../Button/Button";
import './RocketStatus.css';

import rocketVideo from '../../img/rocket-gif.mp4';
import avatarImg from "../../img/avatar.png";

import {useTelegram} from "../../hooks/useTelegram";

const RocketStatus = ({ workerEnergy, workerEnergyMax, workerEnergyPerTap, workerEnergyPerSecond, levelProgress, levelProgressMax }) => {
    const [energyNow, setEnergyNow] = useState(workerEnergy);
    const [expNow, setExpNow] = useState(levelProgress);
    const lastTapRef = useRef(0);
    const rocketVideoRef = useRef(null);
    const [floatingText, setFloatingText] = useState([]);


    // Header
    const { tg, user } = useTelegram();
    const [avatarUrl, setAvatarUrl] = useState(`https://dbd20rank.net/static/img/stars_avatars/${user?.id}.jpg`);

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

    // Rocket handler
    const handleClick = (event) => {
        // Finger math pt.1 (Ignore double click)
        const now = Date.now();
        if (now - lastTapRef.current < 50) {
            return;
        }
        lastTapRef.current = now;

        // Disable scroll pt.1
        event.preventDefault();

        if (energyNow > 10) {
            // Finger math pt.2
            const touchCount = event.touches.length;

            // Resources math
            setEnergyNow(energyNow - (workerEnergyPerTap * touchCount));
            setExpNow(expNow + (workerEnergyPerTap * touchCount));

            // Haptic effect
            if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
                window.Telegram.WebApp.HapticFeedback.impactOccurred('soft');
            }

            // Add floating text
            const x = event.touches[0].clientX;
            const y = event.touches[0].clientY;
            addFloatingText(x, y);
        }
    };

    // Disable scroll pt.2
    useEffect(() => {
        const rocketVideo = document.querySelector('.rocket-video');

        rocketVideo.addEventListener('touchstart', handleClick, { passive: false });

        return () => {
            rocketVideo.removeEventListener('touchstart', handleClick);
        };
    }, [energyNow, expNow]);

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

    return (
        <div className="rocket-status">
            <ProfileCard
                avatar={avatarUrl}
                name={user?.first_name}
                //name="chief baccaraaa"
                level={1}
                balance={expNow}
            />

            <h2>Путешествие</h2>
            <p>Нажимайте на ракету, чтобы отправить ее дальше от земли для исследования космоса</p>

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
                    <span id="exp" className="status-item-text-label">{expNow} из {levelProgressMax} STAR</span>
                </div>

                <ProgressBar id="exp-bar" value={expNow} max={levelProgressMax} color="#2F80ED" />
            </div>

            <div className="rocket-video-container">
                <video className="rocket-video" ref={rocketVideoRef} src={rocketVideo} autoPlay loop muted />
            </div>

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
