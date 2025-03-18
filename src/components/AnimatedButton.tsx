"use client";
import React from "react";
import "@/styles/AnimatedButton.css";

interface AnimatedButtonProps {
	onClick: () => void;
	text: string;
	icon?: React.ReactNode;
	className?: string;
	variant?: "primary" | "secondary";
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
	onClick,
	text,
	icon,
	className = "",
	variant = "primary",
}) => {
	return (
		<button
			onClick={onClick}
			className={`animated-btn ${
				variant === "secondary"
					? "animated-btn-secondary"
					: "animated-btn-primary"
			} ${className}`}>
			<span className="btn-content">
				{icon && <span className="btn-icon">{icon}</span>}
				<p className="text-orange-500">{text}</p>
			</span>
			<svg
				className="btn-border-svg"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 220 80"
				preserveAspectRatio="none">
				<rect
					x="4"
					y="4"
					width="212"
					height="72"
					rx="12"
					ry="12"
				/>
			</svg>
		</button>
	);
};

export default AnimatedButton;
