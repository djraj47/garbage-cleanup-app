import React from 'react';
import './Preloader.css';

export default function Preloader() {
    return (
        <div className="preloader-wrapper">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
}
