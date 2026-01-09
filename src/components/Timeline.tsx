// components/Timeline.tsx
import React from 'react';
import '../styles/Timeline.css';

import { useIsMobile } from '@/hooks/useIsMobile';
import { motion } from 'framer-motion';
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
import '@/styles/Experience.css';
export interface ExperienceDetails {
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
interface ProjectLink {
	url: string;
	type: 'website' | 'app-store' | 'google-play' | 'github' | 'demo';
	label?: string; // Optional custom label
}
interface TimelineItem {
	icon: React.ReactNode;
	date?: string;
	title: string;
	description?: string;
	link?: { url: string; text: string };
	experienceDetails?: ExperienceDetails;
	clickMe?: boolean; // Change this - single experience details
}

interface TimelineProps {
	heading: string;
	items: TimelineItem[];
}
const getLinkInfo = (link: ProjectLink) => {
	switch (link.type) {
		case 'app-store':
			return {
				icon: <FaApple className='link-icon' />,
				label: link.label || 'App Store',
				className: 'app-store-link',
			};
		case 'google-play':
			return {
				icon: <FaGooglePlay className='link-icon' />,
				label: link.label || 'Google Play',
				className: 'google-play-link',
			};
		case 'github':
			return {
				icon: <FaGithub className='link-icon' />,
				label: link.label || 'GitHub',
				className: 'github-link',
			};
		case 'demo':
			return {
				icon: <FaPlay className='link-icon' />,
				label: link.label || 'Live Demo',
				className: 'demo-link',
			};
		case 'website':
			return {
				icon: <FaGlobe className='link-icon' />,
				label: link.label || 'Website',
				className: 'website-link',
			};
		default:
			return {
				icon: <FaExternalLinkAlt className='link-icon' />,
				label: link.label || 'View Project',
				className: 'project-link',
			};
	}
};

const Timeline: React.FC<TimelineProps> = ({ heading, items }) => {
	const mobile = useIsMobile();
	return (
		<div className='timeline'>
			{items.map((item, index) => {
				// If item has experience details, wrap it with ExperienceDropdown
				if (item.experienceDetails) {
					return (
						<div key={index} className='experience-dropdown-container'>
							<motion.div
								className='experience-dropdown'
								initial='hidden'
								animate='visible'
								exit='hidden'>
								<div className='dropdown-header'>
									<div className='dropdown-title-section'>
										<h3 className='dropdown-title'>
											{item.experienceDetails.title}
										</h3>
										<p className='dropdown-company'>
											{item.experienceDetails.company}
										</p>
									</div>
									{item.experienceDetails.image && (
										<div className='dropdown-image'>
											<img
												src={item.experienceDetails.image}
												alt={item.experienceDetails.company}
											/>
										</div>
									)}
								</div>

								{/* Info base - Layout orizzontale */}
								<div className='dropdown-info'>
									<div className='info-item'>
										<FaCalendarAlt className='info-icon' />
										<span>{item.experienceDetails.period}</span>
									</div>
									<div className='info-item'>
										<FaMapMarkerAlt className='info-icon' />
										<span>{item.experienceDetails.location}</span>
									</div>
								</div>

								{/* Descrizione */}
								<div className='dropdown-description'>
									<p>{item.experienceDetails.description}</p>
								</div>

								{/* Sezioni a due colonne */}
								<div className='dropdown-sections'>
									{/* Tecnologie */}
									{item.experienceDetails.technologies.length > 0 && (
										<div className='dropdown-section'>
											<div className='section-header'>
												<FaCode className='section-icon' />
												<span className='section-title'>Technologies</span>
											</div>
											<div className='tech-tags'>
												{item.experienceDetails.technologies.map(
													(
														tech:
															| string
															| number
															| bigint
															| boolean
															| React.ReactElement<
																	any,
																	string | React.JSXElementConstructor<any>
															  >
															| Iterable<React.ReactNode>
															| React.ReactPortal
															| Promise<React.AwaitedReactNode>
															| null
															| undefined,
														index: React.Key | null | undefined,
													) => (
														<span key={index} className='tech-tag'>
															{tech}
														</span>
													),
												)}
											</div>
										</div>
									)}

									{/* Achievements */}
									{item.experienceDetails.achievements.length > 0 && (
										<div className='dropdown-section'>
											<div className='section-header'>
												<FaTrophy className='section-icon' />
												<span className='section-title'>Key Achievements</span>
											</div>
											<ul className='achievements-list'>
												{item.experienceDetails.achievements.map(
													(
														achievement:
															| string
															| number
															| bigint
															| boolean
															| React.ReactElement<
																	any,
																	string | React.JSXElementConstructor<any>
															  >
															| Iterable<React.ReactNode>
															| React.ReactPortal
															| Promise<React.AwaitedReactNode>
															| null
															| undefined,
														index: React.Key | null | undefined,
													) => (
														<li key={index} className='achievement-item'>
															{achievement}
														</li>
													),
												)}
											</ul>
										</div>
									)}
								</div>

								{/* Links progetti */}
								{item.experienceDetails.projectLinks &&
									item.experienceDetails.projectLinks.length > 0 && (
										<div className='dropdown-footer'>
											<div className='project-links'>
												{item.experienceDetails.projectLinks.map(
													(
														link: ProjectLink,
														index: React.Key | null | undefined,
													) => {
														const linkInfo = getLinkInfo(link);
														return (
															<a
																key={index}
																href={link.url}
																target='_blank'
																rel='noopener noreferrer'
																className={`project-link ${linkInfo.className}`}>
																{linkInfo.icon}
																{linkInfo.label}
															</a>
														);
													},
												)}
											</div>
										</div>
									)}
							</motion.div>
						</div>
					);
				}

				// Regular timeline item without dropdown

				{
					// 1. Definisci il tag e le props PRIMA del return
					const CustomTag = item.link ? 'a' : 'div';

					// Definisci le props condizionali
					const itemProps = item.link
						? {
								href: item.link.url,
								target: '_blank',
								rel: 'noopener noreferrer',
								className: 'timeline-item is-clickable',
						  }
						: { className: 'timeline-item' };

					// 2. Ritorna il componente pulito.
					// La KEY deve stare sull'elemento più esterno ritornato dalla map.
					return (
						<CustomTag key={index} {...itemProps}>
							<div className='timeline-icon'>{item.icon}</div>
							<div className='timeline-content'>
								<h3 className='timeline-title'>
									{item.link ? item.link.text : item.title}
								</h3>

								{item.description && (
									<>
										<p className='timeline-description'>{item.date}</p>
										<p className='timeline-description'>{item.description}</p>
									</>
								)}
							</div>
						</CustomTag>
					);
				}
			})}
		</div>
	);
};

export default Timeline;
