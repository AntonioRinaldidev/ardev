"use client";
import React, { useState } from "react";
import {
	SiJavascript,
	SiTypescript,
	SiHtml5,
	SiReact,
	SiReactrouter,
	SiPython,
	SiMysql,
	SiGithub,
} from "react-icons/si";
import { FaJava, FaGitAlt } from "react-icons/fa";
import { FiCode } from "react-icons/fi";
import TechStackCard from "./TechStackCard";
import "./TechStack.css";
import { motion, AnimatePresence } from "framer-motion";

const techs = [
	{ name: "JavaScript", icon: <SiJavascript />, tooltip: "JavaScript ES6+" },
	{ name: "TypeScript", icon: <SiTypescript />, tooltip: "Typed JavaScript" },
	{ name: "HTML", icon: <SiHtml5 />, tooltip: "HTML5 Semantics" },
	{ name: "React", icon: <SiReact />, tooltip: "React UI Library" },
	{
		name: "React Native",
		icon: <SiReactrouter />,
		tooltip: "Mobile Framework",
	},
	{ name: "Java", icon: <FaJava />, tooltip: "Java Backend" },
	{ name: "Python", icon: <SiPython />, tooltip: "Scripting & Data" },
	{ name: "SQL", icon: <SiMysql />, tooltip: "MySQL Database" },
	{ name: "Git", icon: <FaGitAlt />, tooltip: "Version Control" },
];

const TechStack: React.FC = () => {
	const [showAll, setShowAll] = useState(false);
	const maxItems = 6;
	const visibleTechs = showAll ? techs : techs.slice(0, maxItems);

	return (
		<section className="tech-stack-section">
			<h2 className="tech-stack-title">
				<FiCode className="tech-title-icon" />
				Technologies I Work With
			</h2>

			<div className="tech-badges">
				<AnimatePresence>
					{visibleTechs.map((tech) => (
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

			{techs.length > maxItems && (
				<button
					className="tech-toggle-button"
					onClick={() => setShowAll((prev) => !prev)}>
					{showAll ? "Show Less ▲" : "Show More ▼"}
				</button>
			)}
		</section>
	);
};

export default TechStack;
