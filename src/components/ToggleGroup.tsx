// components/ToggleGroup.tsx
import React from "react";
import "../styles/ToggleGroup.css";

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
		<div className="timeline-toggle-group">
			{options.map((option) => (
				<button
					key={option.value}
					className={`timeline-toggle ${
						selected === option.value ? "active" : ""
					}`}
					onClick={() => onChange(option.value)}>
					{option.label}
				</button>
			))}
		</div>
	);
};

export default ToggleGroup;
