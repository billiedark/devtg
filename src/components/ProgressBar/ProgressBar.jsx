import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ value, max, color }) => {
    const percentage = (value / max) * 100;
    return (
        <div className="progress-bar">
            <div className="progress" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
        </div>
    );
}

export default ProgressBar;
