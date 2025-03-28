import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type SectionKey =
	| 'personal'
	| 'summary'
	| 'experience'
	| 'education'
	| 'skills'
	| 'languages';

interface SectionHeaderProps {
	label: string;
	sectionKey: SectionKey;
	isActive: boolean;
	onToggle: (key: SectionKey) => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
	label,
	sectionKey,
	isActive,
	onToggle,
}) => {
	return (
		<div className="section-header">
			<h2>{label}</h2>
			<button
				className="section-toggle-btn"
				onClick={() => onToggle(sectionKey)}>
				{isActive ? (
					<>
						<FaEyeSlash className="rotate" /> Nascondi
					</>
				) : (
					<>
						<FaEye /> Mostra
					</>
				)}
			</button>
		</div>
	);
};

export default SectionHeader;
