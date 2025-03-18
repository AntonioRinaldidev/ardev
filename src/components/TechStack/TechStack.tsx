"use client";
import React from "react";
import {
	SiJavascript,
	SiTypescript,
	SiHtml5,
	SiReact,
	SiReactrouter,
	SiPython,
	SiMysql,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import TechStackCard from "./TechStackCard";
import "./TechStack.css";

const techs = [
	{ name: "JavaScript", icon: <SiJavascript />, tooltip: "JavaScript ES6+" },
	{
		name: "TypeScript ",
		icon: <SiTypescript />,
		tooltip: "Type-safe JavaScript",
	},
	{ name: "HTML", icon: <SiHtml5 />, tooltip: "Semantic HTML5" },
	{ name: "React", icon: <SiReact />, tooltip: "React.js for modern UIs" },
	{
		name: "React Native",
		icon: <SiReactrouter />,
		tooltip: "Cross-platform mobile apps",
	},
	{ name: "Java", icon: <FaJava />, tooltip: "Enterprise-grade backend" },
	{
		name: "Python",
		icon: <SiPython />,
		tooltip: "Data, scripting, AI and more",
	},
	{ name: "SQL", icon: <SiMysql />, tooltip: "Relational databases (MySQL)" },
];

const TechStack: React.FC = () => {
	return (
		<section className="tech-stack-section">
			<h3 className="tech-stack-title">Technologies I Work With</h3>
			<div className="tech-badges">
				{techs.map((tech) => (
					<TechStackCard
						key={tech.name}
						name={tech.name}
						icon={tech.icon}
						tooltip={tech.tooltip}
					/>
				))}
			</div>
		</section>
	);
};

export default TechStack;
