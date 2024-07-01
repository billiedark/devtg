import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import ProgressBar from '../ProgressBar/ProgressBar';
import ProfileCard from "../ProfileCard/ProfileCard";
import Button from "../Button/Button";
import './RocketStatus.css';
import FallingStars from '../FallingStars/FallingStars';

import avatarImg from "../../img/avatar.png";
import { useTelegram } from "../../hooks/useTelegram";

const RocketStatus = ({ workerEnergy, workerEnergyMax, workerEnergyPerTap, workerEnergyPerSecond, balance, level, levelProgressNext, isDev }) => {
    const [energyNow, setEnergyNow] = useState(null);
    const [expNow, setExpNow] = useState(1);
    const lastTapRef = useRef(0);
    const [floatingText, setFloatingText] = useState([]);

    const [clicks, setClicks] = useState(0);
    const clickTimeoutRef = useRef(null);

    // Header
    const { tg, user } = useTelegram();
    const [avatarUrl, setAvatarUrl] = useState(`https://dbd20rank.net/static/img/stars_avatars/${user?.id}.jpg`);
    const user_id = isDev ? '209811551' : user?.id;

    // Name generation
    const username = isDev ? 'chief bacccaraaa' : user?.first_name;

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


    // Update DB data
    useEffect(() => {
        if (balance !== undefined && !isNaN(balance)) {
            setExpNow(Number(balance));
        }
    }, [balance]);

    useEffect(() => {
        if (workerEnergy !== undefined && !isNaN(workerEnergy)) {
            setEnergyNow(Number(workerEnergy));
        }
    }, [workerEnergy]);


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

            <FallingStars
                onTap={(event) => {
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
                        const touchCount = event.touches ? event.touches.length : 1;

                        // Resources math
                        setEnergyNow(energyNow - (workerEnergyPerTap * touchCount));
                        setExpNow(expNow + (workerEnergyPerTap * touchCount));

                        // Haptic effect
                        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
                            window.Telegram.WebApp.HapticFeedback.impactOccurred('soft');
                        }

                        // Add floating text
                        const x = event.touches ? event.touches[0].clientX : event.clientX;
                        const y = event.touches ? event.touches[0].clientY : event.clientY;
                        addFloatingText(x, y);

                        setClicks(prevClicks => prevClicks + 1);

                        if (clickTimeoutRef.current) {
                            clearTimeout(clickTimeoutRef.current);
                        }

                        clickTimeoutRef.current = setTimeout(() => {
                            axios.post('https://dbd20rank.net/api/stars/user/update', {
                                user_id: user_id,
                                clicks: clicks + 1,
                            })
                                .then(response => {
                                    console.log(response.data);
                                    setClicks(0);
                                })
                                .catch(error => {
                                    console.error('Error updating user stars', error);
                                });
                        }, 1000);
                    }
                }}
            />

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
