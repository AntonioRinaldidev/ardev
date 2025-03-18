"use client";
import React, { useState, useEffect } from "react";
import "@/styles/TechStackCard.css";

interface TechStackCardProps {
	name: string;
	icon: React.ReactNode;
	tooltip: string;
}

const TechStackCard: React.FC<TechStackCardProps> = ({
	name,
	icon,
	tooltip,
}) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setIsMobile(window.innerWidth < 768);
	}, []);

	const handleFlip = () => {
		if (isMobile) {
			setIsFlipped(true);
			setTimeout(() => setIsFlipped(false), 2000);
		}
	};

	return (
		<div
			className={`flip-card ${isFlipped ? "flipped" : ""}`}
			onClick={handleFlip}
			onMouseEnter={() => !isMobile && setIsFlipped(true)}
			onMouseLeave={() => !isMobile && setIsFlipped(false)}>
			<div className="flip-card-inner">
				<div className="flip-card-front">
					<div className="tech-badge">
						{icon} {name}
					</div>
				</div>
				<div className="flip-card-back">
					<div className="tooltip-text">{tooltip}</div>
				</div>
			</div>
		</div>
	);
};

export default TechStackCard;
