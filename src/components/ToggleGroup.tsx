import React from 'react';
import '../styles/ToggleGroup.css';

interface ToggleGroupProps {
	selected: string;
	options: { label: string; value: string }[];
	onChange: (value: string) => void;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({
	selected,
	options,
	onChange,
}) => {
	return (
		<div
			className="timeline-toggle-group"
			role="group">
			{options.map(({ label, value }) => {
				const isActive = selected === value;
				return (
					<button
						key={value}
						className={`timeline-toggle ${isActive ? 'active' : ''}`}
						onClick={() => onChange(value)}
						aria-pressed={isActive}>
						{label}
					</button>
				);
			})}
		</div>
	);
};

export default ToggleGroup;
