'use client';
import React from 'react';
// Make sure the path matches where you saved the CSS file
import '@/styles/AnimatedButton.css';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    icon?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'development' | 'hub';
    className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps & { hubColor?: string }> = ({
    onClick,
    text,
    icon,
    className = '',
    variant = 'primary',
    
    disabled = false,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`animated-btn btn-${variant} ${className}`}
           
            onClick={onClick}
        >
            <span className="btn-content">
                {icon && <span className="btn-icon">{icon}</span>}
                <span className="btn-text">{text}</span>
            </span>
        </button>
    );
};

export default AnimatedButton;