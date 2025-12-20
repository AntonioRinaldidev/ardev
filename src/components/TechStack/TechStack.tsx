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
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './TechStack.css';

const techs = [
	{ name: 'JavaScript', icon: <SiJavascript />, category: 'Language' },
	{ name: 'TypeScript', icon: <SiTypescript />, category: 'Language' },
	{ name: 'Python', icon: <SiPython />, category: 'AI & Data' },
	{ name: 'Java', icon: <FaJava />, category: 'Backend' },
	{ name: 'React', icon: <SiReact />, category: 'Frontend' },
	{ name: 'Next.js', icon: <SiNextdotjs />, category: 'Framework' },
	{ name: 'React Native', icon: <SiReactrouter />, category: 'Mobile' },
	{ name: 'Node.js', icon: <SiNodedotjs />, category: 'Backend' },
	{ name: 'SQL', icon: <SiMysql />, category: 'Database' },
	{ name: 'MongoDB', icon: <SiMongodb />, category: 'NoSQL' },
	{ name: 'Git', icon: <SiGit />, category: 'DevOps' },
	{ name: 'GitHub', icon: <SiGithub />, category: 'Collaboration' },
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
