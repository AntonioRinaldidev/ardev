import { motion } from 'framer-motion';
import React from 'react';
import { useRouter } from 'next/navigation';
import AnimatedButton from './AnimatedButton';

interface Tool {
	title: string;
	description: string;
	status: string;
	path: string;
	icon: React.ReactNode;
}

interface ToolCardProps {
	tool: Tool;
	isDisabled: boolean;
}

function ToolCard({ tool, isDisabled }: ToolCardProps) {
	const router = useRouter();

	return (
		<motion.div
			key={tool.title}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className={`tool-card ${isDisabled ? 'tool-disabled' : ''}`}>
			<div className="tool-icon-container">
				<div className="tool-icon">{tool.icon}</div>
			</div>

			<div className="tool-header">
				<h2 className="tool-title">{tool.title}</h2>
			</div>

			<p className="tool-description">{tool.description}</p>
			<span
				className={`tool-status-badge ${
					tool.status === 'Online'
						? 'badge-online'
						: tool.status === 'In Development'
						? 'badge-development'
						: 'badge-construction'
				}`}>
				{tool.status}
			</span>
			{!isDisabled && (
				<AnimatedButton
					onClick={() => {
						if (!isDisabled) router.push(tool.path);
					}}
					text={`${
						tool.status === 'Under Construction'
							? 'Coming Soon'
							: tool.status === 'In Development'
							? 'Test it!'
							: 'Try it Now!'
					}`}
					variant={ 
						tool.status === 'Online'
							? 'secondary'
							: tool.status === 'In Development'
							? 'development'
							: 'construction'
					}
				/>
			)}
			{isDisabled && (
				<p className="tool-disabled-text">
					This tool is currently under construction.
				</p>
			)}
		</motion.div>
	);
}

export default ToolCard;
