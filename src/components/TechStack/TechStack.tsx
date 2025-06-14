'use client';
import React, { useState } from 'react';
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
} from 'react-icons/si';
import { FaJava, FaGitAlt } from 'react-icons/fa';
import { FiCode } from 'react-icons/fi';
import TechStackCard from './TechStackCard';
import './TechStack.css';
import { motion, AnimatePresence } from 'framer-motion';

const techs = [
	{ name: 'JavaScript', icon: <SiJavascript />, tooltip: 'JavaScript ES6+' },
	{ name: 'TypeScript', icon: <SiTypescript />, tooltip: 'Typed JavaScript' },
	{ name: 'Node.js', icon: <SiNodedotjs />, tooltip: 'JavaScript Runtime' },
	{ name: 'HTML', icon: <SiHtml5 />, tooltip: 'HTML5 Semantics' },
	{ name: 'React', icon: <SiReact />, tooltip: 'React UI Library' },
	{
		name: 'React Native',
		icon: <SiReactrouter />,
		tooltip: 'Mobile Framework',
	},
	{ name: 'Java', icon: <FaJava />, tooltip: 'Java Backend' },
	{ name: 'Python', icon: <SiPython />, tooltip: 'Scripting & Data' },
	{ name: 'SQL', icon: <SiMysql />, tooltip: 'MySQL Database' },
	{ name: 'MongoDB', icon: <SiMongodb />, tooltip: 'NoSQL Document Database' },
	{ name: 'Git', icon: <FaGitAlt />, tooltip: 'Version Control' },
];

const TechStack: React.FC = () => {
	const [showAll, setShowAll] = useState(false);

	return (
		<section className="tech-stack-section">
			<h2 className="tech-stack-title">
				<FiCode className="tech-title-icon" />
				Technologies I Work With
				<hr className="hr-heading" />
			</h2>

			<div className="tech-badges">
				<AnimatePresence>
					{techs.map((tech) => (
						<motion.div
							key={tech.name}
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 15 }}
							transition={{ duration: 0.4 }}>
							<TechStackCard
								name={tech.name}
								icon={tech.icon}
								tooltip={tech.tooltip}
							/>
						</motion.div>
					))}
				</AnimatePresence>
			</div>
		</section>
	);
};

export default TechStack;
