// components/Timeline.tsx
import React from 'react';
import '../styles/Timeline.css';

interface TimelineItem {
	icon: React.ReactNode;
	date?: string;
	title: string;
	description?: string;
	link?: { url: string; text: string };
}

interface TimelineProps {
	heading: string;
	items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ heading, items }) => {
	return (
		<div className="timeline">
			<h2 className="sub-heading">
				{heading}
				<hr className="hr-heading" />
			</h2>
			{items.map((item, index) => (
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
			))}
		</div>
	);
};

export default Timeline;
