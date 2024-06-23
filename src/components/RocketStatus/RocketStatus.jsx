import React, { useState, useEffect, useRef } from 'react';

import ProgressBar from '../ProgressBar/ProgressBar';
import ProfileCard from "../ProfileCard/ProfileCard";
import Button from "../Button/Button";
import './RocketStatus.css';

import rocketVideoMp4 from '../../img/rocket-gif.mp4';
import rocketVideoWebm from '../../img/rocket-gif.webm';
import avatarImg from "../../img/avatar.png";

import { useTelegram } from "../../hooks/useTelegram";

const RocketStatus = ({ workerEnergy, workerEnergyMax, workerEnergyPerTap, workerEnergyPerSecond, balance, level, levelProgressNext, isDev }) => {
    const [energyNow, setEnergyNow] = useState(workerEnergy);
    const [expNow, setExpNow] = useState(1);
    const lastTapRef = useRef(0);
    const rocketVideoRef = useRef(null);
    const [floatingText, setFloatingText] = useState([]);
    const [videoSpeed, setVideoSpeed] = useState(1);
    const speedTimeoutRef = useRef(null);
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

            // Speed up video
            setVideoSpeed(prevSpeed => Math.min(prevSpeed * 1.3, 6)); // Max speed is 16x

            // Clear the existing timeout if there's one
            if (speedTimeoutRef.current) {
                clearTimeout(speedTimeoutRef.current);
            }

            // Set a new timeout to reset speed after 2 seconds
            speedTimeoutRef.current = setTimeout(() => {
                setVideoSpeed(1);
            }, 1000);
        }
    };

    // Update video speed
    useEffect(() => {
        if (rocketVideoRef.current) {
            rocketVideoRef.current.playbackRate = videoSpeed;
        }
    }, [videoSpeed]);

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
                    <span id="exp" className="status-item-text-label">{expNow} из {levelProgressNext} STAR</span>
                </div>

                <ProgressBar id="exp-bar" value={expNow} max={levelProgressNext} color="#2F80ED" />
            </div>

            <div className="rocket-video-container">
                <video className="rocket-video" ref={rocketVideoRef} autoPlay loop muted playsInline>
                    <source src={rocketVideoMp4} type="video/mp4" />
                    <source src={rocketVideoWebm} type="video/webm" />
                    Your browser does not support the video tag.
                </video>
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
