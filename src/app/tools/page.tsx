'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AnimatedButton from '@/components/AnimatedButton';
import '@/styles/tools.css';
import {
	FaCheckCircle,
	FaTools,
	FaCode,
	FaFileAlt,
	FaFileCsv,
	FaProjectDiagram,
} from 'react-icons/fa';

const tools = [
	{
		title: 'JSON Formatter',
		description: 'Easily format and validate your JSON files.',
		status: 'Online',
		path: '/tools/json-formatter',
		icon: <FaFileAlt />,
	},
	{
		title: 'Regex Tester',
		description: 'Test regular expressions with match highlighting.',
		status: 'In Development',
		path: '/tools/regex-tester',
		icon: <FaCode />,
	},
	{
		title: 'JSON to CSV Converter',
		description: 'Convert JSON arrays to CSV format in just a few clicks.',
		status: 'Under Construction',
		path: '/tools/json-to-csv',
		icon: <FaFileCsv />,
	},
	{
		title: 'CV Generator',
		description: 'Create a customized resume in just a few steps.',
		status: 'In Development',
		path: '/tools/cv-generator',
		icon: <FaProjectDiagram />,
	},
];

export default function ToolHub() {
	const router = useRouter();

	return (
		<div className="toolhub-container">
			<AnimatedButton
				text="← Back to Home"
				variant="primary"
				onClick={() => router.push('/')}
			/>

			<h1 className="toolhub-title">Mini Tool Hub</h1>
			<p className="toolhub-intro">
				Explore practical developer tools to boost your productivity.
			</p>

			<div className="toolhub-grid">
				{tools.map((tool) => {
					const isDisabled = tool.status === 'Under Construction';

					return (
						<motion.div
							key={tool.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className={`tool-card ${isDisabled ? 'tool-disabled' : ''}`}
							onClick={() => {
								if (!isDisabled) router.push(tool.path);
							}}>
							<div className="tool-icon">{tool.icon}</div>

							<div className="tool-header">
								<h2 className="tool-title">{tool.title}</h2>
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
							</div>

							<p className="tool-description">{tool.description}</p>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
