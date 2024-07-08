import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Файл CSS для стилей кнопки

const Button = ({ isDisabled, label }) => {
    const buttonClass = isDisabled ? 'button disabled' : 'button available';

    return (
        <button className={buttonClass} disabled={isDisabled}>
            {label}
        </button>
    );
};

Button.propTypes = {
    isDisabled: PropTypes.bool,
    label: PropTypes.string.isRequired
};

Button.defaultProps = {
    isDisabled: false
};

export default Button;
