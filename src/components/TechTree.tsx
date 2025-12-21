'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaJava, FaMobileAlt, FaRobot } from 'react-icons/fa';

import '@/styles/TechTree.css';
import {
	SiGit,
	SiGithub,
	SiMysql,
	SiJavascript,
	SiTypescript,
	SiReact,
	SiNextdotjs,
	SiReactrouter,
	SiNodedotjs,
	SiMongodb,
	SiPython,
	SiCplusplus,
	SiRos,
	SiOpencv,
} from 'react-icons/si';
const techs = [
	// --- FOUNDATIONS (Skill Comuni) ---
	{
		name: 'Git',
		tree: 'general',
		icon: <SiGit />,
		category: 'Version Control',
	},
	{
		name: 'GitHub',
		tree: 'general',
		icon: <SiGithub />,
		category: 'Collaboration',
	},
	{ name: 'SQL', tree: 'general', icon: <SiMysql />, category: 'Database' },

	// --- ALBERO 1: Web & Mobile Development ---
	{
		name: 'JavaScript',
		tree: 'software-dev',
		icon: <SiJavascript />,
		category: 'Language',
	},
	{
		name: 'TypeScript',
		tree: 'software-dev',
		icon: <SiTypescript />,
		category: 'Language',
	},
	{
		name: 'React',
		tree: 'software-dev',
		icon: <SiReact />,
		category: 'Frontend',
	},
	{
		name: 'Next.js',
		tree: 'software-dev',
		icon: <SiNextdotjs />,
		category: 'Framework',
	},
	{
		name: 'React Native',
		tree: 'software-dev',
		icon: <SiReactrouter />,
		category: 'Mobile',
	},
	{
		name: 'Node.js',
		tree: 'software-dev',
		icon: <SiNodedotjs />,
		category: 'Backend',
	},
	{
		name: 'MongoDB',
		tree: 'software-dev',
		icon: <SiMongodb />,
		category: 'NoSQL',
	},

	// --- ALBERO 2: AI & Robotics ---
	{
		name: 'Python',
		tree: 'ai-robotics',
		icon: <SiPython />,
		category: 'AI & Data',
	},
	{
		name: 'C++',
		tree: 'ai-robotics',
		icon: <SiCplusplus />,
		category: 'System Programming',
	},
	{
		name: 'Java',
		tree: 'ai-robotics',
		icon: <FaJava />,
		category: 'Software Architecture',
	},
	{
		name: 'ROS2',
		tree: 'ai-robotics',
		icon: <SiRos />,
		category: 'Robotics OS',
	},
	{
		name: 'OpenCV',
		tree: 'ai-robotics',
		icon: <SiOpencv />,
		category: 'Computer Vision',
	},
];

export default function TechTree() {
	const general = techs.filter((t) => t.tree === 'general');
	const webMobile = techs.filter((t) => t.tree === 'software-dev');
	const aiRobotics = techs.filter((t) => t.tree === 'ai-robotics');

	return (
		<div className='techtree-container'>
			{/* 1. FOUNDATIONS */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='techtree-foundations'>
				<h3 className='techtree-label'>Foundations</h3>
				<div className='foundations-grid'>
					{general.map((tech, i) => (
						<div key={i} className='foundation-pill'>
							<span className='foundation-icon'>{tech.icon}</span>
							<span className='foundation-name'>{tech.name}</span>
						</div>
					))}
				</div>

				<motion.div
					initial={{ height: 0 }}
					whileInView={{ height: 60 }}
					className='techtree-stem'
				/>
			</motion.div>

			{/* 2. THE BIFURCATION  */}
			<div className='techtree-branches'>
				{/* RAMO WEB & MOBILE */}
				<div className='branch-column web'>
					<div className='branch-header'>
						<h2 className='branch-title'>Web & Mobile Dev</h2>
						<FaMobileAlt className='branch-main-icon' />
					</div>
					<div className='branch-grid'>
						{webMobile.map((tech, i) => (
							<TechCard key={i} tech={tech} />
						))}
					</div>
				</div>

				{/* RAMO AI & ROBOTICS */}
				<div className='branch-column ai'>
					<div className='branch-header'>
						<FaRobot className='branch-main-icon' />
						<h2 className='branch-title'>AI & Robotics</h2>
					</div>
					<div className='branch-grid'>
						{aiRobotics.map((tech, i) => (
							<TechCard key={i} tech={tech} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function TechCard({ tech }: { tech: any }) {
	return (
		<motion.div whileHover={{ scale: 1.05, x: 5 }} className='tech-card'>
			<div className='tech-card-icon'>{tech.icon}</div>
			<div className='tech-card-info'>
				<span className='tech-card-name'>{tech.name}</span>
				<span className='tech-card-category'>{tech.category}</span>
			</div>
		</motion.div>
	);
}
