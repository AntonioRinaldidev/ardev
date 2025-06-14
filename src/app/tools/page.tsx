'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

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
import ToolCard from '@/components/ToolCard';

const tools: {
	title: string;
	description: string;
	status: 'Online' | 'In Development' | 'Under Construction';
	path: string;
	icon: JSX.Element;
}[] = [
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
				{[...tools]
					.sort((a, b) => {
						const statusOrder = {
							Online: 0,
							'In Development': 1,
							'Under Construction': 2,
						};
						return (
							statusOrder[a.status as keyof typeof statusOrder] -
							statusOrder[b.status as keyof typeof statusOrder]
						);
					})
					.map((tool) => {
						const isDisabled = tool.status === 'Under Construction';

						return (
							<ToolCard
								tool={tool}
								key={tool.title}
								isDisabled={isDisabled}
							/>
						);
					})}
			</div>
		</div>
	);
}
