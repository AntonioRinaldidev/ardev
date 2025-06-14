// ✅ AnimatedButton.tsx REWORKED
'use client';
import React from 'react';
import '@/styles/AnimatedButton.css';

interface AnimatedButtonProps {
	onClick: () => void;
	text: string;
	icon?: React.ReactNode;
	className?: string;
	variant?: 'primary' | 'secondary' | 'development' | 'construction';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
	onClick,
	text,
	icon,
	className = '',
	variant = 'primary',
}) => {
	return (
		<button
			onClick={onClick}
			className={`animated-btn btn-${variant} ${className}`}>
			<span className="btn-content">
				{icon && <span className="btn-icon">{icon}</span>}
				<span className="btn-text">{text}</span>
			</span>
		</button>
	);
};

export default AnimatedButton;
