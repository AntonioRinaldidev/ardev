import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	FaExternalLinkAlt,
	FaCalendarAlt,
	FaMapMarkerAlt,
	FaCode,
	FaTrophy,
	FaApple,
	FaGooglePlay,
	FaGithub,
	FaGlobe,
	FaPlay,
} from 'react-icons/fa';
import '@/styles/ExperienceDropdown.css';

interface ProjectLink {
	url: string;
	type: 'website' | 'app-store' | 'google-play' | 'github' | 'demo';
	label?: string; // Optional custom label
}

interface ExperienceDetails {
	title: string;
	company: string;
	location: string;
	period: string;
	description: string;
	technologies: string[];
	achievements: string[];
	projectLinks?: ProjectLink[]; // Array of links instead of single link
	image?: string;
}

interface ExperienceDropdownProps {
	details: ExperienceDetails;
	children: React.ReactNode;
}

const ExperienceDropdown: React.FC<ExperienceDropdownProps> = ({
	details,
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

	// Function to get icon and label based on link type
	const getLinkInfo = (link: ProjectLink) => {
		switch (link.type) {
			case 'app-store':
				return {
					icon: <FaApple className="link-icon" />,
					label: link.label || 'App Store',
					className: 'app-store-link',
				};
			case 'google-play':
				return {
					icon: <FaGooglePlay className="link-icon" />,
					label: link.label || 'Google Play',
					className: 'google-play-link',
				};
			case 'github':
				return {
					icon: <FaGithub className="link-icon" />,
					label: link.label || 'GitHub',
					className: 'github-link',
				};
			case 'demo':
				return {
					icon: <FaPlay className="link-icon" />,
					label: link.label || 'Live Demo',
					className: 'demo-link',
				};
			case 'website':
				return {
					icon: <FaGlobe className="link-icon" />,
					label: link.label || 'Website',
					className: 'website-link',
				};
			default:
				return {
					icon: <FaExternalLinkAlt className="link-icon" />,
					label: link.label || 'View Project',
					className: 'project-link',
				};
		}
	};

	const handleMouseEnter = () => {
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
		}
		setIsOpen(true);
	};

	const handleMouseLeave = () => {
		const timeout = setTimeout(() => {
			setIsOpen(false);
		}, 300);
		setHoverTimeout(timeout);
	};

	const dropdownVariants = {
		hidden: {
			opacity: 0,
			y: -10,
			scale: 0.95,
			transition: {
				duration: 0.2,
				ease: 'easeInOut',
			},
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.3,
				ease: 'easeOut',
			},
		},
	};

	return (
		<div
			className="experience-dropdown-container"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			{children}

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="experience-dropdown"
						variants={dropdownVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						onMouseEnter={() => {
							if (hoverTimeout) {
								clearTimeout(hoverTimeout);
							}
						}}
						onMouseLeave={() => {
							const timeout = setTimeout(() => {
								setIsOpen(false);
							}, 100);
							setHoverTimeout(timeout);
						}}>
						{/* Header del dropdown */}
						<div className="dropdown-header">
							<div className="dropdown-title-section">
								<h3 className="dropdown-title">{details.title}</h3>
								<p className="dropdown-company">{details.company}</p>
							</div>
							{details.image && (
								<div className="dropdown-image">
									<img
										src={details.image}
										alt={details.company}
									/>
								</div>
							)}
						</div>

						{/* Info base - Layout orizzontale */}
						<div className="dropdown-info">
							<div className="info-item">
								<FaCalendarAlt className="info-icon" />
								<span>{details.period}</span>
							</div>
							<div className="info-item">
								<FaMapMarkerAlt className="info-icon" />
								<span>{details.location}</span>
							</div>
						</div>

						{/* Descrizione */}
						<div className="dropdown-description">
							<p>{details.description}</p>
						</div>

						{/* Sezioni a due colonne */}
						<div className="dropdown-sections">
							{/* Tecnologie */}
							{details.technologies.length > 0 && (
								<div className="dropdown-section">
									<div className="section-header">
										<FaCode className="section-icon" />
										<span className="section-title">Technologies</span>
									</div>
									<div className="tech-tags">
										{details.technologies.map((tech, index) => (
											<span
												key={index}
												className="tech-tag">
												{tech}
											</span>
										))}
									</div>
								</div>
							)}

							{/* Achievements */}
							{details.achievements.length > 0 && (
								<div className="dropdown-section">
									<div className="section-header">
										<FaTrophy className="section-icon" />
										<span className="section-title">Key Achievements</span>
									</div>
									<ul className="achievements-list">
										{details.achievements.map((achievement, index) => (
											<li
												key={index}
												className="achievement-item">
												{achievement}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>

						{/* Links progetti */}
						{details.projectLinks && details.projectLinks.length > 0 && (
							<div className="dropdown-footer">
								<div className="project-links">
									{details.projectLinks.map((link, index) => {
										const linkInfo = getLinkInfo(link);
										return (
											<a
												key={index}
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
												className={`project-link ${linkInfo.className}`}>
												{linkInfo.icon}
												{linkInfo.label}
											</a>
										);
									})}
								</div>
							</div>
						)}

						{/* Freccia indicatore */}
						<div className="dropdown-arrow"></div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ExperienceDropdown;
