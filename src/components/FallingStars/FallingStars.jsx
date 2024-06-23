import React, { useEffect, useRef, useState } from 'react';
import './FallingStars.css';
import star1 from '../../img/star1.svg';
import star2 from '../../img/star2.svg';
import star3 from '../../img/star3.svg';
import star4 from '../../img/star4.svg';
import star5 from '../../img/star5.svg';
import rocket from '../../img/rocket.svg';

const starImages = [star1, star2, star3, star4, star5];

const FallingStars = ({ onTap }) => {
    const [stars, setStars] = useState([]);
    const [speed, setSpeed] = useState(1);
    const canvasRef = useRef(null);
    const speedTimeoutRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const canvasWidth = 390;
            const star = {
                id: Date.now(),
                src: starImages[Math.floor(Math.random() * starImages.length)],
                x: Math.random() * canvasWidth,
                y: -50,
                angle: Math.random() * 90 - 45,
                speed: Math.random() * 2 + 1,
            };
            setStars(prevStars => [...prevStars, star]);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClick = (event) => {
            setSpeed(3);

            if (speedTimeoutRef.current) {
                clearTimeout(speedTimeoutRef.current);
            }

            speedTimeoutRef.current = setTimeout(() => {
                setSpeed(1);
            }, 2000);

            if (onTap) {
                onTap(event);
            }
        };

        const canvas = canvasRef.current;
        canvas.addEventListener('click', handleClick);

        return () => {
            canvas.removeEventListener('click', handleClick);
        };
    }, [onTap]);

    useEffect(() => {
        const interval = setInterval(() => {
            setStars(prevStars => prevStars.map(star => ({
                ...star,
                y: star.y + star.speed * speed,
            })).filter(star => star.y < 320));
        }, 30);

        return () => clearInterval(interval);
    }, [speed]);

    return (
        <div className="falling-stars-canvas" ref={canvasRef}>
            <img src={rocket} className="rocket" alt="rocket" />
            {stars.map(star => (
                <img
                    key={star.id}
                    src={star.src}
                    className="falling-star"
                    style={{
                        left: `${star.x}px`,
                        top: `${star.y}px`,
                        transform: `rotate(${star.angle}deg)`,
                    }}
                    alt="star"
                />
            ))}
        </div>
    );
};

export default FallingStars;
