"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CustomCard from "./CustomCard";
import "./timeline.css";

function Timeline() {
	const ref = useRef<HTMLLIElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end end"], // Mappa lo scroll su tutta la sezione
	});

	// Funzione per calcolare l'opacità e il movimento verticale in base allo scroll
	const getAnimationProps = (index: number) => {
		const start = index === 0 ? 0 : (index - 1) * 0.2;
		const end = index === 0 ? 1 : index * 0.2;
		const opacity = useTransform(scrollYProgress, [start, end], [0, 1], {
			clamp: false,
		});
		const translateY = useTransform(scrollYProgress, [start, end], [50, 0], {
			clamp: false,
		});
		return { opacity, translateY };
	};

	return (
		<ul className="timeline timeline-vertical">
			<li className="mb-32 mt-32">
				<div className="timeline-start text-base sm:text-lg lg:text-xl font-semibold">
					Who I Am
				</div>
				<div className="timeline-middle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="h-5 w-5">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="timeline-end timeline-box p-4 mx-auto max-w-md sm:max-w-lg lg:max-w-xl rounded-lg shadow-lg section">
					<p className="text-sm sm:text-base lg:text-lg">
						I am a recent graduate in Computer Engineering with a strong passion
						for artificial intelligence and robotics. I have experience in both
						web and mobile development, with skills in React, React Native,
						Java, JavaScript, Python, HTML, CSS, Git & GitHub, and SQL.
					</p>
				</div>
			</li>
			<li className="mb-32 mt-32">
				<div id="skills"className="timeline-start text-base sm:text-lg lg:text-xl font-semibold">
					My Skills
				</div>
				<div className="timeline-middle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="h-5 w-5">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<section
					id="skills"
					className="timeline-end timeline-box p-4 mx-auto max-w-md sm:max-w-lg lg:max-w-xl rounded-lg shadow-lg section">
					<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
						Skills
					</h2>
					<div className="skill-list-wrapper">
						<ul className="skill-list text-sm sm:text-base lg:text-lg">
							<li>JavaScript (ES6+)</li>
							<li>React</li>
							<li>Node.js</li>
							<li>HTML & CSS</li>
							<li>React Native</li>
							<li>Java</li>
							<li>Python</li>
							<li>SQL</li>
						</ul>
					</div>
				</section>
			</li>
		</ul>
	);
}

export default Timeline;
