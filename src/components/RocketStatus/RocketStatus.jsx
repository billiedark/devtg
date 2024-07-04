import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';

import ProgressBar from '../ProgressBar/ProgressBar';
import ProfileCard from "../ProfileCard/ProfileCard";
import Button from "../Button/Button";
import './RocketStatus.css';
import FallingStars from '../FallingStars/FallingStars';

import { useTelegram } from "../../hooks/useTelegram";
import { AppContext } from '../../AppContext';

const RocketStatus = ({ workerEnergy, workerEnergyMax, workerEnergyPerTap, workerEnergyPerSecond, balance, levelProgressNext, isDev, dispatch, state }) => {
    const { energy } = state;

    const lastTapRef = useRef(0);
    const [floatingText, setFloatingText] = useState([]);

    const [clicks, setClicks] = useState(0);
    const clickTimeoutRef = useRef(null);

    // Header
    const { user } = useTelegram();
    const user_id = isDev ? '209811551' : user?.id;


    // Function to handle energy increase
    const increaseEnergy = () => {
        dispatch({ type: 'UPDATE_ENERGY', payload: Math.min(energy + workerEnergyPerSecond, workerEnergyMax) });
    };

    useEffect(() => {
        const energyInterval = setInterval(() => {
            increaseEnergy();
        }, 1000);

        return () => clearInterval(energyInterval);
    }, [workerEnergyPerSecond, workerEnergyMax, energy, dispatch]);


    // Function to add floating text
    const addFloatingText = (x, y) => {
        const id = Date.now();
        setFloatingText(prev => [...prev, { id, x, y }]);

        setTimeout(() => {
            setFloatingText(prev => prev.filter(item => item.id !== id));
        }, 1000);
    };


    return (
        <div className="rocket-status">

            <h2>Путешествие</h2>
            <p>Нажимайте на полотно, чтобы ускорить звезды</p>

            <div className="status-item-block">
                <div className="status-item-text-block">
                    <span className="status-item-text-label status-item-label">Энергия рабочих</span>
                    <span id="energy" className="status-item-text-label">{workerEnergy} из {workerEnergyMax} ⚡</span>
                </div>

                <ProgressBar id="energy-bar" value={workerEnergy} max={workerEnergyMax} color="#27AE60" />
            </div>

            <div className="status-item-block">
                <div className="status-item-text-block">
                    <span className="status-item-text-label status-item-label">Прогресс уровня</span>
                    <span id="exp" className="status-item-text-label">{balance} из {levelProgressNext} STAR</span>
                </div>

                <ProgressBar id="exp-bar" value={balance} max={levelProgressNext} color="#2F80ED" />
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

                    if (workerEnergy > 10) {
                        // Finger math pt.2
                        const touchCount = event.touches ? event.touches.length : 1;

                        // Resources math
                        // setEnergyNow(energyNow - (workerEnergyPerTap * touchCount));
                        dispatch({ type: 'UPDATE_ENERGY', payload: workerEnergy - (workerEnergyPerTap * touchCount) });

                        // setExpNow(expNow + (workerEnergyPerTap * touchCount));
                        dispatch({ type: 'UPDATE_BALANCE', payload: Number(balance) + (workerEnergyPerTap * touchCount) });

                        // Haptic effect
                        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
                            window.Telegram.WebApp.HapticFeedback.impactOccurred('soft');
                        }

                        // Add floating text
                        const x = event.touches ? event.touches[0].clientX - 25 : event.clientX;
                        const y = event.touches ? event.touches[0].clientY - 150 : event.clientY;
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
