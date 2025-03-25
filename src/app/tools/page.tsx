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
		status: 'Under Construction',
		path: '/tools/cv-generator',
		icon: <FaProjectDiagram />,
	},
];

export default function ToolHub() {
	const router = useRouter();

	return (
		<div className="toolhub-container p-8 min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
			<div style={{ marginBottom: '1.5rem' }}>
				<AnimatedButton
					text="← Back to Home"
					variant="primary"
					onClick={() => router.push('/')}
				/>
			</div>
			<h1 className="text-4xl font-bold mb-8 text-center text-[var(--color-heading)]">
				Mini Tool Hub
			</h1>
			<p className="toolhub-intro">
				Explore practical developer tools to boost your productivity.
			</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
				{tools.map((tool) => {
					const isDisabled = tool.status === 'Under Construction';
					return (
						<motion.div
							key={tool.title}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.2 }}
							whileTap={{ scale: 0.98 }}
							whileHover={{
								y: isDisabled ? 0 : -5,
								scale: isDisabled ? 1 : 1.02,
								boxShadow: isDisabled
									? 'none'
									: '0px 0px 2px var(--color-link)',
								transition: { duration: 0.2, ease: 'easeOut' },
							}}
							className={`tool bg-[var(--color-bg-secondary)] p-6 rounded-2xl shadow-lg transition ${
								isDisabled
									? 'tool-disabled'
									: 'cursor-pointer hover:scale-[1.02]'
							}`}
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
									{tool.status === 'Online' ? (
										<>
											<FaCheckCircle style={{ marginRight: '4px' }} />
											Online
										</>
									) : tool.status === 'In Development' ? (
										<>
											<FaCode style={{ marginRight: '4px' }} />
											In Development
										</>
									) : (
										<>
											<FaTools style={{ marginRight: '4px' }} />
											Under Construction
										</>
									)}
								</span>
							</div>

							<p className="text-sm text-[var(--color-text-secondary)]">
								{tool.description}
							</p>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
