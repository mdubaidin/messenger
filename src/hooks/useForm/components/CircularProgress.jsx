import React from 'react';
import './style/loader.css';

const CircularProgress = ({ style, size = 25, color = '#1976d2', weight = '3px', ...rest }) => {
    return (
        <div
            className='loader'
            style={{
                width: parseInt(size) + 'px',
                height: parseInt(size) + 'px',
                borderWidth: parseInt(weight) + 'px',
                borderStyle: 'solid',
                borderColor: color,
                ...style,
            }}
            {...rest}></div>
    );
};

export default CircularProgress;
