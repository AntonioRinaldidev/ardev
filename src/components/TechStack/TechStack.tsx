'use client';

import React from 'react';
import {
	SiJavascript,
	SiTypescript,
	SiHtml5,
	SiReact,
	SiReactrouter,
	SiPython,
	SiMysql,
	SiMongodb,
	SiNodedotjs,
	SiGithub,
	SiGit,
	SiNextdotjs,
	SiCplusplus,
	SiOpencv,
	SiRos,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './TechStack.css';

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

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: 'easeOut' },
	},
};

const TechStack: React.FC = () => {
	return (
		<section className='tech-stack-container'>
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='tech-header'>
				<h2 className='tech-title'>
					<FiCpu className='tech-icon-title' />
					Tech Stack
				</h2>
				<div className='hr-heading' />
			</motion.div>

			<motion.div
				className='tech-grid'
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-50px' }}>
				{techs.map((tech) => (
					<motion.div
						key={tech.name}
						variants={itemVariants}
						className='tech-card'
						whileHover={{
							y: -5,
							transition: { duration: 0.2 },
						}}>
						<div className='tech-card-glow' />
						<div className='tech-icon-wrapper'>{tech.icon}</div>
						<div className='tech-info'>
							<span className='tech-name'>{tech.name}</span>
							<span className='tech-category'>{tech.category}</span>
						</div>
					</motion.div>
				))}
			</motion.div>
		</section>
	);
};

export default TechStack;
