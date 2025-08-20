// components/Timeline.tsx
import React from 'react';
import '../styles/Timeline.css';
import ExperienceDropdown, { ExperienceDetails } from './ExperienceDropdown';
import { useIsMobile } from '@/hooks/useIsMobile';

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

const Timeline: React.FC<TimelineProps> = ({ heading, items }) => {
	const mobile = useIsMobile();
	return (
		<div className="timeline">
			<h2 className="sub-heading">
				{heading}
				<hr className="hr-heading" />
			</h2>
			{items.map((item, index) => {
				// If item has experience details, wrap it with ExperienceDropdown
				if (item.experienceDetails) {
					return (
						<ExperienceDropdown
							key={index}
							details={item.experienceDetails}>
							<div className="timeline-item">
								<div className="timeline-icon">{item.icon}</div>
								<div className="timeline-content">
									{item.link ? (
										<h3 className="timeline-title">
											<a
												href={item.link.url}
												target="_blank"
												rel="noopener noreferrer">
												{item.link.text}
											</a>
										</h3>
									) : (
										<h3 className="timeline-title">{item.title}</h3>
									)}
									{item.description && (
										<>
											<p className="timeline-description">{item.date}</p>
											<p className="timeline-description">{item.description}</p>
											{mobile && (
												<p className="timeline-description-click">Click Me</p>
											)}
										</>
									)}
								</div>
							</div>
						</ExperienceDropdown>
					);
				}

				// Regular timeline item without dropdown
				return (
					<div
						className="timeline-item"
						key={index}>
						<div className="timeline-icon">{item.icon}</div>
						<div className="timeline-content">
							{item.link ? (
								<h3 className="timeline-title">
									<a
										href={item.link.url}
										target="_blank"
										rel="noopener noreferrer">
										{item.link.text}
									</a>
								</h3>
							) : (
								<h3 className="timeline-title">{item.title}</h3>
							)}
							{item.description && (
								<>
									<p className="timeline-description">{item.date}</p>
									<p className="timeline-description">{item.description}</p>
								</>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Timeline;
